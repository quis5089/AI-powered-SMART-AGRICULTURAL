import React from 'react';
import { 
  Sprout, Shield, TrendingUp, Handshake, Users, Leaf, 
  CloudSun, Beaker, Landmark, MessageSquare, Briefcase, 
  Truck, ArrowRight, ShieldCheck, Star, Bot, Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreDemo: (role: 'Farmer' | 'Buyer' | 'Admin' | 'Expert') => void;
  onTalkToAI: () => void;
}

export default function LandingPage({ onGetStarted, onExploreDemo, onTalkToAI }: LandingPageProps) {
  
  const valueProps = [
    { title: "Reduce Post-Harvest Losses", desc: "AI-driven demand-supply sync and local refrigeration partnerships lower crop wastage by 35%.", icon: Shield, color: "text-emerald-600 bg-emerald-50" },
    { title: "Increase Farmers' Income", desc: "Bypassing middlemen via direct buyer matching and price arbitrage ensures 20-30% higher margins.", icon: TrendingUp, color: "text-blue-600 bg-blue-50" },
    { title: "Improve Transparency", desc: "Traceability ledger reports verify chemical grades and logistical checkpoints from farm to table.", icon: ShieldCheck, color: "text-teal-600 bg-teal-50" },
    { title: "Strengthen Supply Chain", desc: "Integrated scheduling of pick-ups and logistics stops delays and protects perishable produce.", icon: Truck, color: "text-amber-600 bg-amber-50" },
    { title: "Promote Sustainable Agriculture", desc: "Soil macronutrient prescription and micro-irrigation calendars prevent NPK depletion.", icon: Leaf, color: "text-green-600 bg-green-50" }
  ];

  const features = [
    { title: "AI Crop Disease Detection", desc: "Upload leaf photos to isolate bacterial blight or early blight instantly with expert cures.", icon: Leaf },
    { title: "Crop Price Prediction", desc: "Time your sales using regional mandi price forecasts backed by historical volatility metrics.", icon: TrendingUp },
    { title: "Weather & Climate Advisory", desc: "Pest risk warnings and customized irrigation flags mapped to sub-district precipitation.", icon: CloudSun },
    { title: "Soil & Nutrient Prescription", desc: "Calculate field N-P-K balances from lab reports with crop rotation guides.", icon: Beaker },
    { title: "B2B Procurement Marketplace", desc: "Direct trading platform between verified bulk buyers and localized multi-crop farm groups.", icon: Handshake },
    { title: "Admin Ecosystem Telemetry", desc: "National heatmaps of emerging pest clusters, post-harvest losses, and subsidy approvals.", icon: Landmark },
    { title: "Govt Scheme Onboarding", desc: "Automated eligibility checking for PM-Kisan and SMAM subsidies using document audits.", icon: Landmark },
    { title: "Agri Expert advisory", desc: "One-on-one video advisory slots and published digital treatment logs written by certified specialists.", icon: Users },
    { title: "Multilingual Chatbot Support", desc: "Get smart agronomic tips in Hindi, Punjabi, Telugu, and Marathi through voice inputs.", icon: Bot }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-brand p-2 rounded-xl text-white">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg text-brand-dark tracking-tight">AgriEcosystem</span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-600">
          <a href="#impact" className="hover:text-brand transition-colors">Ecosystem Impact</a>
          <a href="#features" className="hover:text-brand transition-colors">Platform Modules</a>
          <a href="#workflow" className="hover:text-brand transition-colors">How It Works</a>
          <a href="#roles" className="hover:text-brand transition-colors">User Roles</a>
          <a href="#stats" className="hover:text-brand transition-colors">Trust Stats</a>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onTalkToAI}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand text-xs font-bold text-brand bg-white hover:bg-brand-light/30 transition-all shadow-sm"
          >
            <Bot className="w-4 h-4" />
            Talk to AI Advisor
          </button>
          <button 
            onClick={onGetStarted}
            className="bg-brand hover:bg-brand-dark text-white px-5 py-2 rounded-full text-xs font-extrabold shadow-md hover:shadow-lg transition-all"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-light/40 via-white to-brand-light/20 pt-16 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200 text-brand-dark px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Agritech Portal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              AI-Powered Smart <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">
                Agriculture Ecosystem
              </span>
            </h1>
            <p className="text-base text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Empowering Farmers. Connecting Markets. Enabling Growth. Optimize crop yields through AI diagnostics, monitor mandi prices, transact securely, and consult experts.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button 
                onClick={onGetStarted}
                className="bg-brand hover:bg-brand-dark text-white font-bold py-3.5 px-8 rounded-full text-xs flex items-center gap-2 hover:scale-[1.02] shadow-md shadow-brand-dark/20 transition-all"
              >
                Launch App
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onExploreDemo('Farmer')}
                className="bg-white hover:bg-slate-50 text-slate-700 hover:text-brand font-bold py-3.5 px-8 rounded-full text-xs border border-slate-200 hover:border-brand-accent/50 shadow-sm transition-all"
              >
                Explore Sandbox
              </button>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="relative mx-auto lg:ml-auto max-w-md w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent to-emerald-400 rounded-3xl transform rotate-3 scale-102 opacity-20 blur-lg"></div>
            <div className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 overflow-hidden">
              <div className="flex items-center justify-between border-b pb-4 mb-4 border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">
                  System Health: Live
                </span>
              </div>
              <div className="space-y-4">
                {/* Simulated UI Stat */}
                <div className="bg-gradient-to-r from-brand-light to-white p-4 rounded-2xl border border-brand/10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Produce Traded</span>
                    <TrendingUp className="w-4 h-4 text-brand" />
                  </div>
                  <span className="text-xl font-extrabold text-brand-dark block mt-1">12,480 Metric Tonnes</span>
                </div>
                {/* Simulated Chart Container */}
                <div className="h-32 bg-slate-50 hover:bg-emerald-50/20 border border-dashed border-slate-200 flex flex-col items-center justify-center rounded-2xl p-3 transition-colors">
                  <div className="flex gap-1.5 items-end justify-between w-full h-16 px-4">
                    <div className="w-4 bg-brand/30 h-10 rounded-t"></div>
                    <div className="w-4 bg-brand/40 h-14 rounded-t"></div>
                    <div className="w-4 bg-brand/50 h-12 rounded-t"></div>
                    <div className="w-4 bg-brand/75 h-20 rounded-t"></div>
                    <div className="w-4 bg-brand h-24 rounded-t"></div>
                  </div>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-2.5">
                    Live Market Rate Trend (Rice)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section / Value Props */}
      <section id="impact" className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900">Ecosystem Value Proposition</h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              We connect and empower key stakeowners in the agricultural cycle to eliminate waste, lower expenses, and enhance farmer financial outcomes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {valueProps.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="bg-slate-55 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md hover:border-brand-accent/30 transition-all flex flex-col justify-between">
                  <div className={`p-3 rounded-xl inline-block ${p.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-[13px] text-slate-800 leading-snug">{p.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-normal">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900">Integrated Multi-role Modules</h2>
            <p className="text-xs text-slate-500 font-medium">
              A comprehensive toolkit tailored to handle biological, logistical, and monetary challenges in modern farms.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 hover:border-brand-accent/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-3 flex items-start gap-4">
                  <div className="p-2.5 bg-brand-light rounded-xl text-brand shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-800">{f.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="workflow" className="py-20 px-6 bg-white border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900">How the Ecosystem Operates</h2>
            <p className="text-xs text-slate-500 font-medium">
              Seamlessly linking botanical monitoring, grading, commerce, logisitics, and platform oversight.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            {[
              { step: "01", title: "Data Upload", desc: "Farmer records soil metrics, weather targets, or leaf photos to setup base insights." },
              { step: "02", title: "AI Diagnosis", desc: "Our models run crop diagnostic and mandi forecasting routines." },
              { step: "03", title: "Market Listing", desc: "Produce is cataloged by grade, variety, moisture level, and expected price." },
              { step: "04", title: "Buyer Match", desc: "Verified bulk buyers query listings, issue bids, or commit escrow deposits." },
              { step: "05", title: "Fulfillment", desc: "Logistics partners are dispatched to handle farm pickup and route tracking." },
              { step: "06", title: "Oversight", desc: "Agri-experts answer queries and admins monitor outbreak risks." }
            ].map((s, idx) => (
              <div key={idx} className="relative bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2 flex flex-col justify-between">
                <span className="font-black text-2xl text-brand opacity-20 block">{s.step}</span>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">{s.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Dashboard Previews (Roles Selection Cards) */}
      <section id="roles" className="py-20 px-6 bg-slate-55">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900">Test Dashboard Personas</h2>
            <p className="text-xs text-slate-500 font-medium">
              Select one of the client dashboards below to jump right into the sandbox modules.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { role: 'Farmer', title: 'Farmer Panel', list: ['Disease Scanner', 'Price Alerts', 'Soil Metrics', 'Subsidy Tracker'], color: 'from-emerald-500 to-emerald-600', icon: Sprout },
              { role: 'Buyer', title: 'B2B Purchaser', list: ['Traceability reports', 'Escrow Orders', 'Contract Farming', 'Shipment ETA'], color: 'from-blue-500 to-blue-600', icon: Handshake },
              { role: 'Admin', title: 'Ecosystem Admin', list: ['Regional loss meters', 'Pest alert heatmaps', 'Platform telemetry'], color: 'from-slate-700 to-slate-800', icon: Shield },
              { role: 'Expert', title: 'Agri Expert Hub', list: ['Query Inbox', 'Treatment builder', 'Mentorship bookings'], color: 'from-teal-500 to-teal-600', icon: Users }
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.role} className="bg-white border border-slate-205 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-brand transition-all">
                  <div className="space-y-4">
                    <div className={`p-3 rounded-xl inline-block bg-gradient-to-br ${c.color} text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">{c.title}</h3>
                      <ul className="space-y-1.5 mt-3">
                        {c.list.map((item, i) => (
                          <li key={i} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 bg-brand rounded-full inline-block"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => onExploreDemo(c.role as any)}
                    className="mt-6 w-full text-center bg-slate-50 hover:bg-brand hover:text-white py-2 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 hover:border-brand transition-all flex items-center justify-center gap-1"
                  >
                    Launch Sandbox
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="stats" className="bg-brand-dark py-16 px-6 text-white text-center">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-8">
          {[
            { metric: "12,450+", label: "Farmers Enrolled" },
            { metric: "380+", label: "Verified Bulk Buyers" },
            { metric: "₹38.2 M", label: "Monthly Gross Value" },
            { metric: "1,200+", label: "Crop Diseases Solved" },
            { metric: "99.9%", label: "Delivery Success Rate" }
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <span className="block font-black text-2xl lg:text-3xl text-brand-accent">{stat.metric}</span>
              <span className="text-[10px] uppercase font-bold text-white/70 tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl font-black text-slate-900">Trusted by Agricultural Pioneers</h2>
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm relative">
            <span className="text-5xl text-brand-accent/40 font-serif absolute -top-2 left-6">“</span>
            <p className="text-sm italic text-slate-600 leading-relaxed">
              Using the AI Crop Disease scanner, I detected leaf blight early, saved my potato crop, and sold directly to Vikram of Groco Retail Chain. I got a 25% better rate than local Mandis. The logistics partner arrived straight to my farm gate within 24 hours of matching.
            </p>
            <div>
              <span className="block font-extrabold text-xs text-slate-800">Gurpreet Singh Bajwa</span>
              <span className="text-[10px] text-slate-400 font-semibold">Potato & Paddy Farmer, Ludhiana District, Punjab</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white/75 py-12 px-6 border-t border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-brand-accent" />
              <span className="font-extrabold text-white text-sm">AgriEcosystem</span>
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Empowering farmers, securing supply chains, safeguarding crop health, and optimizing monetary outcomes. Made with tech in the service of rural prosperity.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Our Platform</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onExploreDemo('Farmer')} className="hover:text-white">Farmer modules</button></li>
              <li><button onClick={() => onExploreDemo('Buyer')} className="hover:text-white">Buyer procurement</button></li>
              <li><button onClick={() => onExploreDemo('Admin')} className="hover:text-white">Analytics telemetry</button></li>
              <li><button onClick={() => onExploreDemo('Expert')} className="hover:text-white">Expert advisory hub</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-xs">AI & Satellites</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white">Crop disease scanning</a></li>
              <li><a href="#features" className="hover:text-white">Price prediction charts</a></li>
              <li><a href="#features" className="hover:text-white">Soil nutrient balances</a></li>
              <li><a href="#features" className="hover:text-white">AI chatbot assistance</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Support Center</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Dispute resolution</a></li>
              <li><a href="#" className="hover:text-white">Helpline: +1800-456-999</a></li>
              <li><a href="#" className="hover:text-white">System status: Online</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/40">
          <p>© 2026 AI-Powered Smart Agriculture Ecosystem. All royalty interests reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 font-medium">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Preferences</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
