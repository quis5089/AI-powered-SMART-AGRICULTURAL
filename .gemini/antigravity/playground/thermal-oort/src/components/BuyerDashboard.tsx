import React, { useState } from 'react';
import { 
  Users, Handshake, ShieldCheck, FileText, ShoppingBag, 
  Truck, HelpCircle, Star, Search, Filter, AlertCircle, 
  MapPin, CheckCircle2, ChevronRight, Download, Bot, ArrowUpRight
} from 'lucide-react';
import { 
  MOCK_FARMERS, MOCK_PRODUCE, MOCK_SHIPMENTS, MOCK_CONTRACTS, 
  ProduceListing, Buyer, MOCK_BUYERS 
} from '../data/mockData';

interface BuyerDashboardProps {
  activeModule: string;
  setActiveModule: (val: string) => void;
  onTalkToAI?: () => void;
}

export default function BuyerDashboard({ activeModule, setActiveModule, onTalkToAI }: BuyerDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('All');
  const [selectedFarmer, setSelectedFarmer] = useState<typeof MOCK_FARMERS[0] | null>(null);
  
  // Checkout Escrow state
  const [checkoutProduce, setCheckoutProduce] = useState<ProduceListing | null>(null);
  const [purchaseQty, setPurchaseQty] = useState(5);
  const [shippingAddress, setShippingAddress] = useState('Central Warehouse, Mumbai Port Trust, MH');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Contracts
  const [contracts, setContracts] = useState(MOCK_CONTRACTS);
  const [newContractForm, setNewContractForm] = useState({ cropName: 'Paddy', area: '40 Acres', priceLocked: '₹4,400/Quintal', terms: 'Certified Organic standard.' });

  // Support
  const [tickets, setTickets] = useState([
    { id: 'T001', cropName: 'Wheat Pusa Bold', issue: 'Slight moisture deviancy in Ludhiana lot (12% vs 10%)', date: '2026-07-04', status: 'Pending Resolving', timeline: ['Raised by Buyer', 'Audit ticket dispatched'] }
  ]);
  const [issueSummary, setIssueSummary] = useState('');

  const filteredFarmers = MOCK_FARMERS.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = selectedCropFilter === 'All' || f.crops.includes(selectedCropFilter);
    return matchesSearch && matchesCrop;
  });

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutProduce) return;
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setOrderPlaced(true);
      alert(`Escrow deposit of ₹${purchaseQty * checkoutProduce.pricePerQuintal * 10} initiated successfully!`);
    }, 1500);
  };

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    setContracts(prev => [
      {
        id: `CTR-${Date.now()}`,
        buyerName: 'Organic Foods India Ltd',
        cropName: newContractForm.cropName,
        area: newContractForm.area,
        priceLocked: newContractForm.priceLocked,
        duration: 'Kharif Season 2026-27',
        terms: newContractForm.terms,
        status: 'Proposed'
      },
      ...prev
    ]);
    alert("Contract farming RFP proposal sent to target farmers!");
  };

  return (
    <div className="flex-1 p-6 space-y-6 font-sans">
      
      {/* 0. HOME / SUMMARY DASHBOARD */}
      {activeModule === 'home' && (
        <div className="space-y-6">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-3xl p-6 md:p-8 text-white shadow-md">
            <span className="bg-white/20 text-blue-105 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              B2B procurement
            </span>
            <h1 className="text-2xl md:text-3xl font-black mt-2">B2B Purchasing Terminal</h1>
            <p className="text-xs md:text-sm text-blue-150 mt-1 max-w-xl font-medium">
              Source chemistry-certified harvests directly from authenticated cluster cooperatives. Track escrows, logistics milestones, and contract RFPs.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Orders", val: "2 Pending", icon: ShoppingBag, color: "text-blue-600 bg-blue-50" },
              { label: "Contract Areas", val: "150 Acres Active", icon: Handshake, color: "text-emerald-600 bg-emerald-50" },
              { label: "Verified Farms Active", val: `${MOCK_FARMERS.length} Enrolled`, icon: Users, color: "text-indigo-600 bg-indigo-50" },
              { label: "Escrow Deposit Balance", val: "₹18,25,000", icon: ShieldCheck, color: "text-teal-600 bg-teal-50" }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white border border-slate-201 rounded-2xl p-4 shadow-sm flex items-center justify-between">
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
            {/* Recommended farmers grid */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">High Reliability Farm Match</h3>
              <div className="space-y-3">
                {MOCK_FARMERS.slice(0, 3).map((f) => (
                  <div key={f.id} className="flex justify-between items-center border-b pb-3.5 border-slate-50 last:border-none">
                    <div className="flex gap-2.5 items-center">
                      <img src={f.avatar} alt="Avatar" className="w-9 h-9 rounded-full object-cover border" />
                      <div className="text-xs">
                        <span className="font-extrabold text-slate-805 block">{f.name}</span>
                        <span className="text-slate-450 block text-[10px]">{f.location}, {f.state}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-current" /> {f.rating}
                      </span>
                      <button 
                        onClick={() => {
                          setSelectedFarmer(f);
                          setActiveModule('farmers');
                        }}
                        className="text-brand text-xs font-bold hover:underline"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Alert notices */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Harvest Supply Alerts</h3>
              <div className="space-y-3">
                <div className="p-3.5 bg-emerald-50 border border-emerald-150 rounded-2xl text-[11px] text-emerald-900 leading-relaxed font-semibold">
                  <span className="font-bold uppercase block text-[10px]">Supply Surplus Alert : Wheat</span>
                  Wheat arrivals at Bathinda hub increased by 14% over projected levels. Escrow lock index lowered to spot ₹2,350/Qtl.
                </div>
                <div className="p-3.5 bg-blue-50 border border-blue-150 rounded-2xl text-[11px] text-blue-900 leading-relaxed font-semibold">
                  <span className="font-bold uppercase block text-[10px]">Contract Opportunity</span>
                  Farmers Alliance of Sangli submitted a pool of 80 acres of Sugarcane harvest under 10% chemical footprint.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. VERIFIED FARMERS DISCOVERY */}
      {activeModule === 'farmers' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-800">Verified Crop Suppliers</h2>
              <p className="text-xs text-slate-400">Query and direct message authentic bulk farm suppliers</p>
            </div>
            {/* Crop filter */}
            <div className="flex flex-wrap gap-2 text-xs">
              {['All', 'Rice', 'Wheat', 'Sugarcane', 'Mustard', 'Ginger'].map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCropFilter(crop)}
                  className={`px-3 py-1 border rounded-full font-bold transition-all ${
                    selectedCropFilter === crop ? 'bg-brand text-white border-brand' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search farmer name, district, state..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-600 focus:outline-none focus:border-brand"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarmers.map((f) => (
              <div key={f.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="flex gap-3 justify-between items-start">
                  <div className="flex gap-3">
                    <img src={f.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-sm text-slate-800">{f.name}</span>
                        {f.verified && <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Verified</span>}
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" /> {f.location}, {f.state}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5"><Star className="w-3.5 h-3.5 fill-current" /> {f.rating}</span>
                </div>

                <div className="space-y-1.5 py-2.5 border-t border-b border-dashed border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Crops</span>
                    <span className="font-bold text-slate-700">{f.crops.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Land size</span>
                    <span className="font-bold text-slate-700">{f.landSize}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const prod = MOCK_PRODUCE.find(p => p.farmerId === f.id);
                      if (prod) {
                        setCheckoutProduce(prod);
                        setActiveModule('orders');
                      } else {
                        alert("No public listings available at the moment. Send B2B proposal.");
                      }
                    }}
                    className="flex-1 bg-brand text-white font-extrabold text-[11px] py-2 rounded-xl text-center"
                  >
                    View Harvests
                  </button>
                  <button 
                    onClick={() => alert(`Direct consultant channel opened for ${f.name}`)}
                    className="border border-slate-200 text-slate-600 font-bold px-3 py-2 rounded-xl text-[11px]"
                  >
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. AI SUPPLIER RECOMMENDATION */}
      {activeModule === 'ai-recommend' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-800">AI Supplier Match Recommendations</h2>
            <p className="text-xs text-slate-400">Match score logs balancing price, rating volatility, and truck proximity</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Rajender Prasad Singh (Wheat, Punjab)", score: 98, reason: "Excellent matching: Crop variety (Pusa 1121) chemistry certificate audit resolved, distance to logistics center is 12km, zero claims disputes history.", rating: 4.8 },
              { name: "Ankita Kulkarni (Sugarcane, Sangli)", score: 94, reason: "Excellent matching: 20-tonne sugarcane ready, pesticide levels recorded as 98% organic residue matching your criteria, 99% delivery history.", rating: 4.9 }
            ].map((ai, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50/30 to-white border border-blue-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-3.5 border-b border-slate-100">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 leading-snug">{ai.name}</h3>
                    <span className="text-[10px] text-slate-405 block mt-0.5">Rating: {ai.rating}/5.0</span>
                  </div>
                  <span className="text-[20px] font-black text-blue-600 block">{ai.score}% Suitability Match</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{ai.reason}</p>
                <div className="flex justify-end">
                  <button 
                    onClick={() => setActiveModule('farmers')}
                    className="bg-brand text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                  >
                    Negotiate Contract
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. QUALITY & TRANSPARENCY REPORTS */}
      {activeModule === 'reports' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-850">Quality & Traceability Certificates</h2>
            <p className="text-xs text-slate-400">Download soil nutrient ledgers and trace harvest paths from origin field</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Lab scorecard */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 h-fit">
              <h3 className="font-bold text-sm text-slate-805">Crop Lab Scorecard</h3>
              <div className="text-center py-4 border-b border-slate-105">
                <span className="text-[10px] uppercase font-bold text-slate-400">Pesticide Footprint Score</span>
                <span className="block text-4xl font-extrabold text-brand-dark">A+ Category</span>
                <span className="text-[10px] font-bold text-emerald-600 block mt-1">98.5% Organic Residue Clean</span>
              </div>
              
              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex justify-between">
                  <span>Moisture Grade</span>
                  <span className="text-slate-800">10.4% (Optimal)</span>
                </div>
                <div className="flex justify-between">
                  <span>Foreign Matter</span>
                  <span className="text-slate-800">0.2% (Premium)</span>
                </div>
                <div className="flex justify-between">
                  <span>Aadhaar KYC verified</span>
                  <span className="text-emerald-600 font-bold">Passed</span>
                </div>
              </div>
            </div>

            {/* Traceability map */}
            <div className="lg:col-span-2 bg-white border border-slate-205 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Farm-to-Table Traceability Timeline</h3>
              <div className="relative pl-6 space-y-5">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-brand/30"></div>
                {[
                  { title: "Sowing & Seed Audit", desc: "Pusa Basmati-1509 certified breeder seeds logged in Punjab farm registry.", date: "April 2026" },
                  { title: "Soil Nutrient Ledger", desc: "NPK ratios recorded as 280:60:60. Zero synthetic nitrogen residue checked.", date: "May 2026" },
                  { title: "Harvesting & APMC grading", desc: "Machine grade certificate tagged at Bhatinda APMC yard. Clean rank A+.", date: "June 2026" },
                  { title: "Secured Pickup Dispatch", desc: "Freight carrier vehicle logistics lock confirmed. Cargo lock enabled.", date: "July 2026" }
                ].map((step, idx) => (
                  <div key={idx} className="relative text-xs">
                    <span className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full bg-brand border-2 border-white"></span>
                    <span className="font-extrabold text-slate-800 block">{step.title}</span>
                    <p className="text-slate-450 block text-[11px] leading-relaxed mt-0.5">{step.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block font-semibold">{step.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ORDERING & PAYMENTS */}
      {activeModule === 'orders' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-800">Secure Escrow Procurement</h2>
            <p className="text-xs text-slate-400">Establish escrow deposits to guarantee payouts on delivery verification</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Produce detail */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Listing Reference Details</h3>
              <div className="border border-slate-100 p-4 rounded-2xl bg-slate-50 space-y-2">
                <span className="text-[9px] uppercase font-bold text-slate-400 bg-brand-light text-brand px-2 py-0.5 rounded">Harvest List: P001</span>
                <span className="block font-black text-slate-800">Basmati Rice (Pusa 1121)</span>
                <span className="block text-xs font-bold text-slate-600">Farmer: Rajender Prasad Singh</span>
                <span className="block text-xs font-bold text-slate-605">Standard Grade: A+</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Current Available Qty</span>
                  <span className="font-bold text-slate-800">18 Tonnes</span>
                </div>
                <div className="flex justify-between">
                  <span>Mandi Price Point</span>
                  <span className="font-bold text-slate-800">₹4,200/Quintal</span>
                </div>
              </div>
            </div>

            {/* Escrow Pay form */}
            <div className="lg:col-span-2 bg-white border border-slate-205 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800">Commit Secure Purchase</h3>
              <form onSubmit={handleCreateOrder} className="space-y-4 text-xs font-semibold text-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Qty (Tonnes)</label>
                    <input 
                      type="number" 
                      value={purchaseQty}
                      onChange={(e) => setPurchaseQty(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Escrow Price Point</label>
                    <input 
                      type="text" 
                      disabled
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-400"
                      value="₹4,200/Quintal"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Shipping Warehouse Destination</label>
                  <input 
                    type="text" 
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
                  />
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-1.5 text-slate-650">
                  <div className="flex justify-between">
                    <span>Base Amount (Payable value)</span>
                    <span>₹{purchaseQty * 4200 * 10}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Logistics carriage quote</span>
                    <span>₹15,000</span>
                  </div>
                  <div className="flex justify-between text-slate-800 font-extrabold text-sm border-t pt-2">
                    <span>Total Target Escrow Deposit</span>
                    <span>₹{(purchaseQty * 4200 * 10) + 15000}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand text-white font-extrabold py-3 shadow-md rounded-xl text-center text-xs"
                >
                  {isOrdering ? "Transferring to payment gateway..." : "Confirm Escrow Ledger Match"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 5. REAL-TIME SHIPMENT TRACKING */}
      {activeModule === 'tracking' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-800">Shipment Milestone Tracking</h2>
            <p className="text-xs text-slate-407">Verify shipment locations, carrier temperatures, and road ETA logs</p>
          </div>

          <div className="space-y-4">
            {MOCK_SHIPMENTS.map((s) => (
              <div key={s.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-start border-b pb-3.5 border-slate-100 text-xs">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800">{s.cropName} ({s.quantity})</h3>
                    <p className="text-slate-400 text-[10px] mt-0.5">Carrier Partner: {s.partner} | Transit ID: {s.id}</p>
                  </div>
                  <div className="text-right font-semibold">
                    <span className="text-brand uppercase block">{s.status}</span>
                    <span className="text-[10px] text-slate-450 block mt-0.5">ETA: {s.eta}</span>
                  </div>
                </div>

                {/* Milestone details */}
                <div className="grid md:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Current milestone</span>
                    <p className="text-slate-800 text-[11px] mt-0.5">{s.currentMilestone}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Road Carrier</span>
                    <p className="text-slate-800 text-[11px] mt-0.5">{s.driver}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Device Temperature</span>
                    <p className="text-emerald-600 text-[11px] mt-0.5 font-bold">18°C (Cool Chain Safe)</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Target Destination</span>
                    <p className="text-slate-800 text-[11px] mt-0.5">Mumbai Port Trust Warehouse</p>
                  </div>
                </div>

                {/* Timeline map path */}
                <div className="relative pt-6 pb-2 px-6">
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-100"></div>
                  <div className="absolute left-6 right-1/3 top-1/2 -translate-y-1/2 h-1 bg-brand"></div>
                  <div className="flex justify-between items-center relative z-10 text-[9px] font-bold text-slate-450 uppercase">
                    {s.path.map((p, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <span className={`w-5 h-5 rounded-full ${
                          i <= 2 ? 'bg-brand text-white border-2 border-white' : 'bg-slate-200'
                        } flex items-center justify-center text-[8px]`}>
                          {i <= 2 ? '✓' : ''}
                        </span>
                        <span className={`mt-1.5 ${i <= 2 ? 'text-brand' : 'text-slate-400'}`}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SUPPORT & DISPUTE RESOLUTION */}
      {activeModule === 'support' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-850">Claims & Dispute Workspace</h2>
            <p className="text-xs text-slate-400">Establish arbitration claims matching weight reports or chemical analysis logs</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-205 rounded-3xl p-5 shadow-sm space-y-4 h-fit">
              <h3 className="font-bold text-sm text-slate-800">Initiate Escalation Ticket</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!issueSummary) return;
                  setTickets(prev => [
                    {
                      id: `T-${Date.now()}`,
                      cropName: 'Paddy Basmati Lot B',
                      issue: issueSummary,
                      date: new Date().toISOString().split('T')[0],
                      status: 'Pending Review',
                      timeline: ['Raised by Buyer']
                    },
                    ...prev
                  ]);
                  setIssueSummary('');
                  alert("Arbitration claim log successfully registered.");
                }}
                className="space-y-4 text-xs font-semibold text-slate-700"
              >
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Issue Category</label>
                  <select className="w-full bg-slate-55 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold">
                    <option>Chemical Footprints (Organic threshold excess)</option>
                    <option>Weight Volatility (Discrepancy in check weight)</option>
                    <option>Logistics Delay (Perish risk threshold breached)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Detail claims summary</label>
                  <textarea 
                    value={issueSummary}
                    onChange={(e) => setIssueSummary(e.target.value)}
                    placeholder="Provide specific parameters (e.g. moisture test read: 14.5%)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 h-24"
                  />
                </div>
                <button type="submit" className="w-full bg-brand text-white font-extrabold py-2.5 rounded-xl text-center">
                  Submit Claim Ticket
                </button>
              </form>
            </div>

            {/* Ticket list */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Escalation Archive</h3>
              <div className="space-y-4">
                {tickets.map((t) => (
                  <div key={t.id} className="border border-slate-105 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-slate-800">{t.cropName}</span>
                      <span className="text-[9px] uppercase font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        {t.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">{t.issue}</p>
                    <div className="flex gap-2 flex-wrap items-center mt-2.5 pt-2 border-t text-[10px] text-slate-400">
                      <span>Logged: {t.date}</span>
                      <span>•</span>
                      <span>Timeline: {t.timeline.join(' → ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. CONTRACT FARMING / BULK ORDERS */}
      {activeModule === 'contracts' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-800">Contract Farming & Bulk RFPs</h2>
            <p className="text-xs text-slate-400">Lock down production yields by matching farmers to area grids</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Create Proposal */}
            <div className="bg-white border border-slate-202 rounded-3xl p-5 shadow-sm space-y-4 h-fit">
              <h3 className="font-bold text-sm text-slate-800">Launch Bulk Proposal</h3>
              <form onSubmit={handleCreateContract} className="space-y-3.5 text-xs text-slate-700">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Crop type</label>
                  <input 
                    type="text" 
                    value={newContractForm.cropName}
                    onChange={(e) => setNewContractForm(prev => ({ ...prev, cropName: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Required Area</label>
                    <input 
                      type="text" 
                      value={newContractForm.area}
                      onChange={(e) => setNewContractForm(prev => ({ ...prev, area: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Price Lock Rate</label>
                    <input 
                      type="text" 
                      value={newContractForm.priceLocked}
                      onChange={(e) => setNewContractForm(prev => ({ ...prev, priceLocked: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Escrow & Quality Terms</label>
                  <textarea 
                    value={newContractForm.terms}
                    onChange={(e) => setNewContractForm(prev => ({ ...prev, terms: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 h-20"
                  />
                </div>
                <button type="submit" className="w-full bg-brand text-white font-extrabold py-2.5 rounded-xl text-center">
                  Publish RFP Proposal
                </button>
              </form>
            </div>

            {/* Proposals list */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Current B2B Agreements</h3>
              <div className="space-y-4">
                {contracts.map((c) => (
                  <div key={c.id} className="border border-slate-105 rounded-2xl p-5 space-y-3.5 hover:border-brand-accent/50 transition-colors">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">{c.duration}</span>
                        <h4 className="font-extrabold text-slate-805 mt-0.5">{c.cropName} Contract ({c.area})</h4>
                      </div>
                      <span className={`inline-block text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                        c.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-dashed border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 block select-none">Locked Price Rate</span>
                        <span className="font-extrabold text-slate-700 block mt-0.5">{c.priceLocked}</span>
                      </div>
                      <div>
                        <span className="text-slate-450 block select-none">Quality Standard</span>
                        <span className="font-extrabold text-slate-700 block mt-0.5">{c.terms}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Default/Not Found module */}
      {!['home', 'farmers', 'ai-recommend', 'reports', 'orders', 'tracking', 'contracts', 'support'].includes(activeModule) && (
        <div className="text-center py-20">
          <p className="text-xs text-slate-400 select-none">Select a module from the sidebar workspace menu.</p>
        </div>
      )}
    </div>
  );
}
