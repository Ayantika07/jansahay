import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Minimize2, Maximize2, Sparkles, RefreshCw, Globe, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ChatMessage, Language, Scheme } from '../types';
import { api } from '../services/api';

interface FloatingChatbotProps {
  initialSchemeContext?: Scheme | null;
}

export const FloatingChatbot: React.FC<FloatingChatbotProps> = ({ initialSchemeContext }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [schemeContext, setSchemeContext] = useState<Scheme | null>(initialSchemeContext || null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: language === 'hi' 
        ? 'नमस्कार! मैं जनसहाय AI हूँ। मैं आपकी सरकारी योजनाओं, पात्रता और शिकायतों के समाधान में कैसे सहायता कर सकता हूँ?' 
        : language === 'bn' 
        ? 'নমস্কার! আমি জনসহায় AI। আমি সরকারি প্রকল্প, যোগ্যতা এবং অভিযোগ সংক্রান্ত বিষয়ে কীভাবে আপনাকে সাহায্য করতে পারি?'
        : 'Namaste! I am JanSahay AI. How can I assist you today with government schemes, eligibility rules, or grievance tracking?',
      language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSchemeContext) {
      setSchemeContext(initialSchemeContext);
      setIsOpen(true);
      setIsMinimized(false);
    }
  }, [initialSchemeContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

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
        conversationHistory: messages.slice(-4),
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
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        schemeContext: schemeContext ? { id: schemeContext.id, name: schemeContext.name.en } : undefined
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 2}`,
        sender: 'assistant',
        text: 'Sorry, I am having trouble connecting to the server. Please check your network or try again shortly.',
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

  const clearConversation = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Conversation cleared. How else may I assist you today?',
        language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Suggested quick prompts per language
  const suggestedPrompts = language === 'hi' ? [
    'किसानों के लिए कौन सी सरकारी योजनाएं हैं?',
    'मैं अपनी शिकायत कैसे दर्ज करा सकता हूँ?',
    'आयुष्मान कार्ड के लिए कौन से दस्तावेज चाहिए?'
  ] : language === 'bn' ? [
    'কৃষকদের জন্য কি কি সরকারি প্রকল্প আছে?',
    'অভিযোগ দায়ের করার নিয়ম কি?',
    'আয়ুষ্মান কার্ড পাওয়ার জন্য কি কি প্রয়োজন?'
  ] : [
    'Which schemes am I eligible for as a farmer?',
    'How do I register a public grievance?',
    'What documents are needed for Ayushman Bharat card?'
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-400 hover:bg-emerald-300 text-slate-900 border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center gap-3 group transition-all duration-200 hover:-translate-y-1"
        aria-label="Open JanSahay AI Assistant"
      >
        <div className="relative">
          <Bot className="w-6 h-6 text-slate-900" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-600 rounded-full border border-slate-900" />
        </div>
        <span className="text-xs font-black uppercase tracking-wider pr-1 hidden sm:inline text-slate-900">JanSahay AI</span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] bg-slate-900 border-2 border-slate-900 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-white overflow-hidden transition-all duration-300 flex flex-col ${
      isMinimized ? 'h-16' : 'h-[580px] max-h-[80vh]'
    }`}>
      
      {/* Header */}
      <div className="p-4 bg-slate-950 border-b-2 border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-400 border border-slate-900 flex items-center justify-center text-slate-900 font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <Bot className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xs text-white font-sans uppercase tracking-wider">JanSahay AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[10px] text-slate-400 font-bold">Multilingual Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-slate-800 border border-slate-700 text-white text-xs px-2 py-1 rounded focus:outline-none"
          >
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
            <option value="bn">বাংলা</option>
          </select>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Active Scheme Context Badge */}
          {schemeContext && (
            <div className="px-4 py-2 bg-emerald-950/60 border-b border-emerald-900/50 flex items-center justify-between text-xs text-emerald-300">
              <span className="truncate">Focus: <strong>{schemeContext.name[language] || schemeContext.name.en}</strong></span>
              <button
                onClick={() => setSchemeContext(null)}
                className="text-slate-400 hover:text-white ml-2 text-[10px] underline"
              >
                Clear Context
              </button>
            </div>
          )}

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className="block text-[9px] text-slate-400 mt-1 text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 flex items-center gap-2 text-slate-400">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  <span>JanSahay AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 rounded-lg text-[11px] whitespace-nowrap border border-slate-700 transition-colors shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0">
            <textarea
              rows={1}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.chatPlaceholder}
              className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 resize-none max-h-20"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
