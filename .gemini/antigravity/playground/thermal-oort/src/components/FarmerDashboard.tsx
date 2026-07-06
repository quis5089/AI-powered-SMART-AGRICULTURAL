import React, { useState } from 'react';
import { 
  Sprout, Leaf, TrendingUp, CloudSun, Beaker, CheckSquare, 
  ShoppingBag, Briefcase, Truck, Landmark, Upload, AlertTriangle, 
  CheckCircle2, Plus, MessageSquare, ArrowRight, Star, ExternalLink, Bot, Mic, Search
} from 'lucide-react';
import { 
  MOCK_CROP_SCANS, MOCK_PRICE_FORECAST, MOCK_WEATHER, MOCK_SOIL, 
  MOCK_PRODUCE, MOCK_SHIPMENTS, MOCK_SCHEMES, ProduceListing, MOCK_FARMERS 
} from '../data/mockData';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar 
} from 'recharts';

interface FarmerDashboardProps {
  activeModule: string;
  setActiveModule: (val: string) => void;
  onTalkToAI?: () => void;
}

export default function FarmerDashboard({ activeModule, setActiveModule, onTalkToAI }: FarmerDashboardProps) {
  // Module 1: Upload crop disease simulation
  const [scanFile, setScanFile] = useState<File | null>(null);
  const [scans, setScans] = useState(MOCK_CROP_SCANS);
  const [showScanResult, setShowScanResult] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Module 2: Price forecast crop select
  const [selectedForecastCrop, setSelectedForecastCrop] = useState<'Rice' | 'Wheat' | 'Tomato'>('Rice');
  const [priceAlert, setPriceAlert] = useState({ crop: 'Rice', targetPrice: 4500 });
  const [alertsList, setAlertsList] = useState<{crop:string, target:number}[]>([]);

  // Module 6: Inputs shop
  const [cart, setCart] = useState<{id:string, name:string, price:number, qty:number}[]>([]);
  const shopProducts = [
    { id: 'SP1', name: 'Indo-Gulf Urea (50kg Bag)', desc: 'High nitrogen value for paddy & wheat', price: 295, cat: 'Fertilizers', rating: 4.8 },
    { id: 'SP2', name: 'Pusa Basmati-1509 Seeds (10kg)', desc: 'Certified high yield, pest resistant crop seeds', price: 950, cat: 'Seeds', rating: 4.9 },
    { id: 'SP3', name: 'Bayer Confidor Insecticide (250ml)', desc: 'Systemic insecticide for sucking pests', price: 680, cat: 'Pesticides', rating: 4.6 },
    { id: 'SP4', name: 'Falcon Grafting & Pruning Shears', desc: 'Ergonomic heavy duty garden tools', price: 420, cat: 'Tools', rating: 4.5 }
  ];

  // Module 7: Sell Produce
  const [sellForm, setSellForm] = useState({ cropName: 'Paddy (Basmati)', variety: 'Pusa 1121', quantity: 15, expectedPrice: 4300, grade: 'A' as any });
  const [myListings, setMyListings] = useState<ProduceListing[]>(MOCK_PRODUCE.filter(p => p.farmerId === 'F001'));
  const [buyerOffers, setBuyerOffers] = useState([
    { id: 'O1', buyerName: 'Amit Desai (Organic Foods India)', crop: 'Paddy (Basmati)', quantity: '15 Tonnes', offeredPrice: 4250, status: 'Offer Received' },
    { id: 'O2', buyerName: 'Vikram Grover (Groco Retail Chain)', crop: 'Paddy (Basmati)', quantity: '10 Tonnes', offeredPrice: 4180, status: 'Offer Received' }
  ]);

  // Module 8: Logistics
  const [schedulingPickup, setSchedulingPickup] = useState(false);
  const [pickupListingId, setPickupListingId] = useState('P001');

  // Scan simulation
  const handleUploadScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScanFile(e.target.files[0]);
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setShowScanResult(true);
        // Prepend new scan to simulation list
        setScans(prev => [
          {
            id: `SCN-${Date.now()}`,
            crop: 'Tomato',
            disease: 'Early Blight (Alternaria solani)',
            confidence: 96.5,
            severity: 'MODERATE',
            date: new Date().toISOString().split('T')[0],
            image: '',
            status: 'Action Required',
            treatment: 'Immediate spray of Mancozeb (2.5g/L) or Chlorothalonil. Remove yellowing infected lower foliage immediately.'
          },
          ...prev
        ]);
      }, 2000);
    }
  };

  // Add produce listing
  const handleAddProduce = (e: React.FormEvent) => {
    e.preventDefault();
    const newL: ProduceListing = {
      id: `P-${Date.now()}`,
      farmerId: 'F001',
      farmerName: 'Rajender Prasad Singh',
      cropName: sellForm.cropName,
      variety: sellForm.variety,
      quantity: sellForm.quantity,
      pricePerQuintal: sellForm.expectedPrice,
      grade: sellForm.grade,
      harvestDate: new Date().toISOString().split('T')[0],
      images: [],
      status: 'Available',
      location: 'Bhatinda Mandi, PB'
    };
    setMyListings(prev => [newL, ...prev]);
    alert("Produce listing added to direct B2B marketplace!");
  };

  // Cart actions
  const addToCart = (p: typeof shopProducts[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === p.id);
      if (existing) {
        return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  };

  // Price alert setup
  const handleAddPriceAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertsList(prev => [...prev, { crop: priceAlert.crop, target: priceAlert.targetPrice }]);
    alert(`Price Alert set for ${priceAlert.crop} at ₹${priceAlert.targetPrice}/Quintal`);
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      
      {/* 0. HOME / SUMMARY DASHBOARD */}
      {activeModule === 'home' && (
        <div className="space-y-6 font-sans">
          {/* Greeting Banner */}
          <div className="bg-gradient-to-r from-brand to-brand-dark rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 transform scale-150 py-4"><Sprout className="w-48 h-48" /></div>
            <div className="relative z-10 space-y-2">
              <span className="bg-white/20 text-brand-light px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Farmer Workspace
              </span>
              <h1 className="text-2xl md:text-3xl font-black">Pranam, Rajender Prasad Singh!</h1>
              <p className="text-xs md:text-sm text-brand-light/90 max-w-xl font-medium">
                North Field soil Nitrogen levels are slightly low. Keep checking the 48-hour precipitation forecasts before deploying fertilizer.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "My Listings", val: `${myListings.length} Active`, icon: Briefcase, color: "text-blue-600 bg-blue-50" },
              { label: "Disease Alerts", val: "1 Critical", icon: Leaf, color: "text-amber-600 bg-amber-50" },
              { label: "Soil Score", val: `${MOCK_SOIL.overallScore}/100`, icon: Beaker, color: "text-emerald-600 bg-emerald-50" },
              { label: "Pending Shipments", val: "1 In-Transit", icon: Truck, color: "text-teal-600 bg-teal-50" }
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

          {/* Core Row */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Weather + Advisories widget */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">Weather & Advisory</h3>
                <CloudSun className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-slate-800">{MOCK_WEATHER.currentTemp}°C</span>
                <div>
                  <span className="text-xs font-bold text-slate-700 block">{MOCK_WEATHER.condition}</span>
                  <span className="text-[10px] text-slate-400">Precipitation: {MOCK_WEATHER.rainfallChance}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100">
                {MOCK_WEATHER.advisory}
              </p>
              <button 
                onClick={() => setActiveModule('weather')}
                className="w-full text-center bg-slate-50 hover:bg-brand hover:text-white py-2 rounded-xl text-xs font-bold text-slate-700 border border-slate-205 transition-all"
              >
                7-Day Climate Forecast
              </button>
            </div>

            {/* Smart Tasks checklist */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">Recommended Tasks</h3>
                <CheckSquare className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-3">
                {[
                  { task: "Prepare Copper fungicide mix code: Bacterial blight detected.", priority: "Urgent", c: "bg-amber-100 text-amber-800" },
                  { task: "Order Indo-Gulf Urea: Soil N levels are deficient.", priority: "Recommended", c: "bg-emerald-100 text-emerald-800" },
                  { task: "Draft PM-Kisan scheme land documents.", priority: "Seasonal", c: "bg-blue-100 text-blue-800" }
                ].map((t, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <input type="checkbox" className="rounded mt-0.5 text-brand" />
                    <div>
                      <p className="text-xs text-slate-705 font-medium leading-tight">{t.task}</p>
                      <span className={`inline-block text-[9px] uppercase font-bold px-1.5 py-0.5 rounded mt-1 ${t.c}`}>
                        {t.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandi Price forecast trends summary */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">Market Price Forecast</h3>
                <TrendingUp className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Paddy Basmati 1121</span>
                  <span className="font-extrabold text-emerald-600">₹4,450/Qtl</span>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <span className="text-[10px] text-blue-800 font-bold block uppercase">AI Prediction Trend</span>
                  <p className="text-[11px] text-blue-900 mt-1 leading-relaxed">
                    Forecast model indicates crop rates will hit ₹4,700/Qtl by October. Suggested time to sell is late September/October.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveModule('price')}
                  className="w-full text-center bg-slate-50 hover:bg-brand hover:text-white py-2 rounded-xl text-xs font-bold text-slate-700 border border-slate-205 transition-all"
                >
                  Analyze Forecast Charts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. AI CROP DISEASE DETECTION */}
      {activeModule === 'scan' && (
        <div className="space-y-6 font-sans">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-slate-800">AI Crop Disease Detection</h2>
              <p className="text-xs text-slate-400">Diagnose crop illnesses instantly using deep learning scanning algorithms</p>
            </div>
            <button 
              onClick={onTalkToAI}
              className="px-3.5 py-1.5 bg-gradient-to-r from-brand to-brand-dark rounded-full text-xs font-bold text-white shadow flex items-center gap-1"
            >
              <Bot className="w-4 h-4" /> Consult AI Agent
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Uploader Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800">Submit Leaf Diagnostic Specimen</h3>
              <div className="border-2 border-dashed border-slate-200 hover:border-brand-accent/50 rounded-2xl h-48 flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-emerald-50/10 transition-colors relative cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleUploadScan}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {isScanning ? (
                  <div className="text-center space-y-2">
                    <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs text-slate-500 font-bold">Diagnosing specimen leaf cell tags...</p>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <Upload className="w-8 h-8 text-brand/40 mx-auto" />
                    <p className="text-xs font-bold text-slate-600">Select leaf photograph or drag & drop</p>
                    <span className="text-[10px] text-slate-400 block">Accepted formats: JPG, PNG, WEBP up to 5MB</span>
                  </div>
                )}
              </div>

              {showScanResult && (
                <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-center border-b pb-2.5 border-slate-100">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        Severity: MODERATE
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-800 mt-1">Tomato Early Blight Detected</h4>
                    </div>
                    <span className="font-black text-brand text-sm">96.5% Match</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <p className="text-slate-650 leading-relaxed font-sans">
                      <strong className="text-slate-850">Root Cause:</strong> Fungal pathogens spreading due to moisture humidity retention on leaves.
                    </p>
                    <p className="text-slate-650 leading-relaxed font-sans">
                      <strong className="text-slate-850">Coping Recipe:</strong> Spray Mancozeb or Chlorothalonil fungicide. Trim bottom foliage dryly.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Scan History Table */}
            <div className="bg-white border border-slate-205 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800">Scan Diagnostics Log</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-105 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-2.5">Crop</th>
                      <th className="py-2.5">Found Condition</th>
                      <th className="py-2.5">Confidence</th>
                      <th className="py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {scans.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 font-medium">
                        <td className="py-3 font-semibold text-slate-700">{s.crop}</td>
                        <td className="py-3">
                          <span className="block text-slate-700">{s.disease}</span>
                          <span className="text-[9px] text-slate-400">Date: {s.date}</span>
                        </td>
                        <td className="py-3">{s.confidence}%</td>
                        <td className="py-3">
                          <span className={`inline-block text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            s.status === 'Resolved' || s.status === 'Treated' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CROP PRICE PREDICTION */}
      {activeModule === 'price' && (
        <div className="space-y-6 font-sans">
          <div>
            <h2 className="text-xl font-black text-slate-800">Crop Price Prediction & Mandi Rates</h2>
            <p className="text-xs text-slate-407 select-none">AI forecasting algorithms mapping regional price momentum</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left selector */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800">Forecast Workspace Parameters</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Crop</label>
                  <select 
                    value={selectedForecastCrop}
                    onChange={(e) => setSelectedForecastCrop(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand rounded-xl px-3.5 py-2 text-xs text-slate-700 font-bold"
                  >
                    <option value="Rice">Paddy (Basmati Rice)</option>
                    <option value="Wheat">Chandausi Wheat</option>
                    <option value="Tomato">Desi Tomato</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Select APMC / Mandi</label>
                  <select className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand rounded-xl px-3.5 py-2 text-xs text-slate-700 font-bold">
                    <option>Bathinda APMC yard, Punjab</option>
                    <option>Alwar Mandi, Rajasthan</option>
                    <option>Guntur Yard, AP</option>
                  </select>
                </div>
              </div>

              {/* Set alert Form */}
              <form onSubmit={handleAddPriceAlert} className="space-y-3 pt-4 border-t border-slate-100">
                <span className="font-bold text-xs text-slate-750 block">Set Target Price Alert</span>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-slate-405 font-bold">₹</span>
                  <input
                    type="number"
                    value={priceAlert.targetPrice}
                    onChange={(e) => setPriceAlert(prev => ({ ...prev, targetPrice: parseInt(e.target.value) }))}
                    placeholder="Enter target rate per quintal"
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand rounded-xl pl-8 pr-4 py-2 text-xs font-bold"
                  />
                </div>
                <button type="submit" className="w-full bg-brand text-white text-xs font-bold py-2 rounded-xl">
                  Commit Alert Setup
                </button>
              </form>
            </div>

            {/* Price Chart */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-450">AI Price Projection (INR / Quintal)</h3>
                <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-bold">Model precision: 92.4%</span>
              </div>
              
              <div className="h-64 mt-4 text-xs font-bold">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MOCK_PRICE_FORECAST[selectedForecastCrop]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="currentPrice" name="Actual Mandi Rate" stroke="#2e7d32" strokeWidth={3} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="forecastPrice" name="Predictive Target" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. WEATHER & CLIMATE ADVISORY */}
      {activeModule === 'weather' && (
        <div className="space-y-6 font-sans">
          <div>
            <h2 className="text-xl font-black text-slate-800">Weather & Climate Advisory</h2>
            <p className="text-xs text-slate-400">Dynamic irrigation advice synced with meteorological indicators</p>
          </div>

          {/* Extremes Block */}
          <div className="bg-amber-50 border border-amber-250 p-4 rounded-3xl flex gap-3 text-amber-900 text-xs">
            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
            <div>
              <span className="font-bold uppercase tracking-wide block">Extreme Weather Flag : Shower Cycle warning</span>
              <p className="mt-0.5 leading-relaxed font-semibold">
                Thunderstorm and rainfall (40-60mm) expected within Bathinda zone on Wednesday. Suspend all chemical spraying and deep channel flooding operations to protect root aeration.
              </p>
            </div>
          </div>

          {/* 7 Day grids */}
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {MOCK_WEATHER.forecast.map((day, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm space-y-2 hover:border-brand-accent/50 transition-colors">
                <span className="block font-bold text-xs text-slate-500 uppercase">{day.day}</span>
                <CloudSun className="w-6 h-6 text-brand mx-auto" />
                <span className="block font-black text-slate-805 text-sm">{day.temp}°C</span>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">{day.condition}</span>
                <span className="block text-[9px] text-blue-600 bg-blue-50 py-0.5 rounded font-bold">Rain: {day.rain}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SOIL & NUTRIENT ANALYSIS */}
      {activeModule === 'soil' && (
        <div className="space-y-6 font-sans">
          <div>
            <h2 className="text-xl font-black text-slate-850">Soil & Nutrient Prescriptions</h2>
            <p className="text-xs text-slate-400">Automate Nitrogen-Phosphorus-Potassium NPK targeting checks</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="text-center space-y-2 py-4 border-b border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Overall Soil Rating</span>
                <span className="block text-4xl font-extrabold text-brand-dark">{MOCK_SOIL.overallScore}/100</span>
                <span className="inline-block text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  Status: Optimal Good
                </span>
              </div>

              {/* Levels Checklist */}
              <div className="space-y-3.5">
                {Object.entries(MOCK_SOIL.levels).map(([key, data]) => (
                  <div key={key} className="space-y-1 text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span className="capitalize text-slate-600">{key} Level</span>
                      <span className={data.color}>{data.val} ({data.status})</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${
                        data.status === 'Optimal' ? 'bg-emerald-500' : data.status === 'High' ? 'bg-blue-500' : 'bg-amber-500'
                      }`} style={{ width: data.status === 'Optimal' ? '80%' : data.status === 'High' ? '95%' : '40%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prescriptions */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-slate-800">Scientific Fertilizer Treatments</h3>
              <div className="space-y-3.5">
                {MOCK_SOIL.advice.map((ad, i) => (
                  <div key={i} className="flex gap-2.5 items-start bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-650 leading-relaxed font-sans">{ad}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SMART RECOMMENDATIONS */}
      {activeModule === 'advice' && (
        <div className="space-y-6 font-sans">
          <div>
            <h2 className="text-xl font-black text-slate-800">AI Farming Calendar</h2>
            <p className="text-xs text-slate-400">Step by step agritech tasks built upon local satellite readings</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Fertilization Plan", desc: "Mix NPK 120:60:60 formula. Suspend application during Tuesday cloud cover.", tag: "urgent", c: "bg-red-100 text-red-800 border-red-200" },
              { title: "Irrigation Schedule", desc: "Postpone deep canal irrigation; showers expected Wednesday will provide 15mm floor.", tag: "cost-saving", c: "bg-blue-105 text-blue-800 border-blue-200" },
              { title: "Crop Rotation Guide", desc: "Sow Mustard or Chickpeas in October following basmati rice to rebuild nitrogen layers.", tag: "seasonal", c: "bg-emerald-100 text-emerald-800 border-emerald-200" }
            ].map((rec, i) => (
              <div key={i} className="bg-white border border-slate-200 hover:border-brand-accent/50 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between transition-colors">
                <div className="space-y-2">
                  <span className={`inline-block text-[9px] uppercase font-bold px-2 py-0.5 border rounded ${rec.c}`}>
                    {rec.tag}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900">{rec.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{rec.desc}</p>
                </div>
                <button className="w-full text-center bg-slate-50 hover:bg-brand hover:text-white py-2 rounded-xl text-xs font-semibold text-slate-700 transition-colors">
                  View Setup Logs
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. RESOURCE MARKETPLACE */}
      {activeModule === 'shop' && (
        <div className="space-y-6 font-sans">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-slate-800">Cooperative Resource Shop</h2>
              <p className="text-xs text-slate-400">Purchase certified seeds, fertilizers, and tools with subsidy checkout</p>
            </div>
            {/* Cart summary */}
            <div className="bg-brand text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1">
              <ShoppingBag className="w-4 h-4" />
              <span>{cart.reduce((a, b) => a + b.qty, 0)} Items (₹{cart.reduce((a, b) => a + (b.price * b.qty), 0)})</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Catalog */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
              {shopProducts.map((p) => (
                <div key={p.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-105 px-2 py-0.5 rounded">
                        {p.cat}
                      </span>
                      <span className="text-xs font-bold text-amber-500 flex items-center">
                        <Star className="w-3.5 h-3.5 fill-current" /> {p.rating}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-805 leading-snug">{p.name}</h3>
                    <p className="text-xs text-slate-500 leading-normal">{p.desc}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2.5 border-t border-slate-100">
                    <span className="text-sm font-extrabold text-slate-805">₹{p.price}</span>
                    <button 
                      onClick={() => addToCart(p)}
                      className="bg-brand hover:bg-brand-dark px-3 py-1.5 text-[11px] font-bold text-white rounded-xl transition-colors"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Checkout Box */}
            <div className="bg-white border border-slate-205 rounded-3xl p-5 shadow-sm space-y-4 h-fit">
              <h3 className="font-bold text-sm text-slate-800">Checkout Cart</h3>
              {cart.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center select-none">No cooperative items added</p>
              ) : (
                <div className="space-y-4">
                  <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="py-2.5 flex justify-between text-xs font-semibold text-slate-700">
                        <div>
                          <p className="truncate w-36">{item.name}</p>
                          <span className="text-[10px] text-slate-400">Qty: {item.qty} * ₹{item.price}</span>
                        </div>
                        <span>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Totals */}
                  <div className="border-t pt-3 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Subtotal</span>
                      <span className="font-bold text-slate-705">₹{cart.reduce((a, b) => a + (b.price * b.qty), 0)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Cooperative Subsidy (10%)</span>
                      <span>-₹{Math.round(cart.reduce((a, b) => a + (b.price * b.qty), 0) * 0.1)}</span>
                    </div>
                    <div className="flex justify-between text-slate-800 font-extrabold border-t pt-2 mt-1">
                      <span>Payable Amount</span>
                      <span>₹{Math.round(cart.reduce((a, b) => a + (b.price * b.qty), 0) * 0.9)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      alert("Order successfully placed with dynamic cooperative credits!");
                      setCart([]);
                    }}
                    className="w-full bg-brand text-white text-xs font-extrabold py-3 shadow-md rounded-xl text-center"
                  >
                    Commit Secure Payment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. SELL PRODUCE / DIRECT B2B MARKETPLACE */}
      {activeModule === 'sell' && (
        <div className="space-y-6 font-sans">
          <div>
            <h2 className="text-xl font-black text-slate-805">Direct B2B Market Produce list</h2>
            <p className="text-xs text-slate-400">Declare yields to receive matching organic B2B wholesale bids</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Post yield form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800">Publish Harvest Yield</h3>
              <form onSubmit={handleAddProduce} className="space-y-3.5 text-xs text-slate-700">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Crop Type</label>
                  <input
                    type="text"
                    value={sellForm.cropName}
                    onChange={(e) => setSellForm(prev => ({ ...prev, cropName: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-202 focus:outline-none focus:border-brand rounded-xl px-3.5 py-2.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Variety Reference</label>
                  <input
                    type="text"
                    value={sellForm.variety}
                    onChange={(e) => setSellForm(prev => ({ ...prev, variety: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-202 focus:outline-none focus:border-brand rounded-xl px-3.5 py-2.5 font-semibold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Qty (Tonnes)</label>
                    <input
                      type="number"
                      value={sellForm.quantity}
                      onChange={(e) => setSellForm(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                      className="w-full bg-slate-50 border border-slate-202 focus:outline-none focus:border-brand rounded-xl px-3 py-2.5 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Rate (₹/Qtl)</label>
                    <input
                      type="number"
                      value={sellForm.expectedPrice}
                      onChange={(e) => setSellForm(prev => ({ ...prev, expectedPrice: parseInt(e.target.value) }))}
                      className="w-full bg-slate-50 border border-slate-202 focus:outline-none focus:border-brand rounded-xl px-3 py-2.5 font-bold"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-brand text-white font-extrabold py-2.5 rounded-xl text-center">
                  Publish Yield Listing
                </button>
              </form>
            </div>

            {/* Active yield lists and incoming offers */}
            <div className="lg:col-span-2 space-y-6">
              {/* Listings */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">My Platform Listings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-105 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-2.5">Crop info</th>
                        <th className="py-2.5">Qty / price</th>
                        <th className="py-2.5">Grade</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {myListings.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50">
                          <td className="py-3">
                            <span className="block font-bold">{l.cropName}</span>
                            <span className="text-[9px] text-slate-400">Var: {l.variety}</span>
                          </td>
                          <td className="py-3">
                            <span className="block">{l.quantity} Tonnes</span>
                            <span className="text-[9px] text-slate-400">₹{l.pricePerQuintal}/Qtl</span>
                          </td>
                          <td className="py-3 font-bold text-brand">{l.grade}</td>
                          <td className="py-3">
                            <span className="inline-block text-[9px] uppercase font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                              {l.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Offers */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Buyer Bids & Contracts</h3>
                <div className="space-y-3">
                  {buyerOffers.map((off) => (
                    <div key={off.id} className="border border-slate-100 hover:border-brand-accent/50 p-4 rounded-2xl flex justify-between items-center transition-colors">
                      <div className="text-xs">
                        <span className="font-bold text-slate-805 block">{off.buyerName}</span>
                        <p className="text-slate-500 text-[11px] mt-0.5">Bid for {off.quantity} of {off.crop} at <strong className="text-slate-800">₹{off.offeredPrice}/Qtl</strong></p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            alert("Bid accepted! Escrow payment requested from buyer.");
                            setBuyerOffers(prev => prev.filter(o => o.id !== off.id));
                          }}
                          className="bg-brand text-white font-bold px-3 py-1.5 rounded-xl text-[10px]"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => setBuyerOffers(prev => prev.filter(o => o.id !== off.id))}
                          className="border border-slate-200 text-slate-600 px-3 py-1.5 rounded-xl text-[10px]"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. LOGISTICS & PICKUPS */}
      {activeModule === 'logistics' && (
        <div className="space-y-6 font-sans">
          <div>
            <h2 className="text-xl font-black text-slate-850">Fulfillment & Trucking</h2>
            <p className="text-xs text-slate-400">Secure automated shipment routing mapping from farm to B2B point</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left selector */}
            <div className="bg-white border border-slate-205 rounded-3xl p-5 shadow-sm space-y-4 h-fit">
              <h3 className="font-bold text-sm text-slate-800">Request Farm Gate Pickup</h3>
              <div className="space-y-3 text-xs text-slate-700">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Select Escrow Agreed Listing</label>
                  <select 
                    value={pickupListingId}
                    onChange={(e) => setPickupListingId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand rounded-xl px-3.5 py-2.5 font-bold"
                  >
                    <option value="P001">Paddy (Basmati) - Sold to Organic Foods</option>
                    <option value="P003">Sugarcane - Sold to South Agri Exporters</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Scheduled Date</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand rounded-xl px-3.5 py-2.5 font-bold" defaultValue="2026-07-08" />
                </div>
                <button 
                  onClick={() => {
                    alert("Pickup truck requested success! Carrier tracking details will be generated.");
                  }}
                  className="w-full bg-brand text-white font-extrabold py-2.5 rounded-xl text-center"
                >
                  Schedule Dispatch
                </button>
              </div>
            </div>

            {/* In-Transit visual timeline tracking */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Active Truck Deliveries</h3>
              {MOCK_SHIPMENTS.map((s) => (
                <div key={s.id} className="border border-slate-105 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-start border-b pb-3 border-slate-100 text-xs">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                        Driver: {s.driver} ({s.driverPhone})
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-800 mt-1">{s.cropName} - {s.quantity}</h4>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-brand uppercase">{s.status}</span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">ETA: {s.eta}</span>
                    </div>
                  </div>

                  {/* Horizontal timeline */}
                  <div className="relative pt-4 pb-2 px-6">
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-100"></div>
                    <div className="absolute left-6 right-1/2 top-1/2 -translate-y-1/2 h-1 bg-brand"></div>
                    <div className="flex justify-between items-center relative z-10 text-[9px] font-bold text-slate-400 uppercase">
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full bg-brand border-2 border-white flex items-center justify-center text-white text-[8px]">✓</span>
                        <span className="mt-1 text-brand">Farm Gate</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full bg-brand border-2 border-white flex items-center justify-center text-white text-[8px]">✓</span>
                        <span className="mt-1 text-brand">APMC Hub</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center"></span>
                        <span className="mt-1">In Transit</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center"></span>
                        <span className="mt-1">Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 9. GOVERNMENT SCHEMES */}
      {activeModule === 'schemes' && (
        <div className="space-y-6 font-sans">
          <div>
            <h2 className="text-xl font-black text-slate-850">Direct Benefit Government Schemes</h2>
            <p className="text-xs text-slate-400">Automated eligibility parsing matching land size benchmarks</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SCHEMES.map((sch) => (
              <div key={sch.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-450 uppercase">{sch.id}</span>
                    <span className={`inline-block text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                      sch.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : sch.status === 'Under Review' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {sch.status}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-800 leading-snug">{sch.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-100">{sch.benefits}</p>
                  
                  {/* Documents Required */}
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Documents check</span>
                    <div className="flex flex-wrap gap-1">
                      {sch.documents.map((d, k) => (
                        <span key={k} className="text-[10px] bg-slate-105 text-slate-650 px-2 py-0.5 rounded-full border border-slate-201">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                    <span>Audit progress</span>
                    <span>{sch.appProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand" style={{ width: `${sch.appProgress}%` }}></div>
                  </div>
                  {sch.status === 'Eligible - Apply Now' ? (
                    <button 
                      onClick={() => alert(`Submitted documentation scan matching ${sch.name}`)}
                      className="w-full bg-brand text-white font-extrabold text-xs py-2 rounded-xl text-center mt-2"
                    >
                      Apply using Aadhaar e-Sign
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Default/Not Found module */}
      {!['home', 'scan', 'price', 'weather', 'soil', 'advice', 'shop', 'sell', 'logistics', 'schemes'].includes(activeModule) && (
        <div className="text-center py-20 font-sans">
          <p className="text-xs text-slate-400 select-none">Select a module from the sidebar workspace menu.</p>
        </div>
      )}
    </div>
  );
}
