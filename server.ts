import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import JSZip from 'jszip';
import fs from 'fs';
import { SCHEMES_DATA } from './src/data/schemesData';
import { Grievance, Scheme, EligibilityInput, EligibilityResult } from './src/types';

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());

// Initialize Gemini Client server-side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// In-memory store for Grievances & Users (Simulated DB backed by seed data)
const grievancesDb: Map<string, Grievance> = new Map();
const usersDb: Map<string, { id: string; fullName: string; email: string; passwordHash: string }> = new Map();

// Seed initial sample grievances for demo tracking
const demoGrievance: Grievance = {
  id: 'g-1',
  referenceId: 'JAN-2026-849201',
  name: 'Ramesh Kumar',
  email: 'ramesh.k@example.com',
  phone: '9876543210',
  department: 'Ministry of Agriculture & Farmers Welfare',
  category: 'PM-KISAN Installment Delay',
  subject: 'Delay in receiving 16th installment under PM-KISAN',
  description: 'My land records were verified at Panchayat office 2 months ago, but the 16th installment of ₹2000 has not been credited to my bank account.',
  status: 'In Progress',
  createdAt: '2026-08-01T10:30:00Z',
  updatedAt: '2026-08-05T14:15:00Z',
  timeline: [
    { status: 'Submitted', timestamp: '2026-08-01T10:30:00Z', note: 'Grievance submitted successfully via JanSahay Portal' },
    { status: 'Under Review', timestamp: '2026-08-02T11:00:00Z', note: 'Forwarded to District Nodal Officer (Agriculture)' },
    { status: 'Assigned', timestamp: '2026-08-03T16:20:00Z', note: 'Assigned to Block Development Officer for Aadhaar-bank account re-verification' },
    { status: 'In Progress', timestamp: '2026-08-05T14:15:00Z', note: 'Aadhaar seeding verified. Payment dispatch scheduled in next DBT batch' }
  ]
};
grievancesDb.set(demoGrievance.referenceId, demoGrievance);

// ------------------- API ROUTES -------------------

// 1. Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'JanSahay Citizen Portal API',
    timestamp: new Date().toISOString(),
    aiEnabled: !!aiClient
  });
});

