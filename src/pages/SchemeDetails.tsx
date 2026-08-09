import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ExternalLink, Bot, Building2, CheckCircle2, FileText, ArrowLeft, Bookmark, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Scheme } from '../types';
import { api } from '../services/api';

export const SchemeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { toggleSaveScheme, isSavedScheme } = useAuth();
  const navigate = useNavigate();

  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchSchemeDetails(id);
    }
  }, [id]);

  const fetchSchemeDetails = async (schemeId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getSchemeById(schemeId);
      setScheme(data);
    } catch (err: any) {
      setError('Scheme details could not be found.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-600">Loading scheme information...</p>
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">Scheme Not Found</h2>
        <p className="text-sm text-slate-600">The requested government scheme information is unavailable.</p>
        <Link to="/schemes" className="inline-block px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">
          Back to Schemes Directory
        </Link>
      </div>
    );
  }

  const name = scheme.name[language] || scheme.name.en;
  const description = scheme.description[language] || scheme.description.en;
  const benefits = scheme.benefits[language] || scheme.benefits.en;
  const eligibilitySummary = scheme.eligibilitySummary[language] || scheme.eligibilitySummary.en;
  const documents = scheme.documentsRequired[language] || scheme.documentsRequired.en;
  const processSteps = scheme.applicationProcess[language] || scheme.applicationProcess.en;

  const isSaved = isSavedScheme(scheme.id);

  const handleAskAI = () => {
    navigate('/chat', { state: { scheme } });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Button */}
      <Link to="/schemes" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Schemes</span>
      </Link>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-6">
        
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {scheme.category}
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">
              {scheme.state}
            </span>
            {scheme.isPopular && (
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Popular Flagship Scheme
              </span>
            )}
          </div>

          <button
            onClick={() => toggleSaveScheme(scheme.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isSaved ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-800' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Bookmark'}</span>
          </button>
        </div>

        {/* Scheme Name */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif leading-tight">
            {name}
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>{scheme.ministry}</span>
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
          <a
            href={scheme.applicationUrl || scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-emerald-900/20"
          >
            <span>{t.schemeCardApplyOfficial}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={handleAskAI}
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 text-sm font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm"
          >
            <Bot className="w-4 h-4" />
            <span>Ask JanSahay AI About This Scheme</span>
          </button>
        </div>

      </div>

      {/* Overview & Description */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-serif">Scheme Overview</h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Key Benefits */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-serif">Key Benefits Provided</h2>
        <ul className="space-y-3">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Eligibility Requirements */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-serif">Eligibility Criteria</h2>
        <p className="text-sm font-medium text-slate-700 bg-emerald-50/80 border border-emerald-200/60 p-4 rounded-2xl">
          {eligibilitySummary}
        </p>

        {scheme.eligibilityCriteria && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            {scheme.eligibilityCriteria.minAge && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500 font-semibold block">Minimum Age:</span>
                <span className="text-slate-900 font-bold">{scheme.eligibilityCriteria.minAge} years</span>
              </div>
            )}
            {scheme.eligibilityCriteria.maxIncome && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500 font-semibold block">Maximum Annual Income:</span>
                <span className="text-slate-900 font-bold">₹{scheme.eligibilityCriteria.maxIncome.toLocaleString('en-IN')}</span>
              </div>
            )}
            {scheme.eligibilityCriteria.gender && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500 font-semibold block">Gender:</span>
                <span className="text-slate-900 font-bold">{scheme.eligibilityCriteria.gender}</span>
              </div>
            )}
            {scheme.eligibilityCriteria.targetGroup && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500 font-semibold block">Beneficiary Category:</span>
                <span className="text-slate-900 font-bold">{scheme.eligibilityCriteria.targetGroup.join(', ')}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Documents Required */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <span>Required Documents Checklist</span>
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {documents.map((doc, idx) => (
            <li key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Step-by-Step Application Process */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-serif">How to Apply</h2>
        <div className="space-y-4">
          {processSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium mt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Link Notice Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-white text-sm">Authentic Government Portal</p>
            <p className="text-slate-400">All applications are submitted directly on the official government domain ({scheme.officialUrl}).</p>
          </div>
        </div>

        <a
          href={scheme.applicationUrl || scheme.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0"
        >
          <span>Open Official Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
