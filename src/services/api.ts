import { Scheme, EligibilityInput, EligibilityResult, Grievance, ChatMessage, Language } from '../types';
import { SCHEMES_DATA } from '../data/schemesData';

const API_BASE_URL = '/api';

// Helper function for client-side chat fallback
function getClientChatFallback(message: string, lang: Language, schemeContext?: any): string {
  const msgLower = message.toLowerCase();

  if (schemeContext && schemeContext.name) {
    if (lang === 'hi') {
      return `**${schemeContext.name}** के विषय में जानकारी:\n\n` +
        `• **विवरण**: ${schemeContext.description || 'यह भारत सरकार की महत्वपूर्ण जन-कल्याणकारी योजना है।'}\n` +
        `• **पात्रता**: ${schemeContext.eligibility || 'योजना की प्राथमिक शर्तों को पूरा करने वाले नागरिक पात्र हैं।'}\n` +
        `• **अधिकारक पोर्टल**: ${schemeContext.officialUrl || 'योजना के आधिकारिक पोर्टल पर ऑनलाइन आवेदन करें।'}\n\n` +
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

export const api = {
  // Health check
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch {
      return { status: 'ok', service: 'JanSahay Citizen Portal API (Local Fallback)' };
    }
  },

  // Auth
  async login(email: string, password: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Login failed');
      }
      return await res.json();
    } catch (err: any) {
      if (err.message && err.message !== 'Failed to fetch') {
        throw err;
      }
      // Demo fallback login if server unreachable
      return {
        user: { id: 'user-demo', fullName: email.split('@')[0] || 'Citizen', email, savedSchemes: [] },
        token: `demo-token-${Date.now()}`
      };
    }
  },

  async register(fullName: string, email: string, password: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Registration failed');
      }
      return await res.json();
    } catch (err: any) {
      if (err.message && err.message !== 'Failed to fetch') {
        throw err;
      }
      return {
        user: { id: `user-${Date.now()}`, fullName, email, savedSchemes: [] },
        token: `demo-token-${Date.now()}`
      };
    }
  },

  // Schemes
  async getSchemes(params?: { category?: string; state?: string; search?: string }) {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.append('category', params.category);
      if (params?.state) query.append('state', params.state);
      if (params?.search) query.append('search', params.search);

      const url = `${API_BASE_URL}/schemes${query.toString() ? '?' + query.toString() : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response');
      }
      return await res.json() as { schemes: Scheme[]; total: number };
    } catch (err) {
      console.warn('API fetch schemes warning, falling back to client-side dataset:', err);
      let filtered = [...SCHEMES_DATA];
      if (params?.category && params.category !== 'All') {
        filtered = filtered.filter(s => s.category.toLowerCase() === params.category!.toLowerCase());
      }
      if (params?.state && params.state !== 'All') {
        filtered = filtered.filter(s => s.state === 'All India' || s.state.toLowerCase() === params.state!.toLowerCase());
      }
      if (params?.search && params.search.trim()) {
        const q = params.search.toLowerCase().trim();
        filtered = filtered.filter(s =>
          s.name.en.toLowerCase().includes(q) ||
          s.name.hi.toLowerCase().includes(q) ||
          s.name.bn.toLowerCase().includes(q) ||
          s.description.en.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.ministry.toLowerCase().includes(q)
        );
      }
      return { schemes: filtered, total: filtered.length };
    }
  },

  async getSchemeById(id: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/schemes/${id}`);
      if (!res.ok) throw new Error('Scheme not found');
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Non-JSON response');
      }
      return await res.json() as Scheme;
    } catch (err) {
      const fallback = SCHEMES_DATA.find(s => s.id === id || s.slug === id);
      if (fallback) return fallback;
      throw new Error('Scheme details could not be found.');
    }
  },

  // Eligibility
  async checkEligibility(input: EligibilityInput) {
    try {
      const res = await fetch(`${API_BASE_URL}/eligibility/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      if (!res.ok) throw new Error('API error');
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Non-JSON response');
      }
      return await res.json() as { results: EligibilityResult[]; summary: string };
    } catch (err) {
      console.warn('Eligibility API warning, running client-side evaluator:', err);
      const results: EligibilityResult[] = SCHEMES_DATA.map(scheme => {
        let score = 100;
        const reasons: string[] = [];
        const crit = scheme.eligibilityCriteria;

        if (crit.minAge && input.age < crit.minAge) {
          score -= 40;
          reasons.push(`Minimum age required is ${crit.minAge} years (Your age: ${input.age})`);
        }
        if (crit.maxAge && input.age > crit.maxAge) {
          score -= 40;
          reasons.push(`Maximum age limit is ${crit.maxAge} years (Your age: ${input.age})`);
        }
        if (crit.gender && crit.gender !== 'All') {
          if (crit.gender.toLowerCase() === 'female' && input.gender.toLowerCase() !== 'female') {
            score -= 50;
            reasons.push(`Exclusively for female beneficiaries`);
          }
        }
        if (crit.maxIncome && input.annualIncome > crit.maxIncome) {
          score -= 35;
          reasons.push(`Annual income exceeds limit of ₹${crit.maxIncome.toLocaleString('en-IN')}`);
        }

        let status: 'Eligible' | 'Possibly Eligible' | 'Not Eligible' = 'Eligible';
        if (score < 40) status = 'Not Eligible';
        else if (score < 80) status = 'Possibly Eligible';

        if (reasons.length === 0) {
          reasons.push('Meets primary criteria for this welfare program');
        }

        return { scheme, status, score, reasons };
      });

      results.sort((a, b) => b.score - a.score);
      const eligibleCount = results.filter(r => r.status === 'Eligible').length;
      return { results, summary: `Found ${eligibleCount} fully eligible government schemes matching your profile.` };
    }
  },

  // Grievance
  async registerGrievance(data: {
    name: string;
    email: string;
    phone: string;
    department: string;
    category: string;
    subject: string;
    description: string;
  }) {
    try {
      const res = await fetch(`${API_BASE_URL}/grievances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to submit grievance');
      return await res.json() as { success: boolean; grievance: Grievance; message: string };
    } catch (err) {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const referenceId = `JAN-2026-${randomNum}`;
      const now = new Date().toISOString();
      const grievance: Grievance = {
        id: `g-${Date.now()}`,
        referenceId,
        name: data.name,
        email: data.email || '',
        phone: data.phone || '',
        department: data.department,
        category: data.category || 'General Inquiry',
        subject: data.subject,
        description: data.description,
        status: 'Submitted',
        createdAt: now,
        updatedAt: now,
        timeline: [
          { status: 'Submitted', timestamp: now, note: 'Grievance registered successfully via JanSahay Portal.' },
          { status: 'Under Review', timestamp: now, note: 'Assigned to Departmental Redressal Officer.' }
        ]
      };
      return {
        success: true,
        grievance,
        message: `Grievance registered successfully with Reference ID: ${referenceId}`
      };
    }
  },

  async trackGrievance(referenceId: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/grievances/${referenceId}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Grievance record not found');
      }
      return await res.json() as { grievance: Grievance };
    } catch (err: any) {
      if (referenceId.toUpperCase() === 'JAN-2026-849201') {
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
        return { grievance: demoGrievance };
      }
      throw new Error(`No grievance record found for Reference ID: ${referenceId}`);
    }
  },

  // AI Chatbot
  async sendChatMessage(payload: {
    message: string;
    language: Language;
    conversationHistory?: ChatMessage[];
    schemeContext?: {
      id: string;
      name: string;
      description?: string;
      benefits?: string[];
      eligibility?: string;
      officialUrl?: string;
    } | null;
  }) {
    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data && data.reply) {
        return data as { reply: string; language: Language };
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('AI Chat API warning, using client-side fallback generator:', err);
      const reply = getClientChatFallback(payload.message, payload.language, payload.schemeContext);
      return { reply, language: payload.language };
    }
  }
};

