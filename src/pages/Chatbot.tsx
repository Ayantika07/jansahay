import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, Send, Trash2, Globe, Sparkles, RefreshCw, Building2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ChatMessage, Language, Scheme } from '../types';
import { api } from '../services/api';

export const ChatbotPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const schemeFromState = (location.state as { scheme?: Scheme })?.scheme;

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [schemeContext, setSchemeContext] = useState<Scheme | null>(schemeFromState || null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: language === 'hi'
        ? 'नमस्कार! मैं जनसहाय AI हूँ। मैं भारत सरकार की कल्याणकारी योजनाओं, पात्रता नियमों, आवश्यक दस्तावेजों और शिकायतों की जानकारी हिंदी, बंगाली या अंग्रेजी में दे सकता हूँ। आप क्या पूछना चाहते हैं?'
        : language === 'bn'
        ? 'নমস্কার! আমি জনসহায় AI। আমি ভারতের কেন্দ্রীয় ও রাজ্য সরকারি প্রকল্প, যোগ্যতার নিয়ম, প্রয়োজনীয় কাগজপত্র এবং অভিযোগ নিয়ে আপনাকে সাহায্য করতে পারি। আপনি কি জানতে চান?'
        : 'Namaste! I am JanSahay AI, your dedicated assistant for Indian Government Welfare Schemes & Grievances. Ask me any question in English, Hindi, or Bengali!',
      language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await api.sendChatMessage({
        message: query,
        language,
        conversationHistory: messages.slice(-6),
        schemeContext: schemeContext ? {
          id: schemeContext.id,
          name: schemeContext.name[language] || schemeContext.name.en,
          description: schemeContext.description[language] || schemeContext.description.en,
          benefits: schemeContext.benefits[language] || schemeContext.benefits.en,
          eligibility: schemeContext.eligibilitySummary[language] || schemeContext.eligibilitySummary.en,
          officialUrl: schemeContext.officialUrl
        } : null
      });

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: response.reply,
        language: response.language || language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 2}`,
        sender: 'assistant',
        text: 'Sorry, I am having trouble connecting to the server. Please check your network connection or try again shortly.',
        language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Chat history cleared. How may I assist you now?',
        language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const suggestedPrompts = language === 'hi' ? [
    'पीएम किसान सम्मान निधि का लाभ कैसे मिलेगा?',
    'आयुष्मान भारत कार्ड के लिए कौन पात्र है?',
    'सरकारी योजना में शिकायत कैसे दर्ज कराएं?',
    'महिलाओं के लिए कौन सी कल्याणकारी योजनाएं हैं?'
  ] : language === 'bn' ? [
    'পিএম-কিসান যোজনায় কীভাবে আবেদন করব?',
    'আয়ুষ্মান কার্ড পাওয়ার যোগ্যতা কি কি?',
    'অভিযোগ নিববন্ধন করার সহজ নিয়ম কি?',
    'মহিলাদের জন্য কি কি সরকারি সুবিধা রয়েছে?'
  ] : [
    'Which government schemes am I eligible for as a farmer?',
    'How do I apply for Ayushman Bharat health insurance?',
    'How to register a public grievance regarding scheme delays?',
    'What welfare schemes exist for women and girl children?'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black font-serif text-white">{t.chatTitle}</h1>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full uppercase">
                Gemini AI
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {t.chatSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-200">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900">English</option>
              <option value="hi" className="bg-slate-900">हिंदी (Hindi)</option>
              <option value="bn" className="bg-slate-900">বাংলা (Bengali)</option>
            </select>
          </div>

          <button
            onClick={clearChat}
            title={t.chatClearBtn}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 rounded-xl border border-slate-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Focus Scheme Context Banner */}
      {schemeContext && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800/80 rounded-2xl text-emerald-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Currently focused on: <strong>{schemeContext.name[language] || schemeContext.name.en}</strong></span>
          </div>
          <button
            onClick={() => setSchemeContext(null)}
            className="text-slate-400 hover:text-white underline text-[11px]"
          >
            Clear Focus
          </button>
        </div>
      )}

      {/* Main Chat Box */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md flex flex-col h-[520px] overflow-hidden">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs leading-relaxed">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                    : 'bg-slate-900 text-slate-100 border border-slate-800 rounded-bl-none shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap text-xs sm:text-sm">{msg.text}</p>
                <span className="block text-[10px] opacity-60 mt-2 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl rounded-bl-none border border-slate-800 flex items-center gap-2 text-xs">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>JanSahay AI is generating response...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts Grid */}
        {messages.length <= 2 && (
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 font-serif">
              {t.chatSuggestedPrompts}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="p-2.5 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 rounded-xl text-left text-xs font-semibold transition-colors truncate"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Input Box */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
          <textarea
            rows={1}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.chatPlaceholder}
            className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 resize-none max-h-24"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputMessage.trim()}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shadow-emerald-900/30 shrink-0"
          >
            <span>{t.chatSendBtn}</span>
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
