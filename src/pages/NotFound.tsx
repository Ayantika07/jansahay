import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto">
        <Landmark className="w-8 h-8" />
      </div>
      
      <div>
        <h1 className="text-4xl font-black text-slate-900 font-serif">404</h1>
        <p className="text-lg font-bold text-slate-800 mt-1">Page Not Found</p>
        <p className="text-xs text-slate-500 mt-2">
          The government scheme or service page you are looking for does not exist.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};
