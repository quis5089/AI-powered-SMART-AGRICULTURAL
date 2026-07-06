import React, { useState } from 'react';
import { 
  Building, Users, PieChart, ShieldAlert, AlertTriangle, 
  TrendingUp, BarChart3, Landmark, Database, ShieldCheck, 
  MapPin, CheckCircle2, RefreshCw, Layers, ArrowUpRight
} from 'lucide-react';
import { 
  MOCK_PLATFORM_STATS, MOCK_PRICE_FORECAST, MOCK_WEATHER, 
  MOCK_CROP_SCANS, MOCK_PRODUCE, MOCK_SHIPMENTS, MOCK_SCHEMES 
} from '../data/mockData';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, BarChart, Bar, Legend, LineChart, Line 
} from 'recharts';

interface AdminDashboardProps {
  activeModule: string;
  setActiveModule: (val: string) => void;
}

export default function AdminDashboard({ activeModule, setActiveModule }: AdminDashboardProps) {
  const [selectedCrop, setSelectedCrop] = useState<'Rice' | 'Wheat' | 'Tomato'>('Rice');
  
  // Simulated demand data
  const demandSupplyData = [
    { crop: 'Rice', supply: 120, demand: 180 },
    { crop: 'Wheat', supply: 240, demand: 210 },
    { crop: 'Tomato', supply: 85, demand: 140 },
    { crop: 'Ginger', supply: 40, demand: 75 },
    { crop: 'Chilli', supply: 30, demand: 90 }
  ];

  // Loss data
  const lossData = [
    { crop: 'Tomato', loss: 16.4, cause: 'Storage Temperature deviancy' },
    { crop: 'Paddy', loss: 4.8, cause: 'Logistical delays' },
    { crop: 'Potato', loss: 12.0, cause: 'Substandard packing' },
    { crop: 'Sugarcane', loss: 2.1, cause: 'Direct transit matches' }
  ];

  return (
    <div className="flex-1 p-6 space-y-6 font-sans">
      
      {/* 0. TELEMETRY OVERVIEW */}
      {activeModule === 'home' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-md flex justify-between items-center">
            <div>
              <span className="bg-white/20 text-slate-105 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Control terminal
              </span>
              <h1 className="text-2xl md:text-3xl font-black mt-2">Platform System Telemetry</h1>
              <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-xl font-medium">
                Ecosystem surveillance terminal monitoring transactions, agricultural post-harvest logs, and disease alerts.
              </p>
            </div>
            <div className="hidden md:block p-4 border border-white/10 rounded-2xl bg-white/5 text-center text-xs">
              <span className="text-slate-400 block uppercase font-bold text-[9px]">Platform Pulse</span>
              <span className="text-emerald-400 font-extrabold text-sm block mt-1">{MOCK_PLATFORM_STATS.platformHealth} healthy</span>
            </div>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Farmers", val: MOCK_PLATFORM_STATS.users.farmers, icon: Users, c: "text-emerald-600 bg-emerald-50" },
              { label: "Total Buyers", val: MOCK_PLATFORM_STATS.users.buyers, icon: Building, c: "text-blue-600 bg-blue-50" },
              { label: "Active Orders", val: MOCK_PLATFORM_STATS.activeOrders, icon: Layers, c: "text-indigo-600 bg-indigo-50" },
              { label: "Outbreak Areas", val: MOCK_PLATFORM_STATS.diseaseOutbreakAlerts, icon: ShieldAlert, c: "text-rose-600 bg-rose-50" }
            ].map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{kpi.label}</span>
                    <span className="text-base font-extrabold text-slate-700 mt-1 block">{kpi.val.toLocaleString()}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl ${kpi.c}`}><Icon className="w-5 h-5" /></div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Transaction Volume AreaChart */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center text-xs">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Total Transaction volume (INR)</h3>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">GMV Run-rate: ₹38.2M</span>
              </div>
              <div className="h-64 text-xs font-bold">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_PLATFORM_STATS.transactionHistory}>
                    <defs>
                      <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Area type="monotone" dataKey="volume" stroke="#6366f1" fillOpacity={1} fill="url(#colorVol)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Outbreaks summary and quick alert banners */}
            <div className="bg-white border border-slate-202 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Biological outbreak flags</h3>
                <ShieldAlert className="w-4 h-4 text-rose-500" />
              </div>
              <div className="space-y-3.5">
                {MOCK_PLATFORM_STATS.diseaseClusters.map((cl) => (
                  <div key={cl.id} className="flex justify-between items-start border-b pb-3 border-slate-50 last:border-none">
                    <div className="text-xs">
                      <span className="font-extrabold text-slate-805 block">{cl.region}</span>
                      <span className="text-slate-450 text-[10px] block mt-0.5">{cl.crop} • {cl.disease}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] bg-rose-50 border border-rose-200 text-rose-800 font-bold px-2 py-0.5 rounded">
                        {cl.cases} cases
                      </span>
                      <span className="block text-[8px] uppercase tracking-wider font-extrabold text-red-500 mt-1">{cl.severity} Risk</span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setActiveModule('disease-monitor')}
                className="w-full text-center bg-slate-50 hover:bg-brand hover:text-white py-2 rounded-xl text-xs font-bold text-slate-700 border border-slate-205 transition-colors"
              >
                Launch Pest Surveillance Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. MARKET TRENDS & PRICE INSIGHTS */}
      {activeModule === 'market-analytics' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-slate-800">Market Price Analytics & Volatility</h2>
              <p className="text-xs text-slate-400">Surveil APMC price drifts and historical trendlines</p>
            </div>
            <select 
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value as any)}
              className="bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-4 py-2 focus:outline-none focus:border-brand cursor-pointer"
            >
              <option value="Rice">Paddy (Basmati Rice)</option>
              <option value="Wheat">Wheat</option>
              <option value="Tomato">Tomato</option>
            </select>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Crop Price Trend curves (Actual vs Projected)</h3>
            <div className="h-72 text-xs font-bold">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_PRICE_FORECAST[selectedCrop]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="currentPrice" name="Actual Mandi Value" stroke="#2e7d32" strokeWidth={3} />
                  <Line type="monotone" dataKey="forecastPrice" name="Predictive forecast model" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 2. DEMAND FORECASTING & SUPPLY INSIGHTS */}
      {activeModule === 'demand-supply' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-800">Demand vs Supply Forecasting</h2>
            <p className="text-xs text-slate-400">Monitor projected crop shortages and surplus patterns</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Bar chart comparison */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Crop Volumes (in Ten Thousand tonnes)</h3>
              <div className="h-72 text-xs font-bold">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={demandSupplyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="crop" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="supply" name="Yield Supply" fill="#81c784" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="demand" name="Market Purchase Demand" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Demand advice */}
            <div className="bg-white border border-slate-205 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800">AI Supply Shortage flags</h3>
              <div className="space-y-3.5">
                {[
                  { crop: "Tomato", state: "Delhi NCR Mandi", gap: "55 Tonnes Shortfall", color: "text-rose-600 bg-rose-50" },
                  { crop: "Rice (Basmati)", state: "Mumbai Port Export", gap: "60 Tonnes Deficit", color: "text-amber-600 bg-amber-50" },
                  { crop: "Wheat", state: "North India mills", gap: "30 Tonnes Surplus", color: "text-emerald-600 bg-emerald-50" }
                ].map((gap, i) => (
                  <div key={i} className={`p-4 rounded-2xl flex justify-between items-center text-xs font-bold ${gap.color}`}>
                    <div>
                      <span className="block text-slate-805">{gap.crop}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{gap.state}</span>
                    </div>
                    <span>{gap.gap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DISEASE OUTBREAK MONITORING */}
      {activeModule === 'disease-monitor' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-850">Disease Outbreak Monitoring</h2>
            <p className="text-xs text-slate-400">Pathological heatmaps isolated from leaf scans</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PLATFORM_STATS.diseaseClusters.map((cl) => (
              <div key={cl.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400 uppercase">{cl.id}</span>
                  <span className="text-red-500 font-extrabold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> High Risk
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-800">{cl.region}</h3>
                <div className="space-y-1.5 text-xs text-slate-650">
                  <p>Crop: <span className="font-bold text-slate-800">{cl.crop}</span></p>
                  <p>Pathogen: <span className="font-bold text-slate-800">{cl.disease}</span></p>
                  <p>Active Scans: <span className="font-bold text-slate-800">{cl.cases} within 48 hrs</span></p>
                </div>
                <button 
                  onClick={() => alert(`Broadcasting pesticide advisory advisory to farmers within ${cl.region}...`)}
                  className="w-full bg-brand text-white text-xs font-bold py-2 rounded-xl text-center"
                >
                  Broadcast Advisory Warning
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. POST-HARVEST LOSS ESTIMATION */}
      {activeModule === 'loss-estimate' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-800">Post-Harvest Loss Evaluation</h2>
            <p className="text-xs text-slate-400">Track storage temperature decay, delay factors, and logistics failures</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Loss metrics */}
            <div className="bg-white border border-slate-202 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Overall Loss meters</h3>
              <div className="text-center py-4 border-b">
                <span className="text-[10px] uppercase font-bold text-slate-405 block select-none">Platform Average Loss</span>
                <span className="text-4xl font-extrabold text-rose-500">{MOCK_PLATFORM_STATS.lossPercent}%</span>
                <span className="text-[10px] text-slate-400 block mt-1">Goal benchmark target: &lt;5%</span>
              </div>
              
              <div className="space-y-3 pt-2">
                {lossData.map((item, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between items-center text-slate-700 font-bold">
                      <span>{item.crop}</span>
                      <span className="text-rose-600">{item.loss}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: `${item.loss * 4}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Causes logs */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Post-Harvest Loss Audit logs</h3>
              <div className="space-y-3">
                {lossData.map((item, idx) => (
                  <div key={idx} className="border border-slate-100 p-4 rounded-xl flex gap-3 text-xs leading-relaxed">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-slate-800">{item.crop} Loss Factor</span>
                      <p className="text-slate-500 text-[11px] mt-0.5">Primary failure vector: {item.cause}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. REVENUE & TRANSACTION ANALYTICS */}
      {activeModule === 'transactions' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-805">Revenue & GMV Transactions</h2>
            <p className="text-xs text-slate-400">Check escrow ledger flows and order settlement timelines</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Active GMV volume logs</h3>
            <div className="h-72 text-xs font-bold">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_PLATFORM_STATS.transactionHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="volume" name="Settlement volume" stroke="#1b5e20" fill="#a5d6a7" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 6. GOVERNMENT SCHEME MONITORING */}
      {activeModule === 'scheme-metrics' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-850">Subsidy Adoption logs</h2>
            <p className="text-xs text-slate-400">Approval velocities for PM-Kisan and mechanization subsidies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {MOCK_SCHEMES.map((sch) => (
              <div key={sch.id} className="bg-white border border-slate-205 rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-404 font-bold block uppercase">{sch.id}</span>
                  <h3 className="font-extrabold text-xs text-slate-805 leading-snug">{sch.name}</h3>
                  <p className="text-[11px] text-slate-500 font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-100">{sch.benefits}</p>
                </div>
                <div className="space-y-2 border-t pt-3">
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>Validation Progress</span>
                    <span>{sch.appProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand" style={{ width: `${sch.appProgress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Default/Not Found module */}
      {!['home', 'market-analytics', 'demand-supply', 'disease-monitor', 'loss-estimate', 'transactions', 'scheme-metrics'].includes(activeModule) && (
        <div className="text-center py-20">
          <p className="text-xs text-slate-400 select-none">Select a module from the sidebar workspace menu.</p>
        </div>
      )}
    </div>
  );
}
