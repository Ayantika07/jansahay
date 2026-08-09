import { Scheme } from '../types';

export const SCHEMES_DATA: Scheme[] = [
  {
    id: 'pm-kisan',
    slug: 'pm-kisan',
    name: {
      en: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      hi: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
      bn: 'প্রধানমন্ত্রী কিষাণ সম্মান নিধি (PM-KISAN)'
    },
    category: 'Agriculture',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    state: 'All India',
    isPopular: true,
    shortDescription: {
      en: 'Income support of ₹6,000 per year for all landholding farmer families across India in three equal installments.',
      hi: 'भारत के सभी भूमिधारक किसान परिवारों के लिए तीन समान किस्तों में ₹6,000 प्रति वर्ष की आय सहायता।',
      bn: 'ভারতের সমস্ত জমিধারী কৃষক পরিবারগুলির জন্য বছরে ৬,০০০ টাকার আর্থিক সহায়তা।'
    },
    description: {
      en: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from Government of India. Under the scheme, an income support of ₹6000/- per per year in three equal installments of ₹2000/- each is provided to small and marginal farmer families.',
      hi: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान) भारत सरकार से 100% वित्तपोषण के साथ एक केंद्रीय क्षेत्र की योजना है। इस योजना के तहत छोटे और सीमांत किसान परिवारों को ₹2000/- की तीन समान किस्तों में प्रति वर्ष ₹6000/- की आय सहायता प्रदान की जाती है।',
      bn: 'প্রধানমন্ত্রী কিষাণ সম্মান নিধি (পিএম-কিসান) হল ভারত সরকারের শতভাগ অর্থায়নে পরিচালিত একটি কেন্দ্রীয় প্রকল্প। এর অধীনে যোগ্য কৃষক পরিবারগুলিকে বছরে তিনটি সমান কিস্তিতে মোট ৬,০০০ টাকা সরাসরি ব্যাঙ্ক অ্যাকাউন্টে প্রদান করা হয়।'
    },
    benefits: {
      en: [
        'Direct financial assistance of ₹6,000 per year',
        'Direct Benefit Transfer (DBT) into verified Aadhaar-linked bank account',
        '3 equal installments of ₹2,000 every 4 months',
        'No middleman intervention'
      ],
      hi: [
        'प्रति वर्ष ₹6,000 की सीधी वित्तीय सहायता',
        'सत्यापित आधार-लिंक बैंक खाते में प्रत्यक्ष लाभ अंतरण (DBT)',
        'हर 4 महीने में ₹2,000 की 3 समान किश्तें',
        'बिचौलियों की कोई भूमिका नहीं'
      ],
      bn: [
        'প্রতি বছর সরাসরি ৬,০০০ টাকার আর্থিক সহায়তা',
        'আধার যুক্ত ব্যাঙ্ক অ্যাকাউন্টে সরাসরি টাকা ট্রান্সফার (DBT)',
        'প্রতি ৪ মাস অন্তর ২,০০০ টাকা করে ৩টি সমান কিস্তি',
        'কোনো দালাল বা মধ্যস্থতাকারীর প্রয়োজন নেই'
      ]
    },
    eligibilitySummary: {
      en: 'All landholding farmers cultivate cultivable land with valid Aadhaar and bank account.',
      hi: 'वैध आधार और बैंक खाते के साथ कृषि योग्य भूमि वाले सभी किसान।',
      bn: 'বৈধ আধার এবং ব্যাঙ্ক অ্যাকাউন্ট সহ আবাদযোগ্য জমির মালিক সমস্ত কৃষক।'
    },
    eligibilityCriteria: {
      occupation: ['farmer'],
      targetGroup: ['Farmer', 'Rural'],
      maxIncome: 1000000
    },
    documentsRequired: {
      en: [
        'Aadhaar Card',
        'Landholding ownership documents (Khatauni/Khasra)',
        'Active Bank Account details linked with Aadhaar',
        'Mobile Number linked with Aadhaar'
      ],
      hi: [
        'आधार कार्ड',
        'भूमि स्वामित्व दस्तावेज (खतौनी/खसरा)',
        'आधार से जुड़ा सक्रिय बैंक खाता विवरण',
        'आधार से जुड़ा मोबाइल नंबर'
      ],
      bn: [
        'আধার কার্ড',
        'জমির খতিয়ান বা মালিকানার নথি',
        'আধারের সাথে যুক্ত সক্রিয় ব্যাঙ্ক অ্যাকাউন্ট নম্বর',
        'আধারের সাথে লিঙ্ক করা মোবাইল নম্বর'
      ]
    },
    applicationProcess: {
      en: [
        'Visit the official PM-KISAN portal (pmkisan.gov.in)',
        'Click on "Farmers Corner" and select "New Farmer Registration"',
        'Enter Aadhaar number and State, then complete captcha',
        'Fill land and bank details accurately and submit the form'
      ],
      hi: [
        'आधिकारिक पीएम-किसान पोर्टल (pmkisan.gov.in) पर जाएं',
        '"फार्मर्स कॉर्नर" पर क्लिक करें और "नया किसान पंजीकरण" चुनें',
        'आधार नंबर और राज्य दर्ज करें, फिर कैप्चा पूरा करें',
        'भूमि और बैंक विवरण सटीक रूप से भरें और फॉर्म जमा करें'
      ],
      bn: [
        'অফিসিয়াল পিএম-কিসান পোর্টালে যান (pmkisan.gov.in)',
        '"Farmers Corner" অপশনে ক্লিক করে "New Farmer Registration" নির্বাচন করুন',
        'আধার নম্বর এবং রাজ্য নির্বাচন করুন, তারপর ক্যাপচা পূরণ করুন',
        'জমির বিবরণ এবং ব্যাংক বিবরণ সঠিকভাবে দিয়ে ফর্মটি জমা দিন'
      ]
    },
    officialUrl: 'https://pmkisan.gov.in',
    applicationUrl: 'https://pmkisan.gov.in/RegistrationFormNew.aspx'
  },
  {
    id: 'ayushman-bharat',
    slug: 'ayushman-bharat',
    name: {
      en: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
      hi: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
      bn: 'আয়ুষ্মান ভারত প্রধানমন্ত্রী জন আরোগ্য যোজনা (PM-JAY)'
    },
    category: 'Healthcare',
    ministry: 'Ministry of Health and Family Welfare',
    state: 'All India',
    isPopular: true,
    shortDescription: {
      en: 'Health insurance cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization.',
      hi: 'द्वितीयक और तृतीयक देखभाल अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य बीमा कवर।',
      bn: 'মাধ্যমিক এবং তৃতীয় স্তরের হাসপাতালে ভর্তির জন্য প্রতি পরিবারে বছরে ৫ লাখ টাকা পর্যন্ত ক্যাশলেস স্বাস্থ্য বীমা।'
    },
    description: {
      en: 'PM-JAY is the world’s largest health insurance/assurance scheme fully financed by the government. It provides a cover of ₹5 lakhs per family per year for secondary and tertiary care hospitalization across public and empanelled private hospitals in India.',
      hi: 'पीएम-जय पूरी तरह से सरकार द्वारा वित्त पोषित दुनिया की सबसे बड़ी स्वास्थ्य बीमा/आश्वासन योजना है। यह भारत में सार्वजनिक और सूचीबद्ध निजी अस्पतालों में माध्यमिक और तृतीयक देखभाल के लिए प्रति परिवार प्रति वर्ष ₹5 लाख का कवर प्रदान करती है।',
      bn: 'পিএম-জেএওয়াই বিশ্বমানের সর্ববৃহৎ সরকারি অর্থায়নে পরিচালিত স্বাস্থ্য বীমা প্রকল্প। ভারতের সমস্ত সরকারি এবং তালিকাভুক্ত বেসরকারি হাসপাতালে চিকিৎসা ও অস্ত্রোপচারের জন্য পরিবারপিছু ৫ লাখ টাকার ক্যাশলেस পরিষেবা পাওয়া যায়।'
    },
    benefits: {
      en: [
        '₹5 Lakh cashless health cover per family annually',
        'Covers pre and post-hospitalization medical expenses for up to 15 days',
        'Over 1,900 medical procedures covered',
        'Portable across all empanelled hospitals in India'
      ],
      hi: [
        'प्रति परिवार प्रति वर्ष ₹5 लाख का नकद रहित स्वास्थ्य कवर',
        'अस्पताल में भर्ती होने से 15 दिन पहले और बाद के चिकित्सा खर्च शामिल',
        '1,900 से अधिक चिकित्सा उपचार प्रक्रियाएं कवर की गईं',
        'भारत के सभी सूचीबद्ध अस्पतालों में मान्य'
      ],
      bn: [
        'পরিবার প্রতি বছরে ৫ লাখ টাকা পর্যন্ত বিনামূল্যে হাসপাতালে চিকিৎসার সুযোগ',
        'হাসপাতালে ভর্তির আগের ও পরের চিকিৎসা খরচ অন্তর্ভুক্ত',
        '১৯০০ টিরও বেশি চিকিৎসার প্যাকেজ অন্তর্ভুক্ত',
        'ভারতের যেকোনো নিবন্ধিত হাসপাতালে পোর্টাবল সুবিধা'
      ]
    },
    eligibilitySummary: {
      en: 'Families listed under SECC 2011 database, low-income households, and senior citizens aged 70+.',
      hi: 'SECC 2011 डेटाबेस में सूचीबद्ध परिवार, कम आय वाले परिवार और 70+ आयु के वरिष्ठ नागरिक।',
      bn: 'SECC ২০১১ সামাজিক-অর্থনৈতিক শুমারিতে তালিকাভুক্ত পরিবার এবং ৭০ বছর বা তদূর্ধ্ব বয়সের প্রবীণ নাগরিকরা।'
    },
    eligibilityCriteria: {
      maxIncome: 300000,
      targetGroup: ['BPL', 'Senior Citizen', 'Low Income']
    },
    documentsRequired: {
      en: [
        'Aadhaar Card or Ration Card',
        'Mobile Number',
        'Ayushman Card / E-card or SECC Household ID'
      ],
      hi: [
        'आधार कार्ड या राशन कार्ड',
        'मोबाइल नंबर',
        'आयुष्मान कार्ड / ई-कार्ड या SECC परिवार आईडी'
      ],
      bn: [
        'আধার কার্ড অথবা ডিজিটাল রেশন কার্ড',
        'সক্রিয় মোবাইল নম্বর',
        'আয়ুষ্মান কার্ড বা SECC হাউসহোল্ড আইডি'
      ]
    },
    applicationProcess: {
      en: [
        'Visit beneficiary.nha.gov.in or any nearest Common Service Centre (CSC)',
        'Check eligibility using Mobile Number / Aadhaar Number',
        'Complete e-KYC using OTP or biometric verification',
        'Download Ayushman Golden Card upon approval'
      ],
      hi: [
        'beneficiary.nha.gov.in या किसी भी नजदीकी जन सेवा केंद्र (CSC) पर जाएं',
        'मोबाइल नंबर / आधार नंबर का उपयोग करके पात्रता की जांच करें',
        'ओटीपी या बायोमेट्रिक सत्यापन का उपयोग करके ई-केवाईसी पूरा करें',
        'स्वीकृति मिलने पर आयुष्मान कार्ड डाउनलोड करें'
      ],
      bn: [
        'beneficiary.nha.gov.in ওয়েবসাইটে অথবা নিকটস্থ তথ্যমিত্র কেন্দ্রে (CSC) যান',
        'আধার বা মোবাইল নম্বর দিয়ে নিজের নাম ও যোগ্যতা যাচাই করুন',
        'ই-কেওয়াইসি (e-KYC) সম্পন্ন করুন',
        'অনুমোদন পাওয়ার পর আয়ুষ্মান গোল্ডেন কার্ড ডাউনলোড করুন'
      ]
    },
    officialUrl: 'https://pmjay.gov.in',
    applicationUrl: 'https://beneficiary.nha.gov.in'
  },
  {
    id: 'pm-awas-yojana',
    slug: 'pm-awas-yojana',
    name: {
      en: 'Pradhan Mantri Awas Yojana (PMAY - Urban & Gramin)',
      hi: 'प्रधानमंत्री आवास योजना (PMAY - शहरी एवं ग्रामीण)',
      bn: 'প্রধানমন্ত্রী আবাস যোজনা (PMAY - গ্রামীণ ও নগর)'
    },
    category: 'Housing',
    ministry: 'Ministry of Housing and Urban Affairs / Ministry of Rural Development',
    state: 'All India',
    isPopular: true,
    shortDescription: {
      en: 'Financial subsidy up to ₹2.67 Lakh for pucca housing for homeless and EWS/LIG families.',
      hi: 'बेघर और ईडब्ल्यूएस/एलआईजी परिवारों के लिए पक्के मकान के लिए ₹2.67 लाख तक की वित्तीय सब्सिडी।',
      bn: 'গৃহহীন এবং অর্থনৈতিকভাবে পিছিয়ে পড়া পরিবারের পকা বাড়ির জন্য ২.৬৭ লক্ষ টাকা পর্যন্ত আর্থিক সাহায্য।'
    },
    description: {
      en: 'Pradhan Mantri Awas Yojana aims to achieve "Housing for All". Under PMAY-Gramin and PMAY-Urban, government provides financial assistance and interest subsidy to eligible beneficiaries for constructing pucca houses with basic amenities like water, sanitation, and electricity.',
      hi: 'प्रधानमंत्री आवास योजना का उद्देश्य "सभी के लिए आवास" प्रदान करना है। पीएमएवाई-ग्रामीण और पीएमएवाई-शहरी के तहत, सरकार पात्र लाभार्थियों को बुनियादी सुविधाओं के साथ पक्के मकान बनाने के लिए वित्तीय सहायता और ब्याज सब्सिडी प्रदान करती है।',
      bn: 'প্রধানমন্ত্রী আবাস যোজনার মূল লক্ষ্য হল "সবার জন্য মাথা গোঁজার ঠাঁই"। এটি যোগ্য সুবিধাভোগীদের পাকা বাড়ি তৈরির জন্য নির্দিষ্ট অনুদান এবং হোম লোনে সুদের ছাড় প্রদান করে।'
    },
    benefits: {
      en: [
        'Financial aid up to ₹1.2 Lakh to ₹1.3 Lakh in Gramin areas',
        'Credit Linked Subsidy Scheme (CLSS) interest subsidy up to ₹2.67 Lakh in Urban areas',
        'Houses with toilets, LPG connection, drinking water & electricity',
        'Women ownership mandatory or preferred in land titles'
      ],
      hi: [
        'ग्रामीण क्षेत्रों में ₹1.2 लाख से ₹1.3 लाख तक की वित्तीय सहायता',
        'शहरी क्षेत्रों में ₹2.67 लाख तक क्रेडिट लिंक्ड सब्सिडी (CLSS) ब्याज सब्सिडी',
        'शौचालय, एलपीजी कनेक्शन, पेयजल और बिजली की सुविधाओं वाले घर',
        'भूमि स्वामित्व में महिलाओं का स्वामित्व अनिवार्य या पसंदीदा'
      ],
      bn: [
        'গ্রামীণ এলাকায় ১.২০ লক্ষ থেকে ১.৩০ লক্ষ টাকা সরাসরি অনুদান',
        'শহরাঞ্চলে সুদের ওপর ২.৬৭ লক্ষ টাকা পর্যন্ত ক্রেডিট লিঙ্কড ভর্তুকি',
        'শৌচাগার, পানীয় জল, বিদ্যুত এবং এলপিজি সংযোগ সমৃদ্ধ পকা ঘর',
        'জমির দলিলের মালিকে মহিলাদের অগ্রাধিকার বা বাধ্যতামূলক উপস্থিতি'
      ]
    },
    eligibilitySummary: {
      en: 'Families without a pucca house across India, annual household income below ₹3 Lakh (EWS) or ₹6 Lakh (LIG).',
      hi: 'पूरे भारत में पक्के मकान से वंचित परिवार, वार्षिक घरेलू आय ₹3 लाख (EWS) या ₹6 लाख (LIG) से कम।',
      bn: 'যাদের কোনো পাকা বাড়ি নেই এবং যাদের বার্ষিক পারিবারিক আয় ৩ লক্ষ বা ৬ লক্ষ টাকার নিচে।'
    },
    eligibilityCriteria: {
      maxIncome: 600000,
      targetGroup: ['BPL', 'EWS', 'Low Income', 'Rural']
    },
    documentsRequired: {
      en: [
        'Aadhaar Card of all family members',
        'Income Certificate / BPL Certificate',
        'Job Card (MGNREGA for Gramin)',
        'Bank Account Details',
        'Affidavit declaring non-ownership of any pucca house in India'
      ],
      hi: [
        'परिवार के सभी सदस्यों का आधार कार्ड',
        'आय प्रमाण पत्र / बीपीएल प्रमाण पत्र',
        'जॉब कार्ड (ग्रामीण के लिए मनरेगा)',
        'बैंक खाता विवरण',
        'भारत में किसी भी पक्के मकान के स्वामित्व न होने का हलफनामा'
      ],
      bn: [
        'পরিবারের সকল সদস্যের আধার কার্ড',
        'আয় সংক্রান্ত শংসাপত্র বা বিপিএল কার্ড',
        'মনরেগা জব কার্ড (গ্রামীণ এলাকার জন্য)',
        'ব্যাঙ্ক অ্যাকাউন্টের বিবরণ',
        'ভারতে কোনো পাকা ঘর নেই মর্মে স্বঘোষিত শপথপত্র'
      ]
    },
    applicationProcess: {
      en: [
        'Visit the official portal (pmaymis.gov.in for Urban or pmayg.nic.in for Gramin)',
        'Click on Citizen Assessment and select application category',
        'Provide Aadhaar number and personal details',
        'Submit required documents to local Panchayat / Municipal office for field verification'
      ],
      hi: [
        'आधिकारिक पोर्टल पर जाएं (शहरी के लिए pmaymis.gov.in या ग्रामीण के लिए pmayg.nic.in)',
        'सिटीजन असेसमेंट पर क्लिक करें और आवेदन श्रेणी चुनें',
        'आधार नंबर और व्यक्तिगत विवरण प्रदान करें',
        'फील्ड सत्यापन के लिए स्थानीय पंचायत / नगर पालिका कार्यालय में दस्तावेज जमा करें'
      ],
      bn: [
        'অফিসিয়াল ওয়েবসাইটে যান (শহরাঞ্চলের জন্য pmaymis.gov.in অথবা গ্রামীণ এলাকার জন্য pmayg.nic.in)',
        'Citizen Assessment-এ গিয়ে উপযুক্ত ক্যাটাগরি বেছে নিন',
        'আধার নম্বর এবং ব্যক্তিগত তথ্য পূরণ করুন',
        'সরেজমিনে তদন্তের জন্য স্থানীয় পঞ্চায়েত বা পৌরসভা কার্যালয়ে ফরম জমা দিন'
      ]
    },
    officialUrl: 'https://pmaymis.gov.in',
    applicationUrl: 'https://pmaymis.gov.in/Open/CheckAadhar.aspx'
  },
  {
    id: 'pm-mudra-yojana',
    slug: 'pm-mudra-yojana',
    name: {
      en: 'Pradhan Mantri MUDRA Yojana (PMMY)',
      hi: 'प्रधानमंत्री मुद्रा योजना (PMMY)',
      bn: 'প্রধানমন্ত্রী মুদ্রা যোজনা (PMMY)'
    },
    category: 'Financial Inclusion',
    ministry: 'Ministry of Finance',
    state: 'All India',
    isPopular: true,
    shortDescription: {
      en: 'Collateral-free micro loans up to ₹20 Lakh for non-corporate, non-farm small and micro enterprises.',
      hi: 'गैर-कॉर्पोरेट, गैर-कृषि छोटे और सूक्ष्म उद्यमों के लिए ₹20 लाख तक के संपार्श्विक-मुक्त सूक्ष्म ऋण।',
      bn: 'ক্ষুদ্র ব্যবসা ও স্বনির্ভর উদ্যোগ শুরু করতে গ্যারান্টি ছাড়া ২০ লক্ষ টাকা পর্যন্ত সহজ ব্যাংক ঋণ।'
    },
    description: {
      en: 'Pradhan Mantri MUDRA Yojana (PMMY) provides collateral-free loans up to ₹20 Lakhs to small/micro-enterprises. Loans are classified into three categories: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakh), and Tarun (₹5 Lakh to ₹20 Lakh).',
      hi: 'प्रधानमंत्री मुद्रा योजना छोटे/सूक्ष्म उद्यमों को ₹20 लाख तक के बिना गारंटी ऋण प्रदान करती है। ऋणों को तीन श्रेणियों में वर्गीकृत किया गया है: शिशु (₹50,000 तक), किशोर (₹50,000 से ₹5 लाख तक), और तरुण (₹5 लाख से ₹20 लाख तक)।',
      bn: 'ছোট ব্যবসা, দোকান বা মাইক্রো শিল্প স্থাপনের জন্য কোনো গ্যারান্টি ছাড়াই তিন ধাপে ঋণ দেওয়া হয়: শিশু (৫০,০০০ টাকা পর্যন্ত), কিশোর (৫০,০০০ থেকে ৫ লক্ষ টাকা), এবং তরুণ (৫ লক্ষ থেকে ২০ লক্ষ টাকা)।'
    },
    benefits: {
      en: [
        'No collateral or third-party guarantee required',
        'Flexible repayment period up to 5 years',
        'MUDRA Card issued for working capital withdrawals',
        'Low interest rates linked to RBI base rates'
      ],
      hi: [
        'कोई जमानत या तीसरे पक्ष की गारंटी की आवश्यकता नहीं',
        '5 वर्ष तक की लचीली पुनर्भुगतान अवधि',
        'कार्यशील पूंजी निकासी के लिए मुद्रा कार्ड जारी',
        'आरबीआई आधार दरों से जुड़ी कम ब्याज दरें'
      ],
      bn: [
        'কোনো বন্ধকী বা সিকিউরিটির প্রয়োজন নেই',
        'পরিশোধের সময়সীমা ৫ বছর পর্যন্ত শিথিল',
        'ওয়ার্কিং ক্যাপিটাল তোলার জন্য MUDRA ডেবিট কার্ড প্রদান',
        'সহজ ও কম সুদের হার'
      ]
    },
    eligibilitySummary: {
      en: 'Any Indian citizen running or planning a micro business, retail, manufacturing, or service unit.',
      hi: 'कोई भी भारतीय नागरिक जो सूक्ष्म व्यवसाय, खुदरा, विनिर्माण या सेवा इकाई चला रहा है या योजना बना रहा है।',
      bn: 'যেকোনো ভারতীয় নাগরিক যিনি ছোট দোকান, উৎপাদন বা পরিষেবা ব্যবসার সাথে যুক্ত বা শুরু করতে চান।'
    },
    eligibilityCriteria: {
      minAge: 18,
      targetGroup: ['Entrepreneur', 'Youth', 'Artisan', 'Vendor']
    },
    documentsRequired: {
      en: [
        'Identity Proof (Aadhaar / Voter ID / PAN Card)',
        'Address Proof (Electricity Bill / Ration Card)',
        'Business Plan / Proposal details',
        'Bank Statement of last 6 months',
        'Passport size photographs'
      ],
      hi: [
        'पहचान प्रमाण (आधार/वोटर आईडी/पैन कार्ड)',
        'पता प्रमाण (बिजली बिल/राशन कार्ड)',
        'व्यवसाय योजना/प्रस्ताव विवरण',
        'पिछले 6 महीनों का बैंक स्टेटमेंट',
        'पासपोर्ट आकार की तस्वीरें'
      ],
      bn: [
        'পরিচয়পত্র (আধার/ভোটার আইডি/প্যান কার্ড)',
        'ঠিকানার প্রমাণপত্র (বিদ্যুৎ বিল/রেশন কার্ড)',
        'বিজনেস প্যান বা ব্যবসায়িক প্রস্তাবনা',
        'গত ৬ মাসের ব্যাংক স্টেটমেন্ট',
        'সাম্প্রতিক পাসপোর্ট সাইজ ছবি'
      ]
    },
    applicationProcess: {
      en: [
        'Apply online via JanSamarth portal (jansamarth.in) or visit any commercial bank branch',
        'Select Mudra Loan category (Shishu, Kishore, or Tarun)',
        'Fill loan application form and attach business proposal',
        'Branch verifies documents and sanctions loan'
      ],
      hi: [
        'जनसमर्थ पोर्टल (jansamarth.in) के माध्यम से ऑनलाइन आवेदन करें या किसी भी व्यावसायिक बैंक शाखा में जाएं',
        'मुद्रा ऋण श्रेणी (शिशु, किशोर, या तरुण) चुनें',
        'ऋण आवेदन पत्र भरें और व्यवसाय प्रस्ताव संलग्न करें',
        'शाखा दस्तावेजों की पुष्टि करती है और ऋण स्वीकृत करती है'
      ],
      bn: [
        'জনসমর্থ পোর্টাল (jansamarth.in) মারফৎ অথবা নিকটস্থ যেকোনো সরকারি বা বেসরকারি ব্যাংকে গিয়ে আবেদন করুন',
        'Mudra লোনের শ্রেণী নির্বাচন করুন (Shishu, Kishore, অথবা Tarun)',
        'আবেদন পত্র পূরণ করে ব্যবসার সংক্ষিপ্ত বিবরণ জমা দিন',
        'ব্যাংক ভেরিফিকেশন সাপেক্ষে লোন মঞ্জুর করে'
      ]
    },
    officialUrl: 'https://www.mudra.org.in',
    applicationUrl: 'https://www.jansamarth.in/home'
  },
  {
    id: 'national-scholarship-portal',
    slug: 'national-scholarship-portal',
    name: {
      en: 'National Scholarship Portal (NSP) - Pre & Post Matric Schemes',
      hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) - प्री एवं पोस्ट मैट्रिक योजनाएं',
      bn: 'জাতীয় স্কলারশিপ পোর্টাল (NSP) - প্রি ও পোস্ট মেট্রিক প্রকল্প'
    },
    category: 'Education',
    ministry: 'Ministry of Education / Ministry of Minority Affairs / Ministry of Social Justice',
    state: 'All India',
    isPopular: true,
    shortDescription: {
      en: 'Financial scholarships for Minority, SC, ST, OBC and EWS students from Class 1 to Higher Education.',
      hi: 'कक्षा 1 से उच्च शिक्षा तक अल्पसंख्यक, एससी, एसटी, ओबीसी और ईडब्ल्यूएस छात्रों के लिए वित्तीय छात्रवृत्ति।',
      bn: 'প্রথম শ্রেণী থেকে উচ্চশিক্ষা পর্যন্ত তফশিলি, অনগ্রসর ও সংখ্যালঘু শিক্ষার্থীদের জন্য সরকারি স্কলারশিপ।'
    },
    description: {
      en: 'National Scholarship Portal is a one-stop platform for central and state scholarship schemes. It offers direct financial tuition support, maintenance allowance, and merit incentives for students belonging to minority and economically weaker sections.',
      hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल केंद्रीय और राज्य छात्रवृत्ति योजनाओं के लिए एक एकल मंच है। यह अल्पसंख्यक और आर्थिक रूप से कमजोर वर्गों के छात्रों के लिए प्रत्यक्ष वित्तीय शिक्षण सहायता और योग्यता प्रोत्साहन प्रदान करता है।',
      bn: 'এনএসপি হল কেন্দ্রীয় ও রাজ্য স্কলারশিপের একচ্ছত্র পোর্টাল। এটি পিছিয়ে পড়া ও মেধাভিত্তিক ছাত্র-ছাত্রীদের টিউশন ফি মকুব এবং আর্থিক ভাতা প্রদান নিশ্চিত করে।'
    },
    benefits: {
      en: [
        'Direct tuition fee reimbursement up to 100%',
        'Monthly maintenance allowance for hostellers and day scholars',
        'Merit-cum-Means scholarships for professional & technical courses',
        'Seamless single digital application for multiple schemes'
      ],
      hi: [
        '100% तक प्रत्यक्ष शिक्षण शुल्क प्रतिपूर्ति',
        'हॉस्टलर और डे स्कॉलर के लिए मासिक रखरखाव भत्ता',
        'व्यावसायिक और तकनीकी पाठ्यक्रमों के लिए मेरिट-कम-मीन्स छात्रवृत्ति',
        'विभिन्न योजनाओं के लिए सहज एकल डिजिटल आवेदन'
      ],
      bn: [
        'টিউশন ফি-র ১০০% পর্যন্ত সরাসরি স্কলারশিপ ব্যাংকে অনুদান',
        'হোস্টেল এবং ডে-স্কলারদের জন্য মাসিক খরচের ভাতা',
        'প্রফেশনাল ও টেকনিক্যাল কোর্সের শিক্ষার্থীদের বিশেষ মেধা ভাতা',
        'একক পোর্টালে অনায়াসে আবেদনের সুযোগ'
      ]
    },
    eligibilitySummary: {
      en: 'Enrolled students in recognized schools/colleges with family income generally under ₹2.5 Lakh per annum.',
      hi: 'मान्यता प्राप्त स्कूलों/कॉलेजों में नामांकित छात्र जिनकी पारिवारिक आय आमतौर पर ₹2.5 लाख प्रति वर्ष से कम है।',
      bn: 'স্কুল, কলেজ বা বিশ্ববিদ্যালয়ে অধ্যয়নরত শিক্ষার্থীরা যাদের পারিবারিক বার্ষিক আয় ২.৫ লক্ষ টাকার নিচে।'
    },
    eligibilityCriteria: {
      isStudent: true,
      maxIncome: 250000,
      targetGroup: ['Student', 'Minority', 'SC/ST/OBC', 'Youth']
    },
    documentsRequired: {
      en: [
        'Student Aadhaar Card / Aadhaar Enrolment Slip',
        'Mark sheets of previous qualifying examination',
        'Income Certificate issued by competent authority',
        'Cast / Minority Community Certificate',
        'Bank Passbook showing Account Number & IFSC'
      ],
      hi: [
        'छात्र आधार कार्ड / आधार नामांकन पर्ची',
        'पिछली योग्यता परीक्षा की अंकतालिका',
        'सक्षम प्राधिकारी द्वारा जारी आय प्रमाण पत्र',
        'जाति / अल्पसंख्यक समुदाय प्रमाण पत्र',
        'खाता संख्या और IFSC दिखाने वाली बैंक पासबुक'
      ],
      bn: [
        'ছাত্র/ছাত্রীর আধার কার্ড',
        'শেষ পরীক্ষার মার্কশিট',
        'সংশ্লিষ্ট কর্তৃপক্ষের দেওয়া ইনকাম সার্টিফিকেট',
        'কাষ্ট বা মাইনোরিটি শংসাপত্র',
        'ব্যাঙ্ক পাসবুকের প্রথম পাতার কপি'
      ]
    },
    applicationProcess: {
      en: [
        'Register on scholarships.gov.in using OTR (One-Time Registration)',
        'Select Central or State Scheme according to eligibility',
        'Fill academic marks, school/college institute code, and personal details',
        'Upload supporting documents and submit before official deadline'
      ],
      hi: [
        'OTR (वन-टाइम रजिस्ट्रेशन) का उपयोग करके scholarships.gov.in पर पंजीकरण करें',
        'पात्रता के अनुसार केंद्रीय या राज्य योजना का चयन करें',
        'शैक्षणिक अंक, स्कूल/कॉलेज संस्थान कोड और व्यक्तिगत विवरण भरें',
        'सहायक दस्तावेज अपलोड करें और आधिकारिक समय सीमा से पहले जमा करें'
      ],
      bn: [
        'scholarships.gov.in পোর্টালে ওটিআর (OTR) সিস্টেমের মাধ্যমে রেজিস্টার করুন',
        'নিজের যোগ্যতা অনুযায়ী স্কিম বেছে নিন',
        'শিক্ষা প্রতিষ্ঠানের নাম, রেজাল্ট ও ব্যক্তিগত তথ্য দিন',
        'নথিপত্র স্ক্যান করে আপলোড করুন এবং সাবমিট বাটনে চাপ দিন'
      ]
    },
    officialUrl: 'https://scholarships.gov.in',
    applicationUrl: 'https://scholarships.gov.in/fresh/newApplicant'
  },
  {
    id: 'sukanya-samriddhi-yojana',
    slug: 'sukanya-samriddhi-yojana',
    name: {
      en: 'Sukanya Samriddhi Yojana (SSY)',
      hi: 'सुकन्या समृद्धि योजना (SSY)',
      bn: 'সুকন্যা সমৃদ্ধি যোজনা (SSY)'
    },
    category: 'Women & Child',
    ministry: 'Ministry of Finance / Ministry of Women and Child Development',
    state: 'All India',
    isPopular: true,
    shortDescription: {
      en: 'High-interest tax-exempt savings scheme for the girl child below 10 years of age.',
      hi: '10 वर्ष से कम आयु की बालिका के लिए उच्च-ब्याज कर-मुक्त बचत योजना।',
      bn: '১০ বছরের কম বয়সের কন্যা সন্তানের উচ্চ শিক্ষা ও ভবিষ্যতের জন্য সর্বোচ্চ সুদের করমুক্ত সঞ্চয় প্রকল্প।'
    },
    description: {
      en: 'Sukanya Samriddhi Yojana is a small deposit scheme for the girl child launched under "Beti Bachao Beti Padhao". It offers competitive government-backed interest rates (8.2% p.a.) and 80C tax exemption for parents securing their daughter’s higher education and marriage expenses.',
      hi: 'सुकन्या समृद्धि योजना "बेटी बचाओ बेटी पढ़ाओ" के तहत शुरू की गई बालिकाओं के लिए एक छोटी जमा योजना है। यह अपनी बेटी की उच्च शिक्षा और विवाह के खर्चों को सुरक्षित करने वाले माता-पिता के लिए प्रतिस्पर्धी ब्याज दरों (8.2% प्रति वर्ष) और 80C कर छूट प्रदान करती है।',
      bn: 'কন্যা সন্তানদের ভবিষ্যৎ সুনিশ্চিত করতে "বেটি বাঁচাও বেটি পড়াও" অভিযানের অধীনে চালু হওয়া প্রকল্প। পোস্ট অফিস বা ব্যাংকে ৮.২% বার্ষিক চক্রবৃদ্ধি সুদে জমার ওপর সম্পূর্ণ ইনকাম ট্যাক্স ছাড়ের সুবিধা মেলে।'
    },
    benefits: {
      en: [
        'High interest rate (~8.2% per annum) compounded annually',
        'Triple Tax Benefit (EEE: Exempt-Exempt-Exempt under Section 80C)',
        'Minimum deposit ₹250/year up to ₹1.5 Lakh/year',
        'Partial withdrawal up to 50% allowed for higher education at age 18'
      ],
      hi: [
        'उच्च ब्याज दर (~8.2% प्रति वर्ष) सालाना चक्रवृद्धि',
        'ट्रिपल टैक्स लाभ (धारा 80C के तहत ईईई: छूट-छूट-छूट)',
        'न्यूनतम जमा ₹250/वर्ष से ₹1.5 लाख/वर्ष तक',
        '18 वर्ष की आयु में उच्च शिक्षा के लिए 50% तक आंशिक निकासी की अनुमति'
      ],
      bn: [
        'বার্ষিক ৮.২% সর্বোচ্চ সরকার নির্ধারিত সুদ',
        'আয়কর আইনের ৮০সি ধারায় সম্পূর্ণ কর ছাড়ের সুবিধা',
        'বছরে সর্বনিম্ন ২৫০ টাকা থেকে সর্বোচ্চ ১.৫ লক্ষ টাকা পর্যন্ত জমা দেওয়া যায়',
        'মেয়ের বয়স ১৮ হলে উচ্চশিক্ষার খরচের জন্য জমাকৃত অর্থের ৫০% তোলা সম্ভব'
      ]
    },
    eligibilitySummary: {
      en: 'Girl children below 10 years of age, maximum two girl children per family.',
      hi: '10 वर्ष से कम आयु की बालिकाएं, प्रति परिवार अधिकतम दो बालिकाएं।',
      bn: 'জন্ম থেকে ১০ বছর বয়সের নিচের কন্যা শিশু। এক পরিবারে সর্বোচ্চ দুই কন্যা সন্তান।'
    },
    eligibilityCriteria: {
      maxAge: 10,
      gender: 'Female',
      targetGroup: ['Girl Child', 'Women']
    },
    documentsRequired: {
      en: [
        'Birth Certificate of Girl Child',
        'Aadhaar / Identity Proof of Parent/Guardian',
        'Address Proof of Parent/Guardian',
        'Passport photographs of Child & Parent'
      ],
      hi: [
        'बालिका का जन्म प्रमाण पत्र',
        'माता-पिता/अभिभावक का आधार/पहचान प्रमाण',
        'माता-पिता/अभिभावक का पता प्रमाण',
        'बच्चे और माता-पिता की पासपोर्ट आकार की तस्वीरें'
      ],
      bn: [
        'কন্যা শিশুর আসল জন্ম শংসাপত্র',
        'অভিভাবকের আধার কার্ড বা পরিচয়পত্র',
        'অভিভাবকের বাসস্থানের প্রমাণপত্র',
        'অভিভাবক ও শিশুর পাসপোর্ট ছবি'
      ]
    },
    applicationProcess: {
      en: [
        'Visit any nearest India Post Office or authorized commercial bank branch',
        'Fill the Sukanya Samriddhi account opening form',
        'Submit child birth certificate and parent KYC documents with initial deposit (min ₹250)',
        'Receive passbook for tracking yearly deposits and interest credit'
      ],
      hi: [
        'किसी भी नजदीकी इंडिया पोस्ट ऑफिस या अधिकृत वाणिज्यिक बैंक शाखा में जाएं',
        'सुकन्या समृद्धि खाता खोलने का फॉर्म भरें',
        'प्रारंभिक जमा (न्यूनतम ₹250) के साथ बच्चे का जन्म प्रमाण पत्र और माता-पिता के केवाईसी दस्तावेज जमा करें',
        'वार्षिक जमा और ब्याज क्रेडिट पर नजर रखने के लिए पासबुक प्राप्त करें'
      ],
      bn: [
        'নিকটস্থ ডাকঘর (Post Office) বা মনোনীত ব্যাংকে যান',
        'SSY অ্যাকাউন্ট ওপেনিং ফরমটি সংগ্রহ করে জমা দিন',
        'মেয়ের জন্ম শংসাপত্র ও অভিভাবকের কেওয়াইসি সহ অন্তত ২৫০ টাকা জমা দিন',
        'অ্যাকাউন্ট খুললে জমার হিসাব রাখার পাসবুক সংগ্রহ করুন'
      ]
    },
    officialUrl: 'https://www.indiapost.gov.in',
    applicationUrl: 'https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx'
  },
  {
    id: 'mgnrega',
    slug: 'mgnrega',
    name: {
      en: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
      hi: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (MGNREGA)',
      bn: 'মহাত্মা গান্ধী জাতীয় গ্রামীণ কর্মসংস্থান গ্যারান্টি আইন (MGNREGA / ১০০ দিনের কাজ)'
    },
    category: 'Employment',
    ministry: 'Ministry of Rural Development',
    state: 'All India',
    isPopular: true,
    shortDescription: {
      en: 'Guarantees 100 days of wage employment per financial year to rural adult household members.',
      hi: 'ग्रामीण वयस्क घरेलू सदस्यों को प्रति वित्तीय वर्ष 100 दिनों के मजदूरी रोजगार की गारंटी।',
      bn: 'গ্রামাঞ্চলের প্রাপ্তবয়স্ক গ্রামীণ মানুষদের বছরে ১০০ দিনের কাজ ও নিশ্চিত মজুরির গ্যারান্টি।'
    },
    description: {
      en: 'MGNREGA aims to enhance livelihood security in rural areas by providing at least 100 days of guaranteed wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.',
      hi: 'मनरेगा का उद्देश्य ऐसे प्रत्येक परिवार को एक वित्तीय वर्ष में कम से कम 100 दिनों के गारंटीकृत मजदूरी रोजगार प्रदान करके ग्रामीण क्षेत्रों में आजीविका सुरक्षा को बढ़ाना है जिसके वयस्क सदस्य अकुशल शारीरिक कार्य करने के लिए स्वेच्छा से आगे आते हैं।',
      bn: 'গ্রামীণ অঞ্চলে দরিদ্র পরিবারগুলির ১০০ দিনের নিশ্চিত কর্মসংস্থান সৃষ্টি করা এর কাজ। এতে অদক্ষ কায়িক কাজের জন্য কেন্দ্রীয়ভাবে নির্ধারিত দৈনিক মজুরি সরাসরি ব্যাংকে দেওয়া হয়।'
    },
    benefits: {
      en: [
        'Guaranteed 100 days of paid manual employment per family per year',
        'Wages credited directly into bank/post office account within 15 days',
        'Unemployment allowance if work is not assigned within 15 days of demand',
        'Work mandated within 5 km radius of applicant’s residence'
      ],
      hi: [
        'प्रति परिवार प्रति वर्ष 100 दिनों का गारंटीकृत सवैतनिक शारीरिक रोजगार',
        '15 दिनों के भीतर सीधे बैंक/डाकघर खाते में मजदूरी',
        'मांग के 15 दिनों के भीतर काम न मिलने पर बेरोजगारी भत्ता',
        'आवेदक के निवास स्थान से 5 किमी के भीतर काम अनिवार्य'
      ],
      bn: [
        'বছরে ১০০ দিনের বেতনযুক্ত কাজ পাওয়ার আইনি অধিকার',
        'কাজ শেষের ১৫ দিনের মধ্যে সরাসরি ব্যাংক অ্যাকাউন্টে মজুরি জমা',
        'আবেদন করার ১৫ দিনের মধ্যে কাজ না পেলে বেকার ভাতা পাওয়ার সুযোগ',
        'বাড়ির ৫ কিলোমিটার ব্যাসার্ধের মধ্যে কাজের স্থান নির্ধারণ'
      ]
    },
    eligibilitySummary: {
      en: 'Adult members of any rural household residing in Panchayat areas who volunteer for manual labor.',
      hi: 'पंचायत क्षेत्रों में रहने वाले किसी भी ग्रामीण परिवार के वयस्क सदस्य जो शारीरिक श्रम के लिए तैयार हैं।',
      bn: 'গ্রাম পঞ্চায়েত এলাকায় স্থায়ীভাবে বসবাসকারী যেকোনো প্রাপ্তবয়স্ক গ্রামীণ নাগরিক।'
    },
    eligibilityCriteria: {
      minAge: 18,
      targetGroup: ['Rural', 'Unemployed', 'BPL', 'Worker']
    },
    documentsRequired: {
      en: [
        'Applicant Aadhaar Card',
        'Proof of Rural Residence (Ration Card / Voter ID)',
        'Bank Account passbook copy',
        'MGNREGA Job Card'
      ],
      hi: [
        'आवेदक आधार कार्ड',
        'ग्रामीण निवास का प्रमाण (राशन कार्ड/वोटर आईडी)',
        'बैंक खाता पासबुक प्रति',
        'मनरेगा जॉब कार्ड'
      ],
      bn: [
        'আবেদনকারীর আধার কার্ড',
        'বাসস্থানের প্রমাণ (ভোটার আইডি বা রেশন কার্ড)',
        'ব্যাংক পাসবুকের অনুলিপি',
        'মনরেগা জব কার্ড'
      ]
    },
    applicationProcess: {
      en: [
        'Apply for Job Card at local Gram Panchayat office using written or verbal application',
        'Panchayat verifies details and issues free MGNREGA Job Card within 15 days',
        'Submit work application specifying duration for which employment is sought',
        'Receive work allocation order with site location'
      ],
      hi: [
        'स्थानीय ग्राम पंचायत कार्यालय में लिखित या मौखिक आवेदन के माध्यम से जॉब कार्ड के लिए आवेदन करें',
        'पंचायत विवरणों का सत्यापन करती है और 15 दिनों के भीतर मुफ्त मनरेगा जॉब कार्ड जारी करती है',
        'रोजगार की मांग के लिए कार्य आवेदन पत्र जमा करें',
        'साइट स्थान के साथ कार्य आवंटन आदेश प्राप्त करें'
      ],
      bn: [
        'স্থানীয় গ্রাম পঞ্চায়েত দফতরে গিয়ে জব কার্ডের জন্য সাদা কাগজে বা মৌখিকভাবে আবেদন করুন',
        'পঞ্চায়েত ভেরিফাই করে ১৫ দিনের মধ্যে বিনামূল্যে ১০০ দিনের জব কার্ড প্রদান করবে',
        'কাজের জন্য আবেদনপত্র বা ডিমান্ড লেটার জমা দিন',
        'কাজের জায়গা নির্দেশ করে কাজের চিঠি গ্রহণ করুন'
      ]
    },
    officialUrl: 'https://nrega.nic.in',
    applicationUrl: 'https://nrega.nic.in/netnrega/mgnrega_new/Nrega_home.aspx'
  },
  {
    id: 'pm-svanidhi',
    slug: 'pm-svanidhi',
    name: {
      en: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
      hi: 'पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (पीएम स्वनिधि)',
      bn: 'পিএম স্ট্রিট ভেন্ডরস আত্মনির্ভর নিধি (পিএম স্বনিধি)'
    },
    category: 'Employment',
    ministry: 'Ministry of Housing and Urban Affairs',
    state: 'All India',
    isPopular: false,
    shortDescription: {
      en: 'Collateral-free working capital microcredit up to ₹50,000 for urban street vendors.',
      hi: 'शहरी स्ट्रीट वेंडरों के लिए ₹50,000 तक का संपार्श्विक-मुक्त कार्यशील पूंजी सूक्ष्म ऋण।',
      bn: 'হকার ও রাস্তার ক্ষুদ্র ব্যবসায়ীদের কাজ চালিয়ে যাওয়ার জন্য গ্যারান্টিহীন ৫০,০০০ টাকা পর্যন্ত লোন।'
    },
    description: {
      en: 'PM SVANidhi is a special micro-credit facility to empower street vendors to restart their businesses. It offers collateral-free loans starting from ₹10,000 (1st tranche), ₹20,000 (2nd tranche), up to ₹50,000 (3rd tranche) with 7% interest subsidy and cashback on digital transactions.',
      hi: 'पीएम स्वनिधि स्ट्रीट वेंडरों को अपना व्यवसाय फिर से शुरू करने के लिए सशक्त बनाने के लिए एक विशेष सूक्ष्म ऋण सुविधा है। यह डिजिटल लेनदेन पर 7% ब्याज सब्सिडी और कैशबैक के साथ ₹10,000 (पहली किश्त), ₹20,000 (दूसरी किश्त), और ₹50,000 (तीसरी किश्त) तक संपार्श्विक-मुक्त ऋण प्रदान करता है।',
      bn: 'রাস্তার হকারদের স্বনির্ভর করতে বিশেষ ক্ষুদ্র ঋণ প্রকল্প। এতে ১০,০০০ টাকা (প্রথম ধাপ), ২০,০০০ টাকা (দ্বিতীয় ধাপ) এবং ৫০,০০০ টাকা (তৃতীয় ধাপ) পর্যন্ত লোন পাওয়া যায়। ডিজিটাল লেনদেনে ক্যাশব্যাক এবং ৭% সুদের ছাড় থাকে।'
    },
    benefits: {
      en: [
        'Collateral-free working capital loan up to ₹50,000',
        '7% Interest Subsidy credited directly into bank account',
        'Cashback up to ₹1,200 per year on digital sales transactions',
        'Higher loan limits on timely repayment'
      ],
      hi: [
        '₹50,000 तक का संपार्श्विक-मुक्त कार्यशील पूंजी ऋण',
        '7% ब्याज सब्सिडी सीधे बैंक खाते में जमा',
        'डिजिटल बिक्री लेनदेन पर प्रति वर्ष ₹1,200 तक कैशबैक',
        'समय पर पुनर्भुगतान पर उच्च ऋण सीमा'
      ],
      bn: [
        '৫০,০০০ টাকা পর্যন্ত গ্যারান্টি ছাড়া মূলধন ঋণ',
        'বছরে ৭% সুদের ভর্তুকি সরাসরি অ্যাকাউন্টে রিফান্ড',
        'ডিজিটাল পেমেণ্ট নিলে বছরে ১২০০ টাকা পর্যন্ত ক্যাশব্যাক',
        'সময়মতো পরিশোধে পরবর্তী ধাপে দ্বিগুণ ঋণের সুবিধা'
      ]
    },
    eligibilitySummary: {
      en: 'Street vendors vending in urban areas possessing Certificate of Vending or Identity Card.',
      hi: 'शहरी क्षेत्रों में वेंडिंग करने वाले स्ट्रीट वेंडर जिनके पास वेंडिंग का प्रमाण पत्र या पहचान पत्र है।',
      bn: 'পৌরসভা ও শহরাঞ্চলে ব্যবসা বা হকারি করা ব্যক্তি যাদের ভেন্ডিং সার্টিফিকেট বা পরিচয়পত্র আছে।'
    },
    eligibilityCriteria: {
      minAge: 18,
      occupation: ['vendor', 'artisan'],
      targetGroup: ['Vendor', 'Urban']
    },
    documentsRequired: {
      en: [
        'Aadhaar Card linked with Mobile Number',
        'Certificate of Vending / Letter of Recommendation (LoR) from ULB',
        'Bank account Passbook',
        'UPI / Digital Payment QR code details'
      ],
      hi: [
        'मोबाइल नंबर से जुड़ा आधार कार्ड',
        'यूएलबी से वेंडिंग प्रमाण पत्र / सिफारिश पत्र (एलओआर)',
        'बैंक खाता पासबुक',
        'यूपीआई / डिजिटल भुगतान क्यूआर कोड विवरण'
      ],
      bn: [
        'আধারের সাথে যুক্ত মোবাইল নাম্বার',
        'পৌরসভা/ইউএলবি প্রদত্ত ভেন্ডিং শংসাপত্র বা রেফারেন্স লেটার',
        'ব্যাংক পাসবুক',
        'ডিজিটাল পেমেন্টের জন্য সক্রিয় ইউপিআই কিউআর কোড'
      ]
    },
    applicationProcess: {
      en: [
        'Visit pmsvanidhi.mohua.gov.in portal or download PM SVANidhi mobile app',
        'Check vending status using Aadhaar / Urban Local Body (ULB) registration code',
        'Fill loan application form and choose preferred bank / NBFC',
        'Submit e-KYC to get direct loan disbursement'
      ],
      hi: [
        'pmsvanidhi.mohua.gov.in पोर्टल पर जाएं या पीएम स्वनिधि मोबाइल ऐप डाउनलोड करें',
        'आधार / अर्बन लोकल बॉडी (ULB) पंजीकरण कोड का उपयोग करके वेंडिंग स्थिति की जांच करें',
        'ऋण आवेदन पत्र भरें और पसंदीदा बैंक / एनबीएफसी चुनें',
        'सीधे ऋण वितरण प्राप्त करने के लिए ई-केवाईसी जमा करें'
      ],
      bn: [
        'pmsvanidhi.mohua.gov.in পোর্টালে অথবা অ্যাপে যান',
        'নিজের পৌরসভা এনরোলমেন্ট বা আধার কোড দিয়ে যোগ্যতার স্ট্যাটাস চেক করুন',
        'লোন ফর্ম ফিল-আপ করে ব্যাংক সিলেক্ট করুন',
        'ডিজিটাল ই-কেওয়াইসি সম্পন্ন হলে লোন অ্যাকাউন্টে ঢুকে যাবে'
      ]
    },
    officialUrl: 'https://pmsvanidhi.mohua.gov.in',
    applicationUrl: 'https://pmsvanidhi.mohua.gov.in/Home/PreApplication'
  },
  {
    id: 'pm-vishwakarma',
    slug: 'pm-vishwakarma',
    name: {
      en: 'PM Vishwakarma Scheme',
      hi: 'पीएम विश्वकर्मा योजना',
      bn: 'পিএম বিশ্বকর্মা প্রকল্প'
    },
    category: 'Financial Inclusion',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    state: 'All India',
    isPopular: false,
    shortDescription: {
      en: 'End-to-end support, skill training, modern toolkit, and ₹3 Lakh collateral-free loan at 5% interest for traditional artisans.',
      hi: 'पारंपरिक कारीगरों के लिए 5% ब्याज पर एंड-टू-एंड सहायता, कौशल प्रशिक्षण, आधुनिक टूलकिट और ₹3 लाख का संपार्श्विक-मुक्त ऋण।',
      bn: 'ঐতিহ্যবাহী কারিগরদের জন্য উন্নত আধুনিক টুলকিট, ট্রেনিং ও ৫% সুদে ৩ লক্ষ টাকার সহজ ব্যাংক লোন।'
    },
    description: {
      en: 'PM Vishwakarma provides recognition, skill upgrading, toolkit incentive of ₹15,000, and collateral-free enterprise credit up to ₹3 Lakh (₹1 Lakh 1st tranche, ₹2 Lakh 2nd tranche) at a concessional interest rate of 5% to traditional craftspeople across 18 trades.',
      hi: 'पीएम विश्वकर्मा 18 ट्रेडों में पारंपरिक कारीगरों को पहचान, कौशल उन्नयन, ₹15,000 का टूलकिट प्रोत्साहन, और 5% की रियायती ब्याज दर पर ₹3 लाख तक का संपार्श्विक-मुक्त उद्यम ऋण (₹1 लाख पहली किश्त, ₹2 लाख दूसरी किश्त) प्रदान करता है।',
      bn: 'কামার, কুমার, মিস্ত্রি, তাঁতি, ছুতোর সহ ১৮টি ঐতিহ্যবাহী পেশায় যুক্ত কারিগরদের বিশ্বকর্মা সার্টিফিকেট, ১৫০০০ টাকার বিনামূল্যের টুলকিট গ্রান্ট এবং মাত্র ৫% সুদের হারে ৩ লক্ষ টাকা পর্যন্ত লোন সরবরাহ করা হয়।'
    },
    benefits: {
      en: [
        'Official PM Vishwakarma ID Card and Certificate',
        '₹15,000 e-voucher toolkit incentive',
        '5-7 days basic skill training with ₹500/day stipend',
        'Collateral-free loan up to ₹3 Lakh at 5% interest rate'
      ],
      hi: [
        'आधिकारिक पीएम विश्वकर्मा आईडी कार्ड और प्रमाण पत्र',
        '₹15,000 ई-वाउचर टूलकिट प्रोत्साहन',
        '₹500/दिन वजीफा के साथ 5-7 दिनों का बुनियादी कौशल प्रशिक्षण',
        '5% ब्याज दर पर ₹3 लाख तक का संपार्श्विक-मुक्त ऋण'
      ],
      bn: [
        'অফিসিয়াল বিশ্বকর্মা আইডি কার্ড এবং ডিজিটাল শংসাপত্র',
        '১৫,০০০ টাকার বিনামূল্যে আধুনিক যন্ত্রপাতি কেনার ভাউচার',
        'ট্রেনিং চলাকালীন দৈনিক ৫০০ টাকা স্টাইপেন্ড সহ স্কিল ডেভেলপমেন্ট',
        '৫% অত্যন্ত কম সুদের হারে ৩ লক্ষ টাকা পর্যন্ত লোন'
      ]
    },
    eligibilitySummary: {
      en: 'Artisans or craftspeople working with hands and tools in one of 18 traditional family trades.',
      hi: '18 पारंपरिक पारिवारिक व्यवसायों में से किसी एक में हाथों और औजारों से काम करने वाले कारीगर या शिल्पकार।',
      bn: '১৮টি নির্দিষ্ট ঐতিহ্যগত হস্তশিল্প ও কারিগরি পেশায় যুক্ত যেকোনো ভারতীয় নাগরিক।'
    },
    eligibilityCriteria: {
      minAge: 18,
      occupation: ['artisan', 'vendor'],
      targetGroup: ['Artisan', 'Youth', 'Rural']
    },
    documentsRequired: {
      en: [
        'Aadhaar Card',
        'Active Bank Passbook details',
        'Ration Card / Family details proof',
        'Trade declaration details'
      ],
      hi: [
        'आधार कार्ड',
        'सक्रिय बैंक पासबुक विवरण',
        'राशन कार्ड / पारिवारिक विवरण प्रमाण',
        'व्यापार घोषणा विवरण'
      ],
      bn: [
        'আধার কার্ড',
        'সক্রিয় ব্যাঙ্ক পাসবুক',
        'পরিবারের সদস্যদের রেশন কার্ড',
        'নিজ পেশার স্বঘোষিত তথ্য'
      ]
    },
    applicationProcess: {
      en: [
        'Visit nearest Common Service Centre (CSC) or pmvishwakarma.gov.in',
        'Verify Mobile & Aadhaar authentication',
        'Fill Artisan Registration Form and select trade category',
        'Undergo Gram Panchayat / ULB verification and receive Vishwakarma ID'
      ],
      hi: [
        'नजदीकी जन सेवा केंद्र (CSC) या pmvishwakarma.gov.in पर जाएं',
        'मोबाइल और आधार प्रमाणीकरण की पुष्टि करें',
        'कारीगर पंजीकरण फॉर्म भरें और व्यापार श्रेणी चुनें',
        'ग्राम पंचायत / यूएलबी सत्यापन से गुजरें और विश्वकर्मा आईडी प्राप्त करें'
      ],
      bn: [
        'নিকটস্থ সিএসসি (CSC) সেন্টারে অথবা pmvishwakarma.gov.in পোর্টালে যান',
        'মোবাইল নম্বর ও আধার লিঙ্ক দিয়ে ওটিপি ভেরিফাই করুন',
        '১৮টি পেশার মধ্য থেকে নিজের পেশা বেছে নিয়ে রেজিস্ট্রেশন ফর্ম পূরণ করুন',
        'পঞ্চায়েত/পৌরসভার অনুমোদন পেলে বিশ্বকর্মা সার্টিফিকেট ডাউনলোড করতে পারবেন'
      ]
    },
    officialUrl: 'https://pmvishwakarma.gov.in',
    applicationUrl: 'https://pmvishwakarma.gov.in/Home/ApplicantRegistration'
  }
];