// 2. Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Full name, email, and password are required' });
  }

  const existing = Array.from(usersDb.values()).find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  const id = `user-${Date.now()}`;
  const userObj = { id, fullName, email, passwordHash: password }; // Simplified hash for demo
  usersDb.set(id, userObj);

  const token = `token-${id}-${Date.now()}`;
  res.json({
    user: { id, fullName, email, savedSchemes: [] },
    token
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = Array.from(usersDb.values()).find(u => u.email === email && u.passwordHash === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = `token-${user.id}-${Date.now()}`;
  res.json({
    user: { id: user.id, fullName: user.fullName, email: user.email, savedSchemes: [] },
    token
  });
});

// 3. Schemes API
app.get('/api/schemes', (req, res) => {
  const { category, state, search } = req.query;
  let filtered = [...SCHEMES_DATA];

  if (category && typeof category === 'string' && category !== 'All') {
    filtered = filtered.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }

  if (state && typeof state === 'string' && state !== 'All') {
    filtered = filtered.filter(s => s.state === 'All India' || s.state.toLowerCase() === state.toLowerCase());
  }

  if (search && typeof search === 'string' && search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(s =>
      s.name.en.toLowerCase().includes(q) ||
      s.name.hi.toLowerCase().includes(q) ||
      s.name.bn.toLowerCase().includes(q) ||
      s.description.en.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.ministry.toLowerCase().includes(q)
    );
  }

  res.json({ schemes: filtered, total: filtered.length });
});

app.get('/api/schemes/:id', (req, res) => {
  const scheme = SCHEMES_DATA.find(s => s.id === req.params.id || s.slug === req.params.id);
  if (!scheme) {
    return res.status(404).json({ message: 'Scheme not found' });
  }
  res.json(scheme);
});

// 4. Eligibility Evaluation API
app.post('/api/eligibility/check', (req, res) => {
  const input: EligibilityInput = req.body;
  if (!input || typeof input.age !== 'number') {
    return res.status(400).json({ message: 'Invalid eligibility input data' });
  }

  const results: EligibilityResult[] = SCHEMES_DATA.map(scheme => {
    let score = 100;
    const reasons: string[] = [];

    const crit = scheme.eligibilityCriteria;

    // Age check
    if (crit.minAge && input.age < crit.minAge) {
      score -= 40;
      reasons.push(`Minimum age required is ${crit.minAge} years (Your age: ${input.age})`);
    }
    if (crit.maxAge && input.age > crit.maxAge) {
      score -= 40;
      reasons.push(`Maximum age limit is ${crit.maxAge} years (Your age: ${input.age})`);
    }

    // Gender check
    if (crit.gender && crit.gender !== 'All') {
      if (crit.gender.toLowerCase() === 'female' && input.gender.toLowerCase() !== 'female') {
        score -= 50;
        reasons.push(`This scheme is exclusively for female beneficiaries`);
      }
    }

    // Occupation check
    if (crit.occupation && crit.occupation.length > 0) {
      const match = crit.occupation.some(occ => occ.toLowerCase() === input.occupation.toLowerCase());
      if (!match) {
        if (scheme.id === 'pm-kisan' && !input.isFarmer) {
          score -= 50;
          reasons.push(`Requires farmer status with cultivable agricultural land`);
        } else if (scheme.id === 'national-scholarship-portal' && !input.isStudent) {
          score -= 50;
          reasons.push(`Requires active student enrolment in recognized institution`);
        }
      }
    }

    // Income check
    if (crit.maxIncome && input.annualIncome > crit.maxIncome) {
      score -= 35;
      reasons.push(`Annual income exceeds threshold of ₹${crit.maxIncome.toLocaleString('en-IN')}`);
    }

    let status: 'Eligible' | 'Possibly Eligible' | 'Not Eligible' = 'Eligible';
    if (score < 40) {
      status = 'Not Eligible';
    } else if (score < 80) {
      status = 'Possibly Eligible';
    }

    if (reasons.length === 0) {
      reasons.push('Meets all primary age, income, and category criteria for this scheme');
    }

    return {
      scheme,
      status,
      score,
      reasons
    };
  });

  // Sort eligible first, then score
  results.sort((a, b) => b.score - a.score);

  const eligibleCount = results.filter(r => r.status === 'Eligible').length;
  const summary = `Found ${eligibleCount} fully eligible government schemes matching your profile.`;

  res.json({ results, summary });
});

// 5. Grievance API
app.post('/api/grievances', (req, res) => {
  const { name, email, phone, department, category, subject, description } = req.body;
  if (!name || !department || !subject || !description) {
    return res.status(400).json({ message: 'Name, department, subject, and description are required' });
  }

  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const referenceId = `JAN-2026-${randomNum}`;
  const now = new Date().toISOString();

  const newGrievance: Grievance = {
    id: `g-${Date.now()}`,
    referenceId,
    name,
    email: email || '',
    phone: phone || '',
    department,
    category: category || 'General Inquiry',
    subject,
    description,
    status: 'Submitted',
    createdAt: now,
    updatedAt: now,
    timeline: [
      { status: 'Submitted', timestamp: now, note: 'Grievance registered successfully via JanSahay Portal.' },
      { status: 'Under Review', timestamp: now, note: 'Grievance assigned to Departmental Redressal Officer.' }
    ]
  };

  grievancesDb.set(referenceId, newGrievance);

  res.json({
    success: true,
    grievance: newGrievance,
    message: `Grievance registered successfully with Reference ID: ${referenceId}`
  });
});

app.get('/api/grievances/:refId', (req, res) => {
  const refId = req.params.refId.trim().toUpperCase();
  const grievance = grievancesDb.get(refId);

  if (!grievance) {
    return res.status(404).json({ message: `No grievance record found for Reference ID: ${refId}` });
  }

  res.json({ grievance });
});

// 6. Gemini Multilingual AI Chatbot API
app.post('/api/chat', async (req, res) => {
  const { message, language = 'en', schemeContext } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ message: 'A valid message string is required' });
  }

  if (aiClient) {
    try {
      const langNames: Record<string, string> = {
        en: 'English',
        hi: 'Hindi (हिंदी)',
        bn: 'Bengali (বাংলা)'
      };
      const targetLang = langNames[language] || 'English';

      let contextPrompt = `You are JanSahay AI, an official multilingual citizen guidance assistant for Indian Government Schemes & Public Grievance Redressal.
Your task is to provide polite, highly accurate, clear, and actionable advice to Indian citizens regarding government welfare schemes, eligibility requirements, application steps, required documents, and grievance redressal procedures.

CRITICAL INSTRUCTIONS:
1. Primary Response Language: Respond directly in ${targetLang}.
2. Tone: Respectful, empathetic, encouraging, and clear for citizens of all digital literacy levels.
3. Official URLs: When asked about official application portals, point citizens to authentic government URLs (e.g., pmkisan.gov.in, pmjay.gov.in, scholarships.gov.in, pmaymis.gov.in). Do NOT make up URLs.
4. Formatting: Use neat bullet points and bold headers for readability.
`;

      if (schemeContext) {
        contextPrompt += `\nCURRENT SCHEME CONTEXT FOCUS:
Scheme Name: ${schemeContext.name}
Description: ${schemeContext.description || ''}
Benefits: ${JSON.stringify(schemeContext.benefits || [])}
Eligibility: ${schemeContext.eligibility || ''}
Official URL: ${schemeContext.officialUrl || ''}
`;
      }

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: message,
        config: {
          systemInstruction: contextPrompt,
          temperature: 0.4
        }
      });

      const reply = response.text || getFallbackChatResponse(message, language, schemeContext);
      return res.json({ reply, language });

    } catch (geminiError: any) {
      console.warn('Gemini AI model call failed, switching to intelligent fallback responder:', geminiError?.message || geminiError);
    }
  }

  // Fallback intelligent responder if API key is missing or model call failed
  const fallbackReply = getFallbackChatResponse(message, language, schemeContext);
  return res.json({ reply: fallbackReply, language });
});

