import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff, Globe, Sparkles, X } from 'lucide-react';
import { BOT_RESPONSES } from '../data/mockData';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

interface ChatbotProps {
  onClose?: () => void;
  fullScreen?: boolean;
}

export default function Chatbot({ onClose, fullScreen = false }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: BOT_RESPONSES.default,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('English');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Process botanical AI response
    setTimeout(() => {
      let replyText = BOT_RESPONSES.default;
      const lower = textToSend.toLowerCase();

      if (lower.includes('yellow') || lower.includes('leaves')) {
        replyText = BOT_RESPONSES['leaf-yellow'];
      } else if (lower.includes('paddy') || lower.includes('rice') || lower.includes('fertilizer')) {
        replyText = BOT_RESPONSES['paddy-fertilizer'];
      } else if (lower.includes('irrigate') || lower.includes('rain') || lower.includes('weather')) {
        replyText = BOT_RESPONSES['irrigate-week'];
      } else {
        replyText = "I see. Let me parse that query. For deeper diagnosis, uploading an image in the Crop Disease module or booking an appointment with one of our Agri Experts is highly recommended.";
      }

      setMessages(prev => [...prev, {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date()
      }]);
    }, 850);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate speech to text transcription
      setTimeout(() => {
        setInputText("Why are my sugarcane leaves turning yellow?");
        setIsRecording(false);
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  const suggestions = [
    { text: "Why are my leaves turning yellow?", key: "leaf-yellow" },
    { text: "Best fertilizer for paddy this month?", key: "paddy-fertilizer" },
    { text: "Should I irrigate this week?", key: "irrigate-week" }
  ];

  return (
    <div className={`flex flex-col bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden ${fullScreen ? 'h-full w-full' : 'h-[500px] w-[380px]'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-brand to-brand-dark px-4 py-3 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Bot className="w-5 h-5 animate-pulse-soft" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AgriAI Advisor</h3>
            <span className="text-[10px] text-brand-light flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-ping"></span>
              Online • Multi-lingual
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-xs">
            <Globe className="w-3.5 h-3.5" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer border-none text-[11px]"
            >
              <option value="English" className="text-slate-800">EN</option>
              <option value="Hindi" className="text-slate-800">HI (हिन्दी)</option>
              <option value="Punjabi" className="text-slate-800">PB (ਪੰਜਾਬੀ)</option>
              <option value="Telugu" className="text-slate-800">TE (తెలుగు)</option>
              <option value="Marathi" className="text-slate-800">MR (मराठी)</option>
            </select>
          </div>
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-7 h-7 bg-brand/10 text-brand rounded-full flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-xs shadow-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-brand text-white rounded-tr-none' 
                : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
            }`}>
              <p>{msg.text}</p>
              <span className={`block text-[9px] mt-1.5 text-right ${
                msg.sender === 'user' ? 'text-brand-light' : 'text-slate-400'
              }`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            {msg.sender === 'user' && (
              <div className="w-7 h-7 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        {isRecording && (
          <div className="flex gap-2.5 items-center text-xs text-slate-500 bg-white border border-slate-100 p-2.5 rounded-xl animate-pulse">
            <Mic className="w-4 h-4 text-rose-500 animate-bounce" />
            Listening to voice input...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Suggestions */}
      {messages.length === 1 && (
        <div className="p-2 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-1">
          {suggestions.map((sugo, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sugo.text)}
              className="text-[10px] bg-white hover:bg-brand-light border border-slate-200 text-slate-600 hover:text-brand hover:border-brand-accent/50 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-brand" />
              {sugo.text}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={toggleRecording}
          type="button"
          className={`p-2 rounded-full border transition-all ${
            isRecording 
              ? 'bg-rose-50 border-rose-200 text-rose-600 scale-105' 
              : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
          }`}
          title="Voice input"
        >
          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
          placeholder={`Type message in ${language}...`}
          className="flex-1 bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-accent/80 rounded-xl px-3.5 py-2 text-xs text-slate-700 font-sans"
        />

        <button
          onClick={() => handleSend(inputText)}
          disabled={!inputText.trim()}
          className="p-2 rounded-xl bg-brand hover:bg-brand-dark disabled:bg-slate-200 text-white disabled:text-slate-400 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
