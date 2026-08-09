import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Grievance } from '../types';

export const GrievanceRegister: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdGrievance, setCreatedGrievance] = useState<Grievance | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Benefit Disbursement Delay',
    subject: '',
    description: ''
  });

  const departments = [
    'Ministry of Agriculture & Farmers Welfare',
    'Ministry of Health and Family Welfare',
    'Ministry of Housing and Urban Affairs',
    'Ministry of Rural Development',
    'Ministry of Finance',
    'Ministry of Education',
    'Ministry of Women and Child Development',
    'Ministry of Micro, Small and Medium Enterprises (MSME)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await api.registerGrievance(formData);
      setCreatedGrievance(res.grievance);
    } catch (err: any) {
      setError(err.message || 'Failed to submit grievance. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (createdGrievance) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-8 text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-serif">Grievance Submitted Successfully!</h2>
          <p className="text-xs text-slate-600 mt-2">
            Your public complaint has been logged and assigned to the Departmental Nodal Officer.
          </p>
        </div>

        <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Grievance Reference ID</span>
          <span className="text-3xl font-black font-mono text-emerald-400 select-all">{createdGrievance.referenceId}</span>
          <p className="text-[11px] text-slate-400 pt-2">
            Please save this 12-digit Reference ID to track status updates anytime.
          </p>
        </div>

        <button
          onClick={() => {
            setCreatedGrievance(null);
            setFormData({
              name: '',
              email: '',
              phone: '',
              department: 'Ministry of Agriculture & Farmers Welfare',
              category: 'Benefit Disbursement Delay',
              subject: '',
              description: ''
            });
          }}
          className="px-6 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl"
        >
          Register Another Grievance
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-6">
      
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
            placeholder="E.g., Ramesh Kumar"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Mobile Number / Email *
          </label>
          <input
            type="text"
            required
            value={formData.phone}
            onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
            placeholder="10-digit Mobile Number or Email"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Department / Ministry *
          </label>
          <select
            value={formData.department}
            onChange={(e) => setFormData(p => ({ ...p, department: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600"
          >
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Grievance Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600"
          >
            <option value="Benefit Disbursement Delay">Benefit Disbursement Delay</option>
            <option value="Aadhaar Seeding / Bank Account Issue">Aadhaar Seeding / Bank Account Issue</option>
            <option value="Application Rejection Query">Application Rejection Query</option>
            <option value="Corrupt Officer / Middleman Complaint">Corrupt Officer / Middleman Complaint</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">
          Subject *
        </label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
          placeholder="Brief summary of your grievance..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">
          Detailed Description *
        </label>
        <textarea
          rows={4}
          required
          value={formData.description}
          onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
          placeholder="Provide specific details including Scheme Name, Application Number, Date, or Panchayat office details..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-600 resize-none"
        />
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shadow-emerald-900/20"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Submitting Grievance...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Official Grievance</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
};
