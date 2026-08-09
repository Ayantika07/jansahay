import { Language } from '../types';

export interface TranslationKeys {
  appName: string;
  appTagline: string;
  navHome: string;
  navSchemes: string;
  navEligibility: string;
  navGrievance: string;
  navAI: string;
  navDashboard: string;
  navHelp: string;
  navLogin: string;
  navRegister: string;
  navLogout: string;

  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryBtn: string;
  heroSecondaryBtn: string;
  heroSearchPlaceholder: string;

  categoriesTitle: string;
  categoriesSubtitle: string;
  catAgriculture: string;
  catEducation: string;
  catWomenChild: string;
  catHealthcare: string;
  catHousing: string;
  catEmployment: string;
  catSocialSecurity: string;
  catFinancialInclusion: string;

  schemeCardMinistry: string;
  schemeCardBenefits: string;
  schemeCardEligibility: string;
  schemeCardApplyOfficial: string;
  schemeCardViewDetails: string;
  schemeCardAskAI: string;

  eligibilityTitle: string;
  eligibilitySubtitle: string;
  eligibilityStep1: string;
  eligibilityStep2: string;
  eligibilityStep3: string;
  eligibilityCheckBtn: string;
  eligibilityResultEligible: string;
  eligibilityResultPossible: string;
  eligibilityResultNotEligible: string;

  grievanceTitle: string;
  grievanceSubtitle: string;
  grievanceRegisterTab: string;
  grievanceTrackTab: string;
  grievanceDeptLabel: string;
  grievanceCategoryLabel: string;
  grievanceSubjectLabel: string;
  grievanceDescLabel: string;
  grievanceSubmitBtn: string;
  grievanceRefPrompt: string;
  grievanceTrackBtn: string;

  chatTitle: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  chatSendBtn: string;
  chatSuggestedPrompts: string;
  chatClearBtn: string;

  footerText: string;
  footerHelplines: string;
  footerOfficialNotice: string;
}

