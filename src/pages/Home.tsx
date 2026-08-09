import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sparkles, CheckCircle2, ShieldCheck, ExternalLink, Bot, ArrowRight, Building2, Users, HeartHandshake, HelpCircle, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SchemeCard } from '../components/SchemeCard';
import { SCHEMES_DATA } from '../data/schemesData';

export const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/schemes?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/schemes');
    }
  };

  const categories = [
    { name: t.catAgriculture, icon: '🌾', query: 'Agriculture' },
    { name: t.catHealthcare, icon: '🏥', query: 'Healthcare' },
    { name: t.catHousing, icon: '🏠', query: 'Housing' },
    { name: t.catEducation, icon: '🎓', query: 'Education' },
    { name: t.catWomenChild, icon: '👧', query: 'Women & Child' },
    { name: t.catEmployment, icon: '💼', query: 'Employment' },
    { name: t.catFinancialInclusion, icon: '💳', query: 'Financial Inclusion' },
    { name: t.catSocialSecurity, icon: '🛡️', query: 'Social Security' },
  ];

  const popularSchemes = SCHEMES_DATA.filter(s => s.isPopular).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Hero Bento Card (Spans 2 cols, 2 rows) */}
          <div className="lg:col-span-2 lg:row-span-2 bg-white border-2 border-slate-900 rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <div className="space-y-6">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-slate-900 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>Official Government Citizen Portal</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight font-sans">
                {t.heroTitle}
              </h1>

              {/* Subtitle */}
              <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-xl">
                {t.heroSubtitle}
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="pt-2">
                <div className="relative flex items-center bg-slate-50 rounded-2xl p-2 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                  <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.heroSearchPlaceholder}
                    className="w-full px-3 py-2 bg-transparent text-slate-900 placeholder-slate-400 text-xs font-bold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all border-2 border-slate-900 shrink-0 flex items-center gap-1.5"
                  >
                    <span>{t.heroPrimaryBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 pt-6 border-t-2 border-slate-100 flex flex-wrap gap-3">
              <Link
                to="/eligibility"
                className="px-5 py-2.5 bg-amber-300 hover:bg-amber-200 text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-slate-900" />
                <span>{t.heroSecondaryBtn}</span>
              </Link>
              <Link
                to="/chat"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Ask JanSahay AI</span>
              </Link>
            </div>
          </div>

          {/* Bento Card 2: AI Assistance */}
          <div className="lg:col-span-1 bg-slate-900 text-white rounded-[2rem] border-2 border-slate-900 p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Assistant</span>
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="my-4">
              <h2 className="text-xl font-black text-white font-sans">Multilingual Support</h2>
              <p className="text-xs text-slate-400 mt-1">Get instant answers in English, Hindi, and Bengali.</p>
            </div>
            <Link to="/chat" className="text-xs font-black text-emerald-400 uppercase tracking-widest hover:underline flex items-center gap-1">
              <span>Start Chatting</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Bento Card 3: Grievances Track */}
          <div className="lg:col-span-1 bg-amber-300 text-slate-900 rounded-[2rem] border-2 border-slate-900 p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Redressal</span>
              <FileText className="w-5 h-5 text-slate-900" />
            </div>
            <div className="my-4">
              <div className="text-3xl font-black">Track Status</div>
              <p className="text-xs font-bold text-slate-800 mt-1">Real-time resolution for delays & complaints</p>
            </div>
            <Link to="/grievance" className="text-xs font-black uppercase tracking-widest underline flex items-center gap-1">
              <span>Register Grievance</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Bento Card 4: Active Schemes Count */}
          <div className="lg:col-span-1 bg-indigo-600 text-white rounded-[2rem] border-2 border-slate-900 p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Directory Coverage</span>
            <div className="my-3">
              <div className="text-4xl font-black">12+</div>
              <p className="text-xs font-bold opacity-90 mt-1">Flagship Welfare Programs</p>
            </div>
            <Link to="/schemes" className="text-xs font-black uppercase tracking-widest underline flex items-center gap-1">
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Bento Card 5: Eligibility Wizard */}
          <div className="lg:col-span-1 bg-emerald-400 text-slate-900 rounded-[2rem] border-2 border-slate-900 p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Instant Verification</span>
              <Sparkles className="w-5 h-5 text-slate-900" />
            </div>
            <div className="my-3">
              <h3 className="text-xl font-black text-slate-900">Check Eligibility</h3>
              <p className="text-xs font-bold text-slate-800 mt-1">3-step evaluation tool for your profile</p>
            </div>
            <Link to="/eligibility" className="text-xs font-black uppercase tracking-widest underline flex items-center gap-1">
              <span>Evaluate Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Scheme Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sectoral Navigation</span>
          <h2 className="text-3xl font-black text-slate-900 font-sans mt-1">
            {t.categoriesTitle}
          </h2>
          <p className="text-xs font-medium text-slate-600 mt-1">
            {t.categoriesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/schemes?category=${encodeURIComponent(cat.query)}`}
              className="p-5 bg-white border-2 border-slate-900 rounded-[1.5rem] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:bg-emerald-50 hover:-translate-y-0.5 transition-all group flex flex-col items-center text-center space-y-2"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Schemes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">National Priority</span>
            <h2 className="text-3xl font-black text-slate-900 font-sans mt-1">
              Flagship Government Schemes
            </h2>
            <p className="text-xs font-medium text-slate-600 mt-1">
              Top national welfare schemes providing financial assistance, healthcare, and housing
            </p>
          </div>
          <Link
            to="/schemes"
            className="px-4 py-2 bg-white border-2 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-wider rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <span>View All Schemes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularSchemes.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </section>

      {/* How JanSahay Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-slate-900 rounded-[2.5rem] p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Simple Workflow</span>
            <h2 className="text-3xl font-black text-slate-900 font-sans mt-1">
              How JanSahay Works for You
            </h2>
            <p className="text-xs font-medium text-slate-600 mt-1">
              Simple 4-step process to discover, verify eligibility, and apply for citizen benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-emerald-50 p-6 rounded-[2rem] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] relative">
              <span className="w-8 h-8 rounded-full bg-emerald-400 border border-slate-900 text-slate-900 text-xs font-black flex items-center justify-center mb-4">
                1
              </span>
              <h3 className="text-base font-black text-slate-900 mb-2 font-sans">Discover Schemes</h3>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                Browse schemes by category, ministry, state, or target group with multilingual support.
              </p>
            </div>

            <div className="bg-amber-50 p-6 rounded-[2rem] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] relative">
              <span className="w-8 h-8 rounded-full bg-amber-300 border border-slate-900 text-slate-900 text-xs font-black flex items-center justify-center mb-4">
                2
              </span>
              <h3 className="text-base font-black text-slate-900 mb-2 font-sans">Check Eligibility</h3>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                Use our smart wizard to instantly evaluate your age, occupation, and income against scheme criteria.
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-[2rem] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] relative">
              <span className="w-8 h-8 rounded-full bg-indigo-200 border border-slate-900 text-slate-900 text-xs font-black flex items-center justify-center mb-4">
                3
              </span>
              <h3 className="text-base font-black text-slate-900 mb-2 font-sans">Apply Officially</h3>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                Access direct links to authentic government application portals (.gov.in / .nic.in).
              </p>
            </div>

            <div className="bg-slate-100 p-6 rounded-[2rem] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] relative">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white border border-slate-900 text-xs font-black flex items-center justify-center mb-4">
                4
              </span>
              <h3 className="text-base font-black text-slate-900 mb-2 font-sans">Track & Redress</h3>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                Register public grievances and track resolution timelines with JanSahay AI support.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Grievance & AI Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 sm:p-12 border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3 py-1 bg-emerald-400 text-slate-900 border border-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full">
              Public Grievance Portal
            </span>
            <h2 className="text-3xl font-black font-sans leading-snug text-white">
              Facing Delays or Issues Receiving Scheme Benefits?
            </h2>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Register an official public grievance with the concerned department and track your complaint status in real-time with your unique reference ID.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              to="/grievance"
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-transform hover:-translate-y-0.5 text-center"
            >
              Register Grievance
            </Link>
            <Link
              to="/grievance?tab=track"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-700 transition-all text-center"
            >
              Track Complaint
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
