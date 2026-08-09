import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, PhoneCall, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Landmark className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white font-serif">{t.appName}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.footerText}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Citizen Security Standard</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base tracking-wide uppercase font-serif">Quick Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/schemes" className="hover:text-emerald-400 transition-colors">Find Schemes</Link></li>
              <li><Link to="/eligibility" className="hover:text-emerald-400 transition-colors">Eligibility Checker</Link></li>
              <li><Link to="/grievance" className="hover:text-emerald-400 transition-colors">Register Grievance</Link></li>
              <li><Link to="/grievance" className="hover:text-emerald-400 transition-colors">Track Complaint Status</Link></li>
              <li><Link to="/chat" className="hover:text-emerald-400 transition-colors">JanSahay Multilingual AI</Link></li>
              <li><Link to="/help" className="hover:text-emerald-400 transition-colors">FAQs & Helplines</Link></li>
            </ul>
          </div>

          {/* Col 3: Key Welfare Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base tracking-wide uppercase font-serif">Welfare Sectors</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/schemes?category=Agriculture" className="hover:text-emerald-400 transition-colors">Farmers & Agriculture</Link></li>
              <li><Link to="/schemes?category=Healthcare" className="hover:text-emerald-400 transition-colors">Healthcare & Insurance</Link></li>
              <li><Link to="/schemes?category=Education" className="hover:text-emerald-400 transition-colors">Education & Scholarships</Link></li>
              <li><Link to="/schemes?category=Housing" className="hover:text-emerald-400 transition-colors">Housing & Sanitation</Link></li>
              <li><Link to="/schemes?category=Women%20%26%20Child" className="hover:text-emerald-400 transition-colors">Women & Child Development</Link></li>
              <li><Link to="/schemes?category=Employment" className="hover:text-emerald-400 transition-colors">Employment & Micro-Credit</Link></li>
            </ul>
          </div>

          {/* Col 4: Official Helplines */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base tracking-wide uppercase font-serif">{t.footerHelplines}</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                <span>National Consumer Helpline</span>
                <a href="tel:1915" className="font-bold text-emerald-400 flex items-center gap-1"><PhoneCall className="w-3 h-3" /> 1915</a>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                <span>PM-KISAN Helpline</span>
                <a href="tel:155261" className="font-bold text-emerald-400 flex items-center gap-1"><PhoneCall className="w-3 h-3" /> 155261</a>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                <span>Ayushman Bharat Call Center</span>
                <a href="tel:14555" className="font-bold text-emerald-400 flex items-center gap-1"><PhoneCall className="w-3 h-3" /> 14555</a>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                <span>Women Helpline</span>
                <a href="tel:1091" className="font-bold text-emerald-400 flex items-center gap-1"><PhoneCall className="w-3 h-3" /> 1091</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center space-y-4">
          <p className="text-xs text-slate-400 max-w-4xl mx-auto leading-relaxed">
            {t.footerOfficialNotice}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
            <span>&copy; 2026 JanSahay Citizen Welfare Portal</span>
            <span>•</span>
            <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
              National Portal of India (india.gov.in) <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
              CPGRAMS Public Grievance <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