export const TRANSLATIONS: Record<Language, TranslationKeys> = {
  en: {
    appName: 'JanSahay',
    appTagline: 'Government Schemes. Simple for Everyone.',
    navHome: 'Home',
    navSchemes: 'Schemes',
    navEligibility: 'Eligibility Checker',
    navGrievance: 'Grievance Portal',
    navAI: 'JanSahay AI',
    navDashboard: 'Dashboard',
    navHelp: 'Help & FAQs',
    navLogin: 'Login',
    navRegister: 'Register',
    navLogout: 'Logout',

    heroTitle: 'Government Schemes. Simple for Everyone.',
    heroSubtitle: 'Discover Central & State government schemes, check your personalized eligibility, access official application portals, register grievances, and receive instant support from JanSahay AI.',
    heroPrimaryBtn: 'Find Schemes',
    heroSecondaryBtn: 'Check Eligibility',
    heroSearchPlaceholder: 'Search by scheme name, category, or keyword (e.g. Farmer, Healthcare, Housing)...',

    categoriesTitle: 'Explore Schemes by Category',
    categoriesSubtitle: 'Browse schemes tailored to various sectors and citizen groups',
    catAgriculture: 'Agriculture',
    catEducation: 'Education',
    catWomenChild: 'Women & Child',
    catHealthcare: 'Healthcare',
    catHousing: 'Housing',
    catEmployment: 'Employment',
    catSocialSecurity: 'Social Security',
    catFinancialInclusion: 'Financial Inclusion',

    schemeCardMinistry: 'Ministry',
    schemeCardBenefits: 'Key Benefits',
    schemeCardEligibility: 'Eligibility Criteria',
    schemeCardApplyOfficial: 'Apply on Official Portal',
    schemeCardViewDetails: 'View Full Details',
    schemeCardAskAI: 'Ask JanSahay AI',

    eligibilityTitle: 'Smart Eligibility Checker',
    eligibilitySubtitle: 'Answer a few quick questions to instantly find all government schemes you are eligible for',
    eligibilityStep1: 'Basic Profile',
    eligibilityStep2: 'Occupation & Income',
    eligibilityStep3: 'Special Status',
    eligibilityCheckBtn: 'Evaluate My Eligibility',
    eligibilityResultEligible: 'Eligible Schemes',
    eligibilityResultPossible: 'Possibly Eligible Schemes',
    eligibilityResultNotEligible: 'Currently Ineligible',

    grievanceTitle: 'Public Grievance Redressal',
    grievanceSubtitle: 'Register grievances regarding government scheme delivery or track your existing complaint',
    grievanceRegisterTab: 'Register New Grievance',
    grievanceTrackTab: 'Track Grievance Status',
    grievanceDeptLabel: 'Department / Ministry',
    grievanceCategoryLabel: 'Grievance Category',
    grievanceSubjectLabel: 'Subject',
    grievanceDescLabel: 'Detailed Description',
    grievanceSubmitBtn: 'Submit Grievance',
    grievanceRefPrompt: 'Enter your 12-digit Grievance Reference ID (e.g., JAN-2026-849201)',
    grievanceTrackBtn: 'Track Status',

    chatTitle: 'JanSahay Multilingual AI Assistant',
    chatSubtitle: 'Ask any questions about government schemes, eligibility rules, document requirements, or grievance tracking in English, Hindi, or Bengali.',
    chatPlaceholder: 'Ask JanSahay AI a question...',
    chatSendBtn: 'Send',
    chatSuggestedPrompts: 'Suggested Questions',
    chatClearBtn: 'Clear Chat',

    footerText: 'JanSahay Citizen Portal — Empowering citizens through simplified scheme discovery and grievance assistance.',
    footerHelplines: 'National Emergency & Citizen Helplines',
    footerOfficialNotice: 'Disclaimer: JanSahay provides guidance and connects citizens directly to genuine government portals (.gov.in / .nic.in). Applications are submitted on official government portals.'
  },
  hi: {
    appName: 'जनसहाय',
    appTagline: 'सरकारी योजनाएं। सभी के लिए सरल।',
    navHome: 'मुख्य पृष्ठ',
    navSchemes: 'योजनाएं',
    navEligibility: 'पात्रता जांच',
    navGrievance: 'शिकायत पोर्टल',
    navAI: 'जनसहाय AI',
    navDashboard: 'डैशबोर्ड',
    navHelp: 'सहायता एवं उत्तर',
    navLogin: 'लॉग इन',
    navRegister: 'पंजीकरण',
    navLogout: 'लॉग आउट',

    heroTitle: 'सरकारी योजनाएं। सभी के लिए सरल।',
    heroSubtitle: 'केंद्र और राज्य सरकार की योजनाओं की खोज करें, अपनी पात्रता की जांच करें, आधिकारिक आवेदन पोर्टल तक पहुंचें, शिकायतें दर्ज करें और जनसहाय AI से सहायता प्राप्त करें।',
    heroPrimaryBtn: 'योजनाएं खोजें',
    heroSecondaryBtn: 'पात्रता जांचें',
    heroSearchPlaceholder: 'योजना के नाम, श्रेणी या कीवर्ड से खोजें (जैसे किसान, स्वास्थ्य, आवास)...',

    categoriesTitle: 'श्रेणी के अनुसार योजनाएं खोजें',
    categoriesSubtitle: 'विभिन्न क्षेत्रों और नागरिक समूहों के लिए तैयार की गई योजनाएं देखें',
    catAgriculture: 'कृषि',
    catEducation: 'शिक्षा',
    catWomenChild: 'महिला एवं बाल',
    catHealthcare: 'स्वास्थ्य',
    catHousing: 'आवास',
    catEmployment: 'रोजगार',
    catSocialSecurity: 'सामाजिक सुरक्षा',
    catFinancialInclusion: 'वित्तीय समावेशन',

    schemeCardMinistry: 'मंत्रालय',
    schemeCardBenefits: 'मुख्य लाभ',
    schemeCardEligibility: 'पात्रता मानदंड',
    schemeCardApplyOfficial: 'आधिकारिक पोर्टल पर जाएं',
    schemeCardViewDetails: 'पूरा विवरण देखें',
    schemeCardAskAI: 'जनसहाय AI से पूछें',

    eligibilityTitle: 'स्मार्ट पात्रता जांच',
    eligibilitySubtitle: 'कुछ आसान प्रश्नों के उत्तर दें और जानें कि आप किन सरकारी योजनाओं के पात्र हैं',
    eligibilityStep1: 'मूल जानकारी',
    eligibilityStep2: 'व्यवसाय एवं आय',
    eligibilityStep3: 'विशेष स्थिति',
    eligibilityCheckBtn: 'मेरी पात्रता की जांच करें',
    eligibilityResultEligible: 'योग्य योजनाएं',
    eligibilityResultPossible: 'संभावित योग्य योजनाएं',
    eligibilityResultNotEligible: 'वर्तमान में अयोग्य',

    grievanceTitle: 'जन शिकायत निवारण',
    grievanceSubtitle: 'सरकारी योजनाओं के वितरण से संबंधित शिकायत दर्ज करें या अपनी मौजूदा शिकायत ट्रैक करें',
    grievanceRegisterTab: 'नई शिकायत दर्ज करें',
    grievanceTrackTab: 'शिकायत की स्थिति ट्रैक करें',
    grievanceDeptLabel: 'विभाग / मंत्रालय',
    grievanceCategoryLabel: 'शिकायत की श्रेणी',
    grievanceSubjectLabel: 'विषय',
    grievanceDescLabel: 'विस्तृत विवरण',
    grievanceSubmitBtn: 'शिकायत जमा करें',
    grievanceRefPrompt: 'अपना 12-अंकों का शिकायत संदर्भ आईडी दर्ज करें (जैसे JAN-2026-849201)',
    grievanceTrackBtn: 'स्थिति ट्रैक करें',

    chatTitle: 'जनसहाय बहुभाषी AI सहायक',
    chatSubtitle: 'सरकारी योजनाओं, पात्रता नियमों, दस्तावेजों और शिकायतों के बारे में अंग्रेजी, हिंदी या बंगाली में पूछें।',
    chatPlaceholder: 'जनसहाय AI से अपना प्रश्न पूछें...',
    chatSendBtn: 'भेजें',
    chatSuggestedPrompts: 'सुझाए गए प्रश्न',
    chatClearBtn: 'चैट साफ़ करें',

    footerText: 'जनसहाय नागरिक पोर्टल — योजना खोज और शिकायत सहायता को सरल बनाकर नागरिकों को सशक्त बनाना।',
    footerHelplines: 'राष्ट्रीय आपातकालीन एवं नागरिक हेल्पलाइन',
    footerOfficialNotice: 'अस्वीकरण: जनसहाय मार्गदर्शन प्रदान करता है और नागरिकों को सीधे वास्तविक सरकारी पोर्टलों (.gov.in / .nic.in) से जोड़ता है।'
  },
  bn: {
    appName: 'জনসহায়',
    appTagline: 'সরকারি প্রকল্প। সবার জন্য সহজ।',
    navHome: 'হোম',
    navSchemes: 'প্রকল্পসমূহ',
    navEligibility: 'যোগ্যতা যাচাই',
    navGrievance: 'অভিযোগ পোর্টাল',
    navAI: 'জনসহায় AI',
    navDashboard: 'ড্যাশবোর্ড',
    navHelp: 'সাহায্য ও প্রশ্নোত্তর',
    navLogin: 'লগ ইন',
    navRegister: 'রেজিস্ট্রেশন',
    navLogout: 'লগ আউট',

    heroTitle: 'সরকারি প্রকল্প। সবার জন্য সহজ।',
    heroSubtitle: 'কেন্দ্র ও রাজ্য সরকারি প্রকল্প খুঁজুন, যোগ্যতা পরীক্ষা করুন, আসল সরকারি পোর্টালে সরাসরি আবেদন করুন, অভিযোগ নিববন্ধন করুন এবং জনসহায় AI থেকে তাৎক্ষণিক সাহায্য পান।',
    heroPrimaryBtn: 'প্রকল্প খুঁজুন',
    heroSecondaryBtn: 'যোগ্যতা পরীক্ষা করুন',
    heroSearchPlaceholder: 'প্রকল্পের নাম, ক্যাটাগরি বা বিষয় অনুযায়ী খুঁজুন (যেমন কৃষক, স্বাস্থ্য, বাড়ি)...',

    categoriesTitle: 'ক্যাটাগরি অনুযায়ী প্রকল্প খুঁজুন',
    categoriesSubtitle: 'বিভিন্ন ক্ষেত্র ও নাগরিকদের উপযোগী সরকারি প্রকল্পসমূহ',
    catAgriculture: 'কৃষি',
    catEducation: 'শিক্ষা',
    catWomenChild: 'নারী ও শিশু',
    catHealthcare: 'স্বাস্থ্য',
    catHousing: 'আবাসন',
    catEmployment: 'কর্মসংস্থান',
    catSocialSecurity: 'সামাজিক সুরক্ষা',
    catFinancialInclusion: 'আর্থিক অন্তর্ভুক্তিকরণ',

    schemeCardMinistry: 'মন্ত্রক',
    schemeCardBenefits: 'প্রধান সুবিধাসমূহ',
    schemeCardEligibility: 'যোগ্যতার মাপকাঠি',
    schemeCardApplyOfficial: 'অফিসিয়াল পোর্টালে আবেদন করুন',
    schemeCardViewDetails: 'বিস্তারিত দেখুন',
    schemeCardAskAI: 'জনসহায় AI-কে জিজ্ঞাসা করুন',

    eligibilityTitle: 'স্মার্ট যোগ্যতা পরীক্ষক',
    eligibilitySubtitle: 'কয়েকটি সহজ প্রশ্নের উত্তর দিয়ে জেনে নিন আপনি কোন কোন সরকারি প্রকল্পের সুযোগ পাওয়ার যোগ্য',
    eligibilityStep1: 'প্রাথমিক তথ্য',
    eligibilityStep2: 'পেশা ও আয়',
    eligibilityStep3: 'বিশেষ সুবিধাশ্রেণী',
    eligibilityCheckBtn: 'যোগ্যতা যাচাই করুন',
    eligibilityResultEligible: 'যোগ্য প্রকল্পসমূহ',
    eligibilityResultPossible: 'সম্ভাব্য যোগ্য প্রকল্পসমূহ',
    eligibilityResultNotEligible: 'বর্তমানে অযোগ্য',

    grievanceTitle: 'জন অভিযোগ প্রতিকার পোর্টাল',
    grievanceSubtitle: 'সরকারি কোনো প্রকল্পের সুবিধা পেতে সমস্যা হলে অভিযোগ দায়ের করুন অথবা বিদ্যমান অভিযোগের স্ট্যাটাস ট্র্যাক করুন',
    grievanceRegisterTab: 'নতুন অভিযোগ দায়ের করুন',
    grievanceTrackTab: 'অভিযোগের বর্তমান অবস্থা ট্র্যাক করুন',
    grievanceDeptLabel: 'দপ্তর / মন্ত্রক',
    grievanceCategoryLabel: 'অভিযোগের ধরন',
    grievanceSubjectLabel: 'বিষয়',
    grievanceDescLabel: 'বিস্তারিত বিবরণ',
    grievanceSubmitBtn: 'অভিযোগ জমা দিন',
    grievanceRefPrompt: 'আপনার ১২ ডিজিটের অভিযোগ ট্র্যাকিং আইডি লিখুন (যেমন JAN-2026-849201)',
    grievanceTrackBtn: 'স্ট্যাটাস দেখুন',

    chatTitle: 'জনসহায় বহুভাষিক AI সহকারী',
    chatSubtitle: 'সরকারি প্রকল্প, যোগ্যতার নিয়ম, প্রয়োজনীয় কাগজপত্র বা যেকোনো প্রশ্ন বাংলা, হিন্দি অথবা ইংরেজিতে করুন।',
    chatPlaceholder: 'জনসহায় AI-কে আপনার প্রশ্ন করুন...',
    chatSendBtn: 'পাঠান',
    chatSuggestedPrompts: 'সুপারিশকৃত প্রশ্নাবলী',
    chatClearBtn: 'চ্যাট মুছুন',

    footerText: 'জনসহায় নাগরিক পোর্টাল — সাধারণ মানুষের কাছে সরকারি সুবিধা ও সহায়তা সহজভাবে পৌঁছে দেওয়া।',
    footerHelplines: 'জাতীয় জরুরি ও নাগরিক হেল্পলাইনসমূহ',
    footerOfficialNotice: 'দায়মুক্তি: জনসহায় কেবল সঠিক দিশা দেখায় এবং সরাসরি আসল সরকারি ডোমেইনে (.gov.in / .nic.in) সংযুক্ত করে।'
  }
};
