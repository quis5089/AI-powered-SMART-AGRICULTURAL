import React, { useState } from 'react';
import { Sprout, Phone, Mail, Lock, ShieldCheck, ArrowLeft, KeySquare } from 'lucide-react';

interface AuthScreensProps {
  onSuccess: (role: 'Farmer' | 'Buyer' | 'Admin' | 'Expert') => void;
  onGoBack: () => void;
}

type AuthState = 'select-role' | 'login' | 'signup' | 'forgot' | 'otp';

export default function AuthScreens({ onSuccess, onGoBack }: AuthScreensProps) {
  const [state, setState] = useState<AuthState>('select-role');
  const [selectedRole, setSelectedRole] = useState<'Farmer' | 'Buyer' | 'Admin' | 'Expert'>('Farmer');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [credentials, setCredentials] = useState({ username: '', password: '', phone: '', name: '', otp: '' });
  const [notification, setNotification] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleRoleSelect = (role: 'Farmer' | 'Buyer' | 'Admin' | 'Expert') => {
    setSelectedRole(role);
    setState('login');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === 'email' && !credentials.username) {
      setNotification('Please fill in email credentials.');
      return;
    }
    if (authMethod === 'phone' && !credentials.phone) {
      setNotification('Please enter a valid phone number.');
      return;
    }
    
    // Switch directly or prompt OTP
    if (authMethod === 'phone') {
      setState('otp');
      setNotification('OTP code sent to your registered number: ' + credentials.phone);
    } else {
      onSuccess(selectedRole);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.name || !credentials.username) {
      setNotification('Please fill in registration details.');
      return;
    }
    setState('otp');
    setNotification('A registration verification code has been dispatched.');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.otp.length < 4) {
      setNotification('Invalid verification code. Enter a 4-digit code.');
      return;
    }
    onSuccess(selectedRole);
  };

  const mockSocialLogins = () => {
    onSuccess(selectedRole);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-brand-light/30 via-slate-50 to-emerald-50 px-4 py-8">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden p-8 space-y-6 relative">
        
        {/* Back Link */}
        <button 
          onClick={() => {
            if (state === 'select-role') onGoBack();
            else if (state === 'login') setState('select-role');
            else if (state === 'signup' || state === 'forgot') setState('login');
            else if (state === 'otp') setState('login');
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-brand transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        {/* Global Logo / Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="p-2.5 bg-brand text-white rounded-2xl shadow-md">
            <Sprout className="w-6 h-6 animate-pulse-soft" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Ecosystem Hub</h2>
          <p className="text-[11px] text-slate-400 font-medium">Empowering Farmers. Connecting Markets.</p>
        </div>

        {/* Notification system */}
        {notification && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[11px] font-semibold text-center uppercase tracking-wide">
            {notification}
          </div>
        )}

        {/* STATE: SELECT ROLE */}
        {state === 'select-role' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Choose Dashboard Persona</h3>
              <p className="text-[10px] text-slate-400 mt-1">Deploy credentials based on your target stakeholder</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { role: 'Farmer', label: 'Farmer / Producer', desc: 'Crop scanning, Mandi, satellite NPK', color: 'hover:border-emerald-500 hover:bg-emerald-50/20' },
                { role: 'Buyer', label: 'B2B Procurement', desc: 'Secure order matching, ETAs, escrow', color: 'hover:border-blue-500 hover:bg-blue-50/20' },
                { role: 'Admin', label: 'Ecosystem Admin', desc: 'SaaS oversight panels & trends telemetry', color: 'hover:border-indigo-500 hover:bg-indigo-50/20' },
                { role: 'Expert', label: 'Agri Expert Hub', desc: 'Knowledge logs & consultation slots', color: 'hover:border-teal-500 hover:bg-teal-50/20' }
              ].map((item) => (
                <button
                  key={item.role}
                  onClick={() => handleRoleSelect(item.role as any)}
                  className={`border border-slate-200 rounded-2xl p-4 text-left transition-all hover:shadow flex flex-col justify-between ${item.color} focus:outline-none`}
                >
                  <span className="font-bold text-xs text-slate-800 block">{item.label}</span>
                  <span className="text-[9px] text-slate-400 leading-snug mt-1.5 block">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STATE: LOGIN FORM */}
        {state === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4 font-sans">
            <div className="text-center">
              <span className="inline-block text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                Role: {selectedRole}
              </span>
              <h3 className="font-extrabold text-sm text-slate-800 mt-2">Welcome Back</h3>
            </div>

            {/* Selector Method */}
            <div className="flex bg-slate-105 border border-slate-200 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-colors ${
                  authMethod === 'email' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                Sign in with E-mail
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-colors ${
                  authMethod === 'phone' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                Sign in with Phone / OTP
              </button>
            </div>

            {/* Inputs */}
            {authMethod === 'email' ? (
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter email adress (e.g. shreya@agri.com)"
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 font-medium"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter account security keys"
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700"
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={credentials.phone}
                  onChange={(e) => setCredentials(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter 10-digit mobile (+91...)"
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 font-medium"
                />
              </div>
            )}

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-brand focus:ring-brand"
                />
                Remember me
              </label>
              <button 
                type="button"
                onClick={() => setState('forgot')}
                className="font-semibold text-brand hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-xl text-xs shadow-md transition-colors"
            >
              {authMethod === 'email' ? 'Confirm Credentials' : 'Request OTP Code'}
            </button>

            {/* Switch to Register */}
            <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              Not onboarded yet?{' '}
              <button 
                type="button" 
                onClick={() => setState('signup')} 
                className="font-bold text-brand hover:underline"
              >
                Register Here
              </button>
            </div>

            {/* Social Logins */}
            <div className="space-y-2 pt-2">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-[9px] text-slate-400 font-bold uppercase tracking-wider">or sign in with</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={mockSocialLogins}
                  className="border border-slate-200 hover:bg-slate-50 rounded-xl py-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 focus:outline-none"
                >
                  <span className="font-bold text-red-500 font-serif">G</span> Google
                </button>
                <button
                  type="button"
                  onClick={mockSocialLogins}
                  className="border border-slate-200 hover:bg-slate-50 rounded-xl py-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 focus:outline-none"
                >
                  <span className="font-black text-blue-600">f</span> Facebook
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STATE: SIGNUP SCREEN */}
        {state === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="text-center">
              <span className="inline-block text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                Role: {selectedRole} Application
              </span>
              <h3 className="font-extrabold text-sm text-slate-800 mt-2">New Account Invitation</h3>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={credentials.name}
                onChange={(e) => setCredentials(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Full Legal Name"
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-accent rounded-xl px-4 py-2.5 text-xs text-slate-700 font-medium"
              />
              <input
                type="email"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Email Address"
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-accent rounded-xl px-4 py-2.5 text-xs text-slate-700"
              />
              <input
                type="text"
                placeholder="Phone Number (+91...)"
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-accent rounded-xl px-4 py-2.5 text-xs text-slate-700"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-accent rounded-xl px-4 py-2.5 text-xs text-slate-705"
              />
            </div>

            <label className="flex items-start gap-2 text-[10px] text-slate-500 cursor-pointer pt-1 leading-relaxed">
              <input type="checkbox" className="rounded mt-0.5 text-brand focus:ring-brand" required />
              <span>By signing up, I authorize verification matches and consent to the system's Privacy Guidelines and escrow provisions.</span>
            </label>

            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-xl text-xs shadow-md transition-colors"
            >
              Sign Up As {selectedRole}
            </button>
          </form>
        )}

        {/* STATE: FORGOT PASSWORD */}
        {state === 'forgot' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 text-center">Reset Security keys</h3>
            <p className="text-[11px] text-slate-500 text-center">Enter your registered email to dispatch recovery guidelines.</p>
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-accent rounded-xl px-4 py-2.5 text-xs text-slate-700"
            />
            <button
              onClick={() => {
                setNotification('A link has been sent to recover keys.');
                setState('login');
              }}
              className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-xl text-xs"
            >
              Send Reset Link
            </button>
          </div>
        )}

        {/* STATE: OTP INPUT CODE */}
        {state === 'otp' && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <KeySquare className="w-8 h-8 text-brand animate-bounce" />
              <h3 className="font-extrabold text-sm text-slate-800">Verify Code</h3>
              <p className="text-[11px] text-slate-500 text-center">We sent a 4-digit code. Check your device messages.</p>
            </div>

            <div className="flex justify-center gap-3 py-1">
              <input
                type="text"
                maxLength={4}
                value={credentials.otp}
                onChange={(e) => setCredentials(prev => ({ ...prev, otp: e.target.value }))}
                placeholder="4-digit code"
                className="w-32 bg-slate-55 border border-slate-200 text-center text-sm font-extrabold focus:outline-none focus:border-brand-accent rounded-xl py-2.5 tracking-widest"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-xl text-xs shadow-md"
            >
              Enter Dashboard
            </button>

            <button
              type="button"
              onClick={() => setNotification('Verification code re-sent.')}
              className="w-full text-center text-xs font-semibold text-brand hover:underline"
            >
              Resend Code
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
