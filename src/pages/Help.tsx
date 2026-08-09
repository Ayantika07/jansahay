import React, { useState } from 'react';
import { HelpCircle, PhoneCall, ChevronDown, ShieldCheck, FileText, ExternalLink, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export const Help: React.FC = () => {
  const { t } = useLanguage();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does JanSahay guarantee direct official government links?',
      a: 'JanSahay indexes scheme URLs originating exclusively from official .gov.in and .nic.in domains (such as pmkisan.gov.in and pmaymis.gov.in). We never route applications through third-party agents.'
    },
    {
      q: 'Is JanSahay free to use for Indian citizens?',
      a: 'Yes, 100% free forever. JanSahay is a public benefit citizen utility designed to bridge the awareness gap for government schemes across rural and urban India.'
    },
    {
      q: 'How does the Multilingual JanSahay AI Assistant work?',
      a: 'JanSahay AI uses Gemini model capabilities hosted securely on our server to answer questions regarding scheme guidelines, eligibility rules, required documents, and grievance registration in English, Hindi (हिंदी), and Bengali (বাংলা).'
    },
    {
      q: 'What happens when I register a public grievance on JanSahay?',
      a: 'When you submit a complaint, a 12-digit reference ID (e.g., JAN-2026-XXXXXX) is generated and logged into our public grievance tracking database. You can track real-time resolution stages anytime.'
    },
    {
      q: 'Which documents are generally required for central welfare schemes?',
      a: 'Most schemes require: 1) Aadhaar Card, 2) Bank Account Passbook seeded with Aadhaar, 3) Income Certificate, 4) Caste/Category Certificate (if applicable), 5) Passport photo, and 6) Active Mobile Number.'
    }
  ];

  const helplines = [
    { name: 'National Consumer Helpline', number: '1915', desc: 'Grievance redressal for public services & commerce' },
    { name: 'PM-KISAN Samman Nidhi Helpline', number: '155261', desc: 'Direct support for farmer installment queries' },
    { name: 'Ayushman Bharat Toll-Free', number: '14555', desc: 'Golden card & empanelled hospital queries' },
    { name: 'PMAY Housing Helpline', number: '1800-11-3377', desc: 'Pradhan Mantri Awas Yojana assistance' },
    { name: 'Women Helpline', number: '1091', desc: '24/7 National safety & emergency helpline' },
    { name: 'National Scholarship Portal Helpline', number: '0120-6619540', desc: 'Student scholarship application support' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Citizen Support & Helplines</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 font-serif">
          Frequently Asked Questions & Helplines
        </h1>
        <p className="text-sm text-slate-600">
          Find instant answers to common scheme queries and official toll-free numbers.
        </p>
      </div>

      {/* Emergency Helplines Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-emerald-600" />
          <span>Official National Helplines</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {helplines.map((h, idx) => (
            <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{h.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1">{h.desc}</p>
              </div>
              <a
                href={`tel:${h.number.replace(/[^0-9]/g, '')}`}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold font-mono text-xs rounded-xl flex items-center justify-between"
              >
                <span>Call Helpline</span>
                <span className="text-sm">{h.number}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-serif">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>

              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ask AI Callout */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-serif text-white">Have a Specific Question?</h3>
          <p className="text-xs text-slate-300">
            Ask JanSahay Multilingual AI in English, Hindi (हिंदी), or Bengali (বাংলা) for real-time scheme assistance.
          </p>
        </div>

        <Link
          to="/chat"
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shrink-0 transition-all shadow-md"
        >
          <Bot className="w-4 h-4" />
          <span>Ask JanSahay AI</span>
        </Link>
      </div>

    </div>
  );
};
