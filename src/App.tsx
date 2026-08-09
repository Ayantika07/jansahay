import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingChatbot } from './components/FloatingChatbot';

import { Home } from './pages/Home';
import { Schemes } from './pages/Schemes';
import { SchemeDetails } from './pages/SchemeDetails';
import { Eligibility } from './pages/Eligibility';
import { Grievance } from './pages/Grievance';
import { ChatbotPage } from './pages/Chatbot';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Help } from './pages/Help';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[#F7F7F7] text-slate-900 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/schemes/:id" element={<SchemeDetails />} />
                <Route path="/eligibility" element={<Eligibility />} />
                <Route path="/grievance" element={<Grievance />} />
                <Route path="/chat" element={<ChatbotPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/help" element={<Help />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <FloatingChatbot />
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
