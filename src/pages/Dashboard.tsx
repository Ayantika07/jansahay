import React from 'react';
import { Link } from 'react-router-dom';
import { User, Bookmark, FileText, Sparkles, Download, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SCHEMES_DATA } from '../data/schemesData';
import { SchemeCard } from '../components/SchemeCard';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const savedIds = user?.savedSchemes || [];
  const savedSchemes = SCHEMES_DATA.filter(s => savedIds.includes(s.id));
  const recommendedSchemes = SCHEMES_DATA.slice(0, 2);

  const handleDownloadZip = () => {
    window.location.href = '/api/download-zip';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400 text-slate-900 border border-slate-900 text-[10px] font-black uppercase tracking-widest">
            <User className="w-3.5 h-3.5 text-slate-900" />
            <span>Authenticated Citizen Portal</span>
          </div>
          <h1 className="text-3xl font-black font-sans text-white">
            Welcome back, {user?.fullName || 'Citizen'}!
          </h1>
          <p className="text-xs font-medium text-slate-300 max-w-xl leading-relaxed">
            Access your saved schemes, track registered public grievances, and explore personalized welfare programs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadZip}
            className="px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-900 border-2 border-slate-900 font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-transform hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
            title="Download Standalone Project Package"
          >
            <Download className="w-4 h-4" />
            <span>Download JANSAHAY.zip</span>
          </button>
          
          <Link
            to="/eligibility"
            className="px-5 py-3 bg-amber-300 hover:bg-amber-200 text-slate-900 border-2 border-slate-900 font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-transform hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
          >
            <Sparkles className="w-4 h-4 text-slate-900" />
            <span>Check Eligibility</span>
          </Link>
        </div>
      </div>

      {/* Grid Summary Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 bg-white rounded-[2rem] border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-400 border-2 border-slate-900 text-slate-900 flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            {savedSchemes.length}
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-sans">Saved Schemes</span>
            <span className="text-sm font-black text-slate-900">Bookmarked Programs</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-[2rem] border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-300 border-2 border-slate-900 text-slate-900 flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            1
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-sans">Active Grievances</span>
            <span className="text-sm font-black text-slate-900">JAN-2026-849201</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-[2rem] border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 border-2 border-slate-900 text-white flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            12+
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-sans">Central Schemes</span>
            <span className="text-sm font-black text-slate-900">Direct Official Links</span>
          </div>
        </div>

      </div>

      {/* Saved Schemes Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 font-serif flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-emerald-600" />
            <span>Bookmarked Schemes ({savedSchemes.length})</span>
          </h2>
          <Link to="/schemes" className="text-xs font-bold text-emerald-700 hover:underline">
            Explore More Schemes
          </Link>
        </div>

        {savedSchemes.length === 0 ? (
          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
            <p className="text-xs font-medium text-slate-600">You have not bookmarked any schemes yet.</p>
            <Link to="/schemes" className="inline-block px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">
              Browse Schemes Directory
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedSchemes.map(s => (
              <SchemeCard key={s.id} scheme={s} />
            ))}
          </div>
        )}
      </div>

      {/* Recommended Schemes */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 font-serif flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <span>Recommended For You</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedSchemes.map(s => (
            <SchemeCard key={s.id} scheme={s} />
          ))}
        </div>
      </div>

    </div>
  );
};
