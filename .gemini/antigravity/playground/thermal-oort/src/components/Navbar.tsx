import React, { useState } from 'react';
import { Menu, Bell, User, Search, Globe, ChevronDown, MessageSquareCode, ShieldCheck, Laptop } from 'lucide-react';

interface NavbarProps {
  currentRole: 'Farmer' | 'Buyer' | 'Admin' | 'Expert' | 'Landing' | 'Auth';
  setCurrentRole: (role: 'Farmer' | 'Buyer' | 'Admin' | 'Expert' | 'Landing' | 'Auth') => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (v: boolean) => void;
  onToggleChat: () => void;
  unreadCount?: number;
  onOpenNotifications: () => void;
}

export default function Navbar({
  currentRole,
  setCurrentRole,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  onToggleChat,
  unreadCount = 3,
  onOpenNotifications
}: NavbarProps) {
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roles = [
    { key: 'Farmer', label: 'Farmer Dashboard', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { key: 'Buyer', label: 'B2B Buyer Dashboard', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { key: 'Admin', label: 'Administrator Portal', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    { key: 'Expert', label: 'Agri Expert Hub', color: 'bg-teal-100 text-teal-800 border-teal-300' }
  ] as const;

  const currentRoleInfo = roles.find(r => r.key === currentRole) || {
    key: 'General',
    label: 'Public Platform',
    color: 'bg-slate-105 text-slate-800'
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm shadow-sm md:px-6">
      {/* Left: Collapsed menu toggle & Page Context / Logo */}
      <div className="flex items-center gap-3">
        {currentRole !== 'Landing' && currentRole !== 'Auth' && (
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand-light ring-2 ring-brand animate-pulse-soft"></span>
          <span className="hidden text-xs font-semibold uppercase tracking-wider text-slate-400 md:inline-block">
            SmartAgri Ecosystem
          </span>
        </div>
      </div>

      {/* Middle: Search bar (optional for roles) */}
      <div className="hidden max-w-sm flex-1 px-4 md:flex">
        {currentRole !== 'Landing' && currentRole !== 'Auth' && (
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search crops, analytics, mandi rates, advisory logs..."
              className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-accent focus:bg-white rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-600 font-sans"
            />
          </div>
        )}
      </div>

      {/* Right: Actions, Role Selector, Notifications */}
      <div className="flex items-center gap-3.5">
        {/* Role Switcher (Simulates login-role shifting instantly for MVP Reviewers) */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-medium rounded-full transition-all focus:outline-none ${currentRoleInfo.color}`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{currentRoleInfo.label}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden py-1 z-55 animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50">
                Switch Role Context
              </div>
              {roles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => {
                    setCurrentRole(r.key);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs hover:bg-slate-50 flex items-center justify-between ${
                    currentRole === r.key ? 'text-brand font-bold bg-brand-light/30' : 'text-slate-600'
                  }`}
                >
                  <span>{r.label}</span>
                  {currentRole === r.key && <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>}
                </button>
              ))}
              <div className="border-t border-slate-100 mt-1">
                <button
                  onClick={() => {
                    setCurrentRole('Landing');
                    setShowRoleMenu(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs hover:bg-slate-50 text-slate-500 font-medium flex items-center gap-2"
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Go to Landing Page</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Global Chatbot trigger */}
        {currentRole !== 'Landing' && currentRole !== 'Auth' && (
          <button
            onClick={onToggleChat}
            className="relative p-2 text-slate-500 hover:text-brand hover:bg-slate-100 rounded-lg transition-colors"
            title="Ask AI Assistant"
          >
            <MessageSquareCode className="w-5 h-5 text-brand" />
          </button>
        )}

        {/* Notification bell */}
        {currentRole !== 'Landing' && currentRole !== 'Auth' && (
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>
        )}

        {/* User Profile */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="h-8 w-8 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hidden flex-col md:flex">
            <span className="text-xs font-semibold text-slate-700 leading-tight">Shreya Sharma</span>
            <span className="text-[10px] text-slate-400">Premium Account</span>
          </div>
        </div>
      </div>
    </header>
  );
}