// Fallback intelligent chat responder
function getFallbackChatResponse(message: string, lang: string, schemeContext: any): string {
  const msgLower = message.toLowerCase();

  if (schemeContext && schemeContext.name) {
    if (lang === 'hi') {
      return `**${schemeContext.name}** के विषय में जानकारी:\n\n` +
        `• **विवरण**: ${schemeContext.description || 'यह भारत सरकार की महत्वपूर्ण जन-कल्याणकारी योजना है।'}\n` +
        `• **पात्रता**: ${schemeContext.eligibility || 'योजना की प्राथमिक शर्तों को पूरा करने वाले नागरिक पात्र हैं।'}\n` +
        `• **अधिकारिक पोर्टल**: ${schemeContext.officialUrl || 'योजना के आधिकारिक पोर्टल पर ऑनलाइन आवेदन करें।'}\n\n` +
        `क्या आप आवेदन प्रक्रिया या आवश्यक दस्तावेजों की सूची देखना चाहते हैं?`;
    }
    if (lang === 'bn') {
      return `**${schemeContext.name}** সম্পর্কিত নির্দেশিকা:\n\n` +
        `• **বিবরণ**: ${schemeContext.description || 'এটি ভারত সরকারের একটি গুরুত্বপূর্ণ জনকল্যাণমূলক প্রকল্প।'}\n` +
        `• **যোগ্যতা**: ${schemeContext.eligibility || 'প্রকল্পের প্রাথমিক নিয়ম মেনে নাগরিকরা আবেদন করতে পারেন।'}\n` +
        `• **অফিসিয়াল পোর্টাল**: ${schemeContext.officialUrl || 'অফিসিয়াল পোর্টালে গিয়ে সরাসরি আবেদন করুন।'}\n\n` +
        `আপনি কি প্রয়োজনীয় নথিপত্র বা আবেদনের ধাপগুলি জানতে চান?`;
    }
    return `**Guide for ${schemeContext.name}**:\n\n` +
      `• **Overview**: ${schemeContext.description || 'Important citizen welfare scheme funded by the Government of India.'}\n` +
      `• **Eligibility**: ${schemeContext.eligibility || 'Eligible citizens fulfilling the scheme primary norms can apply.'}\n` +
      `• **Official Portal**: ${schemeContext.officialUrl || 'Visit official portal for direct online application.'}\n\n` +
      `Would you like assistance regarding required documents or the step-by-step application procedure?`;
  }

  if (lang === 'hi') {
    if (msgLower.includes('किसान') || msgLower.includes('kisan') || msgLower.includes('कृषि')) {
      return '• **प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)**: योग्य किसानों को ₹6,000 प्रति वर्ष 3 किस्तों में प्राप्त होते हैं (pmkisan.gov.in).\n' +
        '• **फसल बीमा योजना (PMFBY)**: प्राकृतिक आपदाओं से फसल नुकसान पर न्यूनतम प्रीमियम पर बीमा कवर (pmfby.gov.in).\n' +
        '• **किसान क्रेडिट कार्ड (KCC)**: सस्ती ब्याज दर (4%) पर कृषि ऋण की सुविधा।';
    }
    if (msgLower.includes('स्वास्थ्य') || msgLower.includes('आयुष्मान') || msgLower.includes('health') || msgLower.includes('इलाज')) {
      return '• **आयुष्मान भारत (PM-JAY)**: पात्र परिवारों को ₹5 लाख तक का सालाना कैशलेस इलाज (beneficiary.nha.gov.in).\n' +
        '• **जन औषधि योजना**: 50% से 90% तक कम कीमत पर गुणवत्तापूर्ण जेनेरिक दवाएं प्रदान की जाती हैं।';
    }
    if (msgLower.includes('शिकायत') || msgLower.includes('grievance') || msgLower.includes('समस्या')) {
      return 'जनसहाय पोर्टल पर आप सरकारी योजनाओं में देरी या भ्रष्टाचार की शिकायत दर्ज करा सकते हैं:\n\n' +
        '1. **शिकायत दर्ज करें**: मेनू में Grievances Portal पर जाएं।\n' +
        '2. **ट्रैकिंग ID प्राप्त करें**: आपको 12-अंकों की reference ID (जैसे JAN-2026-849201) मिलेगी।\n' +
        '3. **स्थिति जांचें**: ट्रैकिंग सेक्शन में आईडी दर्ज करके रियल-टाइम अपडेट प्राप्त करें।';
    }
    return 'जनसहाय एआई (JanSahay AI) में आपका स्वागत है! मैं भारत सरकार की कल्याणकारी योजनाओं, पात्रता, दस्तावेजों और शिकायतों के निवारण हेतु आपकी सहायता के लिए प्रस्तुत हूँ। आप हिंदी, बंगाली या अंग्रेजी में प्रश्न पूछ सकते हैं।';
  }

  if (lang === 'bn') {
    if (msgLower.includes('কৃষক') || msgLower.includes('kisan') || msgLower.includes('কৃষি')) {
      return '• **পিএম-কিসান (PM-KISAN)**: যোগ্য কৃষকদের বছরে তিনটি কিস্তিতে মোট ৬,০০০ টাকা আর্থিক সহায়তা (pmkisan.gov.in)।\n' +
        '• **প্রধানমন্ত্রী ফসল বীমা যোজনা**: স্বল্প প্রিমিয়ামে ফসলের ক্ষতির বীমা কভারেজ।\n' +
        '• **কিসান ক্রেডিট কার্ড**: মাত্র ৪% সুদে কৃষি ঋণের সুবিধা।';
    }
    if (msgLower.includes('স্বাস্থ্য') || msgLower.includes('আয়ুষ্মান') || msgLower.includes('health') || msgLower.includes('চিকিৎসা')) {
      return '• **আয়ুষ্মান ভারত (PM-JAY)**: প্রতিটি যোগ্য পরিবারকে ৫ লক্ষ টাকা পর্যন্ত বিনামূল্যের স্বাস্থ্য কভারেজ (beneficiary.nha.gov.in)।\n' +
        '• **জন ঔষধি যোজনা**: ৫০% থেকে ৯০% কম দামে ভালো মানের ওষুধ সরবরাহের ব্যবস্থা।';
    }
    if (msgLower.includes('অভিযোগ') || msgLower.includes('grievance') || msgLower.includes('সমস্যা')) {
      return 'জনসহায় পোর্টালে আপনি সহজেই সরকারি পরিষেবা সম্পর্কিত অভিযোগ জানাতে পারেন:\n\n' +
        '১. **অভিযোগ জানান**: Grievance Portal সেকশনে যান।\n' +
        '২. **রেফারেন্স ID নিন**: জমা দেওয়ার পর ১২-সংখ্যার রেফারেন্স নম্বর (যেমন JAN-2026-849201) পাবেন।\n' +
        '৩. **স্ট্যাটাস দেখুন**: ট্র্যাক পেজে রেফারেন্স নম্বর বসিয়ে বর্তমান অবস্থা পরীক্ষা করুন।';
    }
    return 'জনসহায় AI-তে আপনাকে স্বাগতম! সরকারি প্রকল্প, প্রয়োজনীয় আধার/ব্যাঙ্ক কাগজপত্র, আবেদনের নিয়ম বা অভিযোগ ট্র্যাকিং সম্পর্কিত যেকোনো প্রশ্ন করতে পারেন।';
  }

  // Default English
  if (msgLower.includes('farmer') || msgLower.includes('kisan') || msgLower.includes('agriculture')) {
    return '• **PM-KISAN**: Eligible landholding farmers receive ₹6,000 per year in 3 equal installments directly into bank accounts (https://pmkisan.gov.in).\n' +
      '• **PM Fasal Bima Yojana**: Comprehensive crop insurance coverage against natural calamities at minimal premium rates.\n' +
      '• **Kisan Credit Card (KCC)**: Provides subsidized institutional credit at 4% effective interest rate.';
  }
  if (msgLower.includes('health') || msgLower.includes('ayushman') || msgLower.includes('medical')) {
    return '• **Ayushman Bharat (PM-JAY)**: Provides ₹5 Lakh cashless health insurance per family per year across empaneled public and private hospitals (https://beneficiary.nha.gov.in).\n' +
      '• **PM Bharatiya Janaushadhi Pariyojana**: Delivers quality generic medicines at 50% to 90% cheaper prices.';
  }
  if (msgLower.includes('grievance') || msgLower.includes('complaint') || msgLower.includes('delay')) {
    return 'You can lodge and track public grievances on our JanSahay Portal:\n\n' +
      '1. **Register Grievance**: Go to Grievance Portal from the top navigation bar.\n' +
      '2. **Get Tracking ID**: You will receive a unique 12-digit Reference ID (e.g., JAN-2026-849201).\n' +
      '3. **Track Real-time Status**: Enter your Reference ID on the track tab for live resolution updates.';
  }

  return 'Welcome to JanSahay AI! I am your official assistant for Indian Government Welfare Schemes & Public Grievance Redressal. I can help you discover schemes, check your personalized eligibility, find required documents, and track complaints in English, Hindi, or Bengali.';
}

// 7. Endpoint to generate & download JANSAHAY.zip
app.get('/api/download-zip', async (req, res) => {
  try {
    const zip = new JSZip();

    // Helper to recursively add files
    const addDirToZip = (dirPath: string, zipFolder: JSZip) => {
      const files = fs.readdirSync(dirPath);
      for (const file of files) {
        if (['node_modules', '.git', 'dist', '.DS_Store', 'JANSAHAY.zip'].includes(file)) continue;
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          const subFolder = zipFolder.folder(file);
          if (subFolder) addDirToZip(fullPath, subFolder);
        } else {
          const content = fs.readFileSync(fullPath);
          zipFolder.file(file, content);
        }
      }
    };

    const rootDir = process.cwd();
    addDirToZip(rootDir, zip);

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="JANSAHAY.zip"');
    res.send(zipBuffer);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to generate ZIP file', message: err?.message });
  }
});

// ------------------- VITE / STATIC SERVING -------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JanSahay Full-Stack Application running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
