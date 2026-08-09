import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ExternalLink, Bot, Bookmark, CheckCircle2, Building2, ArrowRight, Sparkles } from 'lucide-react';
import { Scheme } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface SchemeCardProps {
  scheme: Scheme;
  onSelectContext?: (scheme: Scheme) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onSelectContext }) => {
  const { language, t } = useLanguage();
  const { toggleSaveScheme, isSavedScheme } = useAuth();
  const navigate = useNavigate();

  const name = scheme.name[language] || scheme.name.en;
  const shortDesc = scheme.shortDescription[language] || scheme.shortDescription.en;
  const benefits = scheme.benefits[language] || scheme.benefits.en;
  const eligibilitySummary = scheme.eligibilitySummary[language] || scheme.eligibilitySummary.en;

  const isSaved = isSavedScheme(scheme.id);

  const handleAskAI = () => {
    if (onSelectContext) {
      onSelectContext(scheme);
    } else {
      navigate('/chat', { state: { scheme } });
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Header & Badges */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-emerald-100 text-emerald-900 border border-slate-900">
              {scheme.category}
            </span>
            <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-slate-100 text-slate-800 border border-slate-900">
              {scheme.state}
            </span>
            {scheme.isPopular && (
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-amber-300 text-slate-900 border border-slate-900 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-slate-900 fill-slate-900" />
                Popular
              </span>
            )}
          </div>

          <button
            onClick={() => toggleSaveScheme(scheme.id)}
            title={isSaved ? 'Remove from Saved' : 'Save Scheme'}
            className={`p-2 rounded-xl border border-slate-900 transition-all ${
              isSaved ? 'bg-emerald-400 text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]' : 'bg-slate-50 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-slate-900' : ''}`} />
          </button>
        </div>

        {/* Scheme Name */}
        <Link to={`/schemes/${scheme.id}`} className="block group-hover:text-indigo-600 transition-colors">
          <h3 className="text-xl font-black text-slate-900 leading-snug font-sans tracking-tight">
            {name}
          </h3>
        </Link>

        {/* Ministry */}
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1.5 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{scheme.ministry}</span>
        </p>

        {/* Short Description */}
        <p className="text-xs font-medium text-slate-600 mt-3 leading-relaxed">
          {shortDesc}
        </p>

        {/* Key Benefits Bullet Points */}
        <div className="mt-4 pt-4 border-t-2 border-slate-100 space-y-2">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">
            {t.schemeCardBenefits}
          </h4>
          <ul className="space-y-1.5 text-xs font-semibold text-slate-800">
            {benefits.slice(0, 2).map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="px-6 py-4 bg-slate-50 border-t-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Ask AI Button */}
          <button
            onClick={handleAskAI}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 text-[10px] font-black uppercase tracking-wider border-2 border-slate-900 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
          >
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.schemeCardAskAI}</span>
          </button>

          {/* Details Link */}
          <Link
            to={`/schemes/${scheme.id}`}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Official Portal Direct Link */}
        <a
          href={scheme.applicationUrl || scheme.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider border-2 border-slate-900 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
        >
          <span>{t.schemeCardApplyOfficial}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

      </div>
    </div>
  );
};
