import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GrievanceRegister } from './GrievanceRegister';
import { GrievanceTrack } from './GrievanceTrack';
import { FileText, Search, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Grievance: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState<'register' | 'track'>(
    tabParam === 'track' ? 'track' : 'register'
  );

  useEffect(() => {
    if (tabParam === 'track') {
      setActiveTab('track');
    } else {
      setActiveTab('register');
    }
  }, [tabParam]);

  const handleTabChange = (tab: 'register' | 'track') => {
    setActiveTab(tab);
    setSearchParams(tab === 'track' ? { tab: 'track' } : {});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-900 text-emerald-400 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Public Grievance Redressal</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 font-sans">
          {t.grievanceTitle}
        </h1>
        <p className="text-xs font-medium text-slate-600">
          {t.grievanceSubtitle}
        </p>
      </div>

      {/* Tabs Selector Bento Box */}
      <div className="flex bg-white p-2 rounded-[2rem] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] max-w-md mx-auto gap-2">
        <button
          onClick={() => handleTabChange('register')}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all border-2 ${
            activeTab === 'register'
              ? 'bg-indigo-600 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
              : 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{t.grievanceRegisterTab}</span>
        </button>

        <button
          onClick={() => handleTabChange('track')}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all border-2 ${
            activeTab === 'track'
              ? 'bg-slate-900 text-emerald-400 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
              : 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>{t.grievanceTrackTab}</span>
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'register' ? <GrievanceRegister /> : <GrievanceTrack />}

    </div>
  );
};
