import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, ShieldCheck, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Grievance, GrievanceStatus } from '../types';

export const GrievanceTrack: React.FC = () => {
  const { t } = useLanguage();
  const [referenceId, setReferenceId] = useState('JAN-2026-849201'); // Default demo reference
  const [isSearching, setIsSearching] = useState(false);
  const [grievance, setGrievance] = useState<Grievance | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceId.trim()) return;

    setIsSearching(true);
    setError(null);
    setGrievance(null);

    try {
      const res = await api.trackGrievance(referenceId.trim());
      setGrievance(res.grievance);
    } catch (err: any) {
      setError(err.message || 'Grievance record not found. Please verify the Reference ID.');
    } finally {
      setIsSearching(false);
    }
  };

  const statusSteps: GrievanceStatus[] = ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved'];

  const getStepIndex = (status: GrievanceStatus) => {
    return statusSteps.indexOf(status);
  };

  return (
    <div className="space-y-8">
      
      {/* Lookup Form */}
      <form onSubmit={handleTrack} className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-4">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-serif">
          Grievance Reference Number Lookup
        </label>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            placeholder="Enter Reference ID (e.g., JAN-2026-849201)"
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:outline-none focus:border-emerald-600"
            required
          />
          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            {isSearching ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>Track Status</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-500">
          Try demo reference ID: <strong className="text-emerald-700 font-mono">JAN-2026-849201</strong>
        </p>
      </form>

      {/* Error Banner */}
      {error && (
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs font-bold text-center space-y-2">
          <AlertCircle className="w-6 h-6 text-rose-600 mx-auto" />
          <p>{error}</p>
        </div>
      )}

      {/* Grievance Details & Interactive Timeline */}
      {grievance && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reference ID</span>
              <h2 className="text-2xl font-black font-mono text-emerald-700">{grievance.referenceId}</h2>
              <p className="text-xs text-slate-600 mt-1">Submitted on {new Date(grievance.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl font-bold text-xs flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Current Status: {grievance.status}</span>
            </div>
          </div>

          {/* Grievance Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 font-semibold block">Department:</span>
              <span className="text-slate-900 font-bold text-sm">{grievance.department}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 font-semibold block">Subject:</span>
              <span className="text-slate-900 font-bold text-sm">{grievance.subject}</span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
            <span className="text-slate-500 font-semibold block">Complaint Summary:</span>
            <p className="text-slate-800 leading-relaxed font-medium">{grievance.description}</p>
          </div>

          {/* Interactive Progress Timeline */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 font-serif uppercase tracking-wider">
              Resolution Progress Timeline
            </h3>

            <div className="space-y-6 relative pl-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-200">
              {grievance.timeline.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow-sm">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-xs text-slate-900">{item.status}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
