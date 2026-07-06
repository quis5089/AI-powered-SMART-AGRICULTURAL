import React, { useState } from 'react';
import { 
  Inbox, Sparkles, BookOpen, Clock, History, Calendar, 
  Send, User, FileText, CheckCircle2, MessageSquare, AlertTriangle, ArrowRight 
} from 'lucide-react';
import { 
  MOCK_QUERIES, MOCK_ADVISORIES, MOCK_APPOINTMENTS, MOCK_FARMERS 
} from '../data/mockData';

interface ExpertDashboardProps {
  activeModule: string;
  setActiveModule: (val: string) => void;
}

export default function ExpertDashboard({ activeModule, setActiveModule }: ExpertDashboardProps) {
  const [queries, setQueries] = useState(MOCK_QUERIES);
  const [selectedQuery, setSelectedQuery] = useState<typeof MOCK_QUERIES[0] | null>(MOCK_QUERIES[0]);
  const [replyText, setReplyText] = useState('');
  
  // Custom Advisory
  const [advisories, setAdvisories] = useState(MOCK_ADVISORIES);
  const [newAdvisory, setNewAdvisory] = useState({ title: '', crop: '', summary: '' });

  // Appointments
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuery || !replyText.trim()) return;

    setQueries(prev => prev.map(q => {
      if (q.id === selectedQuery.id) {
        return {
          ...q,
          status: 'Replied',
          replies: [replyText]
        };
      }
      return q;
    }));
    
    alert(`Response dispatched successfully to farmer: ${selectedQuery.farmerName}`);
    setReplyText('');
    setSelectedQuery(null);
  };

  const handlePublishAdvisory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdvisory.title || !newAdvisory.crop) return;

    setAdvisories(prev => [
      {
        id: `ADV-${Date.now()}`,
        title: newAdvisory.title,
        crop: newAdvisory.crop,
        author: 'Prof. Shreya Sharma (Agri Expert Moderator)',
        date: newAdvisory.summary ? new Date().toISOString().split('T')[0] : '2026-07-06',
        reads: 12,
        summary: newAdvisory.summary
      },
      ...prev
    ]);

    alert("Botanical advisory article successfully published into Knowledge Center!");
    setNewAdvisory({ title: '', crop: '', summary: '' });
  };

  return (
    <div className="flex-1 p-6 space-y-6 font-sans">
      
      {/* 0. HOME / CONTROL CENTER */}
      {activeModule === 'home' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-700 to-emerald-900 rounded-3xl p-6 md:p-8 text-white shadow-md">
            <span className="bg-white/20 text-teal-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Expert panel
            </span>
            <h1 className="text-2xl md:text-3xl font-black mt-2">Expert Advisory Console</h1>
            <p className="text-xs md:text-sm text-teal-150 mt-1 max-w-xl font-medium">
              Review pathological queries, formulate NPK and fungicide treatments, schedule audio advisory calls, and compile best-practice logs.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Pending Queries", val: `${queries.filter(q => q.status === 'Pending').length} Action Needed`, icon: Inbox, color: "text-amber-600 bg-amber-50" },
              { label: "Booked Consults", val: `${appointments.length} Today`, icon: Clock, color: "text-blue-600 bg-blue-50" },
              { label: "Articles Published", val: `${advisories.length} Published`, icon: BookOpen, color: "text-emerald-600 bg-emerald-50" },
              { label: "Resolved Cases", val: "148 Closed", icon: CheckCircle2, color: "text-teal-600 bg-teal-50" }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{stat.label}</span>
                    <span className="text-base font-extrabold text-slate-700 mt-1 block">{stat.val}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl ${stat.color}`}><Icon className="w-5 h-5" /></div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Appointments */}
            <div className="bg-white border border-slate-205 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Consultation Schedule</h3>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex justify-between items-center border-b pb-3.5 border-slate-50 last:border-none">
                    <div className="flex gap-2.5 items-center">
                      <Calendar className="w-8 h-8 text-brand bg-brand-light p-1.5 rounded-xl shrink-0" />
                      <div className="text-xs">
                        <span className="font-extrabold text-slate-805 block">{apt.farmerName}</span>
                        <span className="text-slate-450 text-[10px] block mt-0.5">{apt.details} ({apt.channel})</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{apt.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular advisories list */}
            <div className="bg-white border border-slate-202 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">My Published Advisories</h3>
              <div className="space-y-3">
                {advisories.slice(0, 2).map((adv) => (
                  <div key={adv.id} className="border border-slate-100 hover:border-brand-accent/50 p-4 rounded-2xl transition-colors">
                    <span className="text-[9px] uppercase font-bold text-brand bg-brand-light px-2 py-0.5 rounded leading-none">
                      {adv.crop}
                    </span>
                    <h4 className="font-extrabold text-xs text-slate-800 mt-2 leading-snug">{adv.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-normal">{adv.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. FARMER QUERY INBOX */}
      {activeModule === 'inbox' && (
        <div className="space-y-6 font-sans">
          <div>
            <h2 className="text-xl font-black text-slate-850">Farmer Query Inbox</h2>
            <p className="text-xs text-slate-400">Answer pathological queries and diagnose leaf photos submitted by farmers</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* List Queries */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 h-fit">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Incoming Queries</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {queries.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuery(q)}
                    className={`w-full text-left p-3.5 border rounded-2xl transition-all ${
                      selectedQuery?.id === q.id 
                        ? 'border-brand bg-brand-light/20 shadow-sm' 
                        : 'border-slate-100 hover:border-slate-350'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-slate-450">{q.crop}</span>
                      <span className={`px-1.5 py-0.5 rounded font-extrabold ${
                        q.urgency === 'URGENT' ? 'bg-red-100 text-red-800 animate-pulse' : 'bg-slate-105 text-slate-500'
                      }`}>{q.urgency}</span>
                    </div>
                    <h4 className="font-extrabold text-xs text-slate-800 mt-1.5">{q.farmerName}</h4>
                    <p className="text-[10px] text-slate-505 truncate mt-1 leading-normal">{q.query}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Answer Panel */}
            <div className="lg:col-span-2 bg-white border border-slate-205 rounded-3xl p-6 shadow-sm space-y-4">
              {selectedQuery ? (
                <div className="space-y-5">
                  <div className="border-b pb-4.5 mb-2 border-slate-100 text-xs">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Query Case Reference: {selectedQuery.id}</span>
                    <h3 className="font-extrabold text-sm text-slate-800 mt-1">{selectedQuery.farmerName} on {selectedQuery.crop}</h3>
                    <p className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-slate-600 mt-3 text-xs leading-relaxed font-sans font-medium">
                      "{selectedQuery.query}"
                    </p>
                  </div>

                  {selectedQuery.replies.length > 0 ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-4.5 rounded-2xl text-xs space-y-2">
                      <span className="font-bold text-emerald-800 block uppercase text-[10px]">My Previous Answer</span>
                      <p className="text-emerald-950 font-normal leading-relaxed font-sans">{selectedQuery.replies[0]}</p>
                    </div>
                  ) : null}

                  {selectedQuery.status === 'Pending' ? (
                    <form onSubmit={handleSendReply} className="space-y-4 text-xs font-semibold text-slate-700">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Prescribe Advisory treatment</label>
                        <textarea 
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Provide specific chemical dosages, soil moisture calendars, and ventilation fixes..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 h-32 focus:outline-none focus:border-brand font-medium leading-relaxed font-sans text-xs"
                          required
                        />
                      </div>
                      <button 
                        type="submit"
                        className="bg-brand hover:bg-brand-dark text-white font-extrabold px-6 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
                      >
                        <Send className="w-4 h-4" /> Dispatch Treatment Plan
                      </button>
                    </form>
                  ) : (
                    <span className="block text-xs font-semibold text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-center uppercase tracking-wide">
                      Resolved
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-16 text-center select-none">No active query cases selected</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. ADVISORY RECOMMENDATION WORKSPACE */}
      {activeModule === 'recommender' && (
        <div className="space-y-6 font-sans">
          <div>
            <h2 className="text-xl font-black text-slate-800">Knowledge Publisher</h2>
            <p className="text-xs text-slate-400">Publish crop guidelines, organic pest remedies, and harvesting protocols</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Publisher Form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 h-fit">
              <h3 className="font-bold text-sm text-slate-800">Draft Advisory Guide</h3>
              <form onSubmit={handlePublishAdvisory} className="space-y-3.5 text-xs text-slate-700 font-semibold">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Article Title</label>
                  <input 
                    type="text" 
                    value={newAdvisory.title}
                    onChange={(e) => setNewAdvisory(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Managing Bacterial Wilt in Potato"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Crop type</label>
                  <input 
                    type="text" 
                    value={newAdvisory.crop}
                    onChange={(e) => setNewAdvisory(prev => ({ ...prev, crop: e.target.value }))}
                    placeholder="e.g. Potato / Tomato"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Advisory Summary</label>
                  <textarea 
                    value={newAdvisory.summary}
                    onChange={(e) => setNewAdvisory(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="Provide details of biological or chemical cures..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 h-24 focus:outline-none"
                  />
                </div>
                <button type="submit" className="w-full bg-brand text-white font-extrabold py-2.5 rounded-xl text-center shadow-md">
                  Publish Advisory to Network
                </button>
              </form>
            </div>

            {/* Published list */}
            <div className="lg:col-span-2 bg-white border border-slate-202 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Platform Article Network</h3>
              <div className="space-y-4">
                {advisories.map((adv) => (
                  <div key={adv.id} className="border border-slate-105 hover:border-brand-accent/50 p-4.5 rounded-2xl transition-colors space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                      <span>Crop: {adv.crop}</span>
                      <span>Reads: {adv.reads}</span>
                    </div>
                    <span className="font-extrabold text-sm text-slate-805 block">{adv.title}</span>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">{adv.summary}</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-450 border-t pt-2 mt-2 font-semibold">
                      <span>Author: {adv.author}</span>
                      <span>Date: {adv.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Default/Not Found module */}
      {!['home', 'inbox', 'recommender', 'knowledge', 'cases'].includes(activeModule) && (
        <div className="text-center py-20 font-sans">
          <p className="text-xs text-slate-400 select-none">Select a module from the sidebar workspace menu.</p>
        </div>
      )}
    </div>
  );
}
