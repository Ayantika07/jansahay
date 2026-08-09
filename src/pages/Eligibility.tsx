import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, RefreshCw, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { EligibilityInput, EligibilityResult } from '../types';
import { api } from '../services/api';
import { SchemeCard } from '../components/SchemeCard';

export const Eligibility: React.FC = () => {
  const { language, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [results, setResults] = useState<EligibilityResult[] | null>(null);

  const [formData, setFormData] = useState<EligibilityInput>({
    age: 30,
    gender: 'Female',
    state: 'All India',
    occupation: 'farmer',
    annualIncome: 120000,
    isStudent: false,
    isFarmer: true,
    isSeniorCitizen: false,
    isBPL: true,
    category: 'General'
  });

  const handleInputChange = (field: keyof EligibilityInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckEligibility = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    try {
      const res = await api.checkEligibility(formData);
      setResults(res.results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const resetWizard = () => {
    setResults(null);
    setStep(1);
  };

  const eligibleSchemes = results?.filter(r => r.status === 'Eligible') || [];
  const possiblyEligibleSchemes = results?.filter(r => r.status === 'Possibly Eligible') || [];
  const ineligibleSchemes = results?.filter(r => r.status === 'Not Eligible') || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-400 border border-slate-900 text-slate-900 text-[10px] font-black uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          <span>Smart Citizen Evaluator</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 font-sans">
          {t.eligibilityTitle}
        </h1>
        <p className="text-xs font-medium text-slate-600">
          {t.eligibilitySubtitle}
        </p>
      </div>

      {!results ? (
        <form onSubmit={handleCheckEligibility} className="bg-white rounded-[2.5rem] border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8 space-y-8">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">
            <span className={step >= 1 ? 'text-indigo-600 font-black' : ''}>1. {t.eligibilityStep1}</span>
            <span className={step >= 2 ? 'text-indigo-600 font-black' : ''}>2. {t.eligibilityStep2}</span>
            <span className={step >= 3 ? 'text-indigo-600 font-black' : ''}>3. {t.eligibilityStep3}</span>
          </div>

          {/* Step 1: Basic Profile */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-black text-slate-900 font-sans uppercase tracking-wider">Personal Demographics</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-700 mb-2">
                    Your Age (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:bg-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-700 mb-2">
                  State / Union Territory
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:bg-white"
                >
                  <option value="All India">All India / Central</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Occupation & Income */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 font-serif">Occupation & Household Income</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Primary Occupation
                  </label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => {
                      const occ = e.target.value;
                      handleInputChange('occupation', occ);
                      if (occ === 'farmer') handleInputChange('isFarmer', true);
                      if (occ === 'student') handleInputChange('isStudent', true);
                    }}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-600"
                  >
                    <option value="farmer">Farmer / Agricultural Worker</option>
                    <option value="student">Student</option>
                    <option value="vendor">Street Vendor / Hawker</option>
                    <option value="artisan">Artisan / Craftsperson</option>
                    <option value="employed">Salaried Employee</option>
                    <option value="unemployed">Unemployed / Jobseeker</option>
                    <option value="homemaker">Homemaker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Annual Household Income (₹ INR)
                  </label>
                  <input
                    type="number"
                    step="10000"
                    value={formData.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-600"
                    required
                  />
                  <p className="text-[10px] text-slate-500 mt-1">E.g., 1,20,000 for ₹1.2 Lakh per year</p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-slate-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-emerald-500"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Special Status & Flags */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 font-serif">Beneficiary Category & Flags</h2>

              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="flex items-center gap-3 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFarmer}
                    onChange={(e) => handleInputChange('isFarmer', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>Farmer family owning agricultural land</span>
                </label>

                <label className="flex items-center gap-3 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isStudent}
                    onChange={(e) => handleInputChange('isStudent', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>Currently enrolled student in school/college</span>
                </label>

                <label className="flex items-center gap-3 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBPL}
                    onChange={(e) => handleInputChange('isBPL', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>Holds BPL Ration Card / Low Income Certificate</span>
                </label>

                <label className="flex items-center gap-3 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.age >= 60}
                    onChange={(e) => handleInputChange('isSeniorCitizen', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>Senior Citizen (Aged 60+)</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-slate-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="submit"
                  disabled={isEvaluating}
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center gap-2 transition-all shadow-md shadow-emerald-900/20"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Evaluating Schemes...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Evaluate My Eligibility</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </form>
      ) : (
        /* Results View */
        <div className="space-y-8">
          
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold font-serif text-white">Eligibility Assessment Complete</h2>
              <p className="text-xs text-slate-300 mt-1">
                You are eligible for <strong>{eligibleSchemes.length}</strong> government welfare schemes.
              </p>
            </div>
            <button
              onClick={resetWizard}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700"
            >
              Recalculate Eligibility
            </button>
          </div>

          {/* Fully Eligible */}
          {eligibleSchemes.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-emerald-800 font-serif flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>{t.eligibilityResultEligible} ({eligibleSchemes.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eligibleSchemes.map(item => (
                  <SchemeCard key={item.scheme.id} scheme={item.scheme} />
                ))}
              </div>
            </div>
          )}

          {/* Possibly Eligible */}
          {possiblyEligibleSchemes.length > 0 && (
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-black text-amber-800 font-serif flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                <span>{t.eligibilityResultPossible} ({possiblyEligibleSchemes.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {possiblyEligibleSchemes.map(item => (
                  <SchemeCard key={item.scheme.id} scheme={item.scheme} />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
