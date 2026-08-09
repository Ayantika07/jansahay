import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Landmark, Globe, User, LogOut, Menu, X, Bot, ShieldAlert, CheckCircle2, Search, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b-2 border-slate-900 shadow-[0_4px_0_0_rgba(15,23,42,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 border-2 border-slate-900 flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white font-sans">
                  {t.appName}
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-emerald-400 text-slate-900 border border-slate-900 rounded-full">
                  Gov Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                Citizen Welfare & Services
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <Link
              to="/"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                isActive('/') ? 'bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.navHome}
            </Link>
            <Link
              to="/schemes"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                isActive('/schemes') ? 'bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.navSchemes}
            </Link>
            <Link
              to="/eligibility"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                isActive('/eligibility') ? 'bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.navEligibility}
            </Link>
            <Link
              to="/grievance"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                isActive('/grievance') ? 'bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.navGrievance}
            </Link>
            <Link
              to="/chat"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                isActive('/chat') ? 'bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]' : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800'
              }`}
            >
              <Bot className="w-4 h-4" />
              {t.navAI}
            </Link>
            <Link
              to="/help"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                isActive('/help') ? 'bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.navHelp}
            </Link>
          </nav>

          {/* Right Controls: Language Selector & User Auth */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Language Selector */}
            <div className="relative flex items-center gap-1.5 bg-slate-800 border-2 border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-200">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent text-white focus:outline-none cursor-pointer pr-1 font-bold text-xs"
                aria-label="Select Language"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="hi" className="bg-slate-900 text-white">हिंदी (Hindi)</option>
                <option value="bn" className="bg-slate-900 text-white">বাংলা (Bengali)</option>
              </select>
            </div>

            {/* Auth Buttons / Citizen Profile */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3.5 py-2 bg-emerald-400 border-2 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-wider rounded-xl shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-transform hover:-translate-y-0.5"
                >
                  <User className="w-3.5 h-3.5 text-slate-900" />
                  <span>{(user?.fullName || 'Citizen').split(' ')[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-300 hover:text-rose-400 bg-slate-800 border border-slate-700 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-black uppercase tracking-wider text-slate-200 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                >
                  {t.navLogin}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-black uppercase tracking-wider bg-emerald-400 border-2 border-slate-900 text-slate-900 rounded-xl shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-transform hover:-translate-y-0.5"
                >
                  {t.navRegister}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-slate-800 border border-slate-700 text-white text-xs px-2 py-1 rounded focus:outline-none"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="bn">BN</option>
            </select>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-base font-semibold text-slate-200 hover:bg-slate-800"
          >
            {t.navHome}
          </Link>
          <Link
            to="/schemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-base font-semibold text-slate-200 hover:bg-slate-800"
          >
            {t.navSchemes}
          </Link>
          <Link
            to="/eligibility"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-base font-semibold text-slate-200 hover:bg-slate-800"
          >
            {t.navEligibility}
          </Link>
          <Link
            to="/grievance"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-base font-semibold text-slate-200 hover:bg-slate-800"
          >
            {t.navGrievance}
          </Link>
          <Link
            to="/chat"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-base font-semibold text-emerald-400 hover:bg-slate-800 flex items-center gap-2"
          >
            <Bot className="w-5 h-5" />
            {t.navAI}
          </Link>
          <Link
            to="/help"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-base font-semibold text-slate-200 hover:bg-slate-800"
          >
            {t.navHelp}
          </Link>

          <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm"
                >
                  Dashboard ({(user?.fullName || 'Citizen').split(' ')[0]})
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="px-3 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-slate-800 text-white rounded-lg font-bold text-sm"
                >
                  {t.navLogin}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm"
                >
                  {t.navRegister}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
