import React, { useState } from 'react';
import { 
  User, Shield, Bell, Languages, Sliders, CheckCircle2, 
  MapPin, Phone, Landmark, Lock, HelpCircle, HardDrive, Cpu, LogOut
} from 'lucide-react';

interface ExtraScreensProps {
  viewType: 'profile' | 'settings' | 'notifications';
  currentRole: string;
  onLogout: () => void;
}

export default function ExtraScreens({ viewType, currentRole, onLogout }: ExtraScreensProps) {
  // Profiles Form simulation
  const [profileForm, setProfileForm] = useState({
    name: 'Rajender Prasad Singh',
    phone: '+91 98765 43210',
    location: 'Bathinda District, Punjab, India',
    landSize: '15 Acres (Irrigated)',
    bankAccount: 'SBI **** 4321',
    language: 'Hindi'
  });

  const [kycVerified, setKycVerified] = useState(true);

  // Settings
  const [allowPush, setAllowPush] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(true);

  // Notifications
  const mockNotifications = [
    { id: 1, title: 'Extreme Weather Notice', body: 'Rain forecast for Punjab zone on Tuesday. Postpone chemical spray operations.', time: '2 hrs ago', type: 'alert' },
    { id: 2, title: 'Crop Bid Received', body: 'Amit Desai offered ₹4,250/Qtl for Basmati Rice (15 tonnes).', time: '5 hrs ago', type: 'offer' },
    { id: 3, title: 'Soil Sample Inspected', body: 'Pusa labs updated Nitrates ratings for North field patch A.', time: '1 day ago', type: 'info' }
  ];

  return (
    <div className="flex-1 p-6 space-y-6 font-sans">
      
      {/* PROFILE VIEW */}
      {viewType === 'profile' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-800">User Profile Workspace</h2>
            <p className="text-xs text-slate-400">Manage credentials, land size records, and KYC matching status</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left KYC card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 text-center h-fit">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center text-brand font-black text-2xl">
                  R
                </div>
                {kycVerified && (
                  <span className="absolute bottom-0 right-0 p-1 bg-emerald-500 rounded-full border-2 border-white text-white">
                    <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-800">{profileForm.name}</h3>
                <span className="text-[10px] bg-slate-105 text-slate-500 uppercase px-2 py-0.5 rounded font-black">
                  Role: {currentRole}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 text-left space-y-2 text-xs font-semibold text-slate-700">
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wide">Identity Check</span>
                <div className="flex justify-between items-center bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-100">
                  <span>Aadhaar status e-KYC</span>
                  <span className="font-extrabold">LINKED</span>
                </div>
              </div>
            </div>

            {/* Profile update form */}
            <div className="md:col-span-2 bg-white border border-slate-205 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800">Operational Particulars</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert("Profile successfully updated!"); }} className="space-y-4 text-xs font-semibold text-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Audit Phone</label>
                    <input 
                      type="text" 
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Region District Address</label>
                  <input 
                    type="text" 
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Verified Land Holdings</label>
                    <input 
                      type="text" 
                      value={profileForm.landSize}
                      onChange={(e) => setProfileForm({ ...profileForm, landSize: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Escrow Bank matching ID</label>
                    <input 
                      type="text" 
                      value={profileForm.bankAccount}
                      onChange={(e) => setProfileForm({ ...profileForm, bankAccount: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button 
                    type="button" 
                    onClick={onLogout}
                    className="border border-red-200 hover:bg-red-50 text-red-700 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                  <button 
                    type="submit" 
                    className="bg-brand text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md"
                  >
                    Commit Particulars
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS VIEW */}
      {viewType === 'settings' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-800">Operational Configuration</h2>
            <p className="text-xs text-slate-404">Adjust notification scopes, fallback dialects, and integrations</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm divide-y divide-slate-100">
            {/* Setting Item: SMS Alerts */}
            <div className="flex justify-between items-center py-4">
              <div className="text-xs max-w-sm">
                <span className="font-extrabold text-slate-800 block">Fallback SMS Alerts</span>
                <span className="text-slate-450 block text-[10px] mt-0.5">Receive immediate climate warning advisories via cellular SMS when offline.</span>
              </div>
              <input 
                type="checkbox" 
                checked={smsUpdates}
                onChange={() => setSmsUpdates(!smsUpdates)}
                className="w-4 h-4 text-brand rounded focus:ring-brand" 
              />
            </div>

            {/* Setting Item: Language Selection */}
            <div className="flex justify-between items-center py-4">
              <div className="text-xs max-w-sm">
                <span className="font-extrabold text-slate-800 block">Dialect Translation</span>
                <span className="text-slate-450 block text-[10px] mt-0.5">Set the layout language for all APMC and disease detection tools.</span>
              </div>
              <select 
                value={profileForm.language}
                onChange={(e) => setProfileForm({ ...profileForm, language: e.target.value })}
                className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Punjabi</option>
                <option>Marathi</option>
                <option>Telugu</option>
              </select>
            </div>

            {/* Setting Item: API System integration */}
            <div className="flex justify-between items-center py-4">
              <div className="text-xs max-w-sm">
                <span className="font-extrabold text-slate-800 block">IoT Hardware Integrations</span>
                <span className="text-slate-450 block text-[10px] mt-0.5">Bind telemetry devices (e.g. soil sensors, drone flight cameras) to state server.</span>
              </div>
              <button 
                onClick={() => alert("Searching local IoT hardware beacons...")}
                className="border border-brand-accent hover:bg-brand-accent/5 px-3 py-1.5 rounded-xl text-[10px] font-bold text-brand"
              >
                Connect IoT Beacons
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS FULL MODULE */}
      {viewType === 'notifications' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-850">System Notifications</h2>
            <p className="text-xs text-slate-400">Ecosystem alert logs, weather warning advisories, and contract agreements</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3.5">
            {mockNotifications.map((notif) => (
              <div key={notif.id} className="p-4 border border-slate-105 hover:border-brand-accent/50 rounded-2xl flex gap-3 text-xs leading-relaxed transition-colors">
                <Bell className={`w-5 h-5 shrink-0 mt-0.5 ${
                  notif.type === 'alert' ? 'text-red-500' : notif.type === 'offer' ? 'text-blue-500' : 'text-slate-400'
                }`} />
                <div>
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-extrabold text-slate-800">{notif.title}</span>
                    <span className="text-[9px] text-slate-400 shrink-0 font-medium">{notif.time}</span>
                  </div>
                  <p className="text-slate-500 mt-1">{notif.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
