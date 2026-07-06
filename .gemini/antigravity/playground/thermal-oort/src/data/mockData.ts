// Indian agritech mock data for the AI-Powered Smart Agriculture Ecosystem

export interface Farmer {
  id: string;
  name: string;
  location: string;
  district: string;
  state: string;
  rating: number;
  phone: string;
  avatar: string;
  crops: string[];
  verified: boolean;
  landSize: string;
}

export interface Buyer {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  ordersCount: number;
  verified: boolean;
  interests: string[];
}

export interface ProduceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  variety: string;
  quantity: number; // in Tonnes
  pricePerQuintal: number; // in INR
  grade: 'A+' | 'A' | 'B' | 'C';
  harvestDate: string;
  images: string[];
  status: 'Available' | 'Pending' | 'Sold';
  location: string;
}

export const MOCK_FARMERS: Farmer[] = [
  { id: 'F001', name: 'Rajender Prasad Singh', location: 'Bhatinda', district: 'Bathinda', state: 'Punjab', rating: 4.8, phone: '+91 98765 43210', avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150', crops: ['Wheat', 'Rice', 'Sugarcane'], verified: true, landSize: '15 Acres' },
  { id: 'F002', name: 'Kishan Lal Yadav', location: 'Alwar', district: 'Alwar', state: 'Rajasthan', rating: 4.6, phone: '+91 98765 89012', avatar: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=150', crops: ['Mustard', 'Maize', 'Bajra'], verified: true, landSize: '8 Acres' },
  { id: 'F003', name: 'Ankita Kulkarni', location: 'Sangli', district: 'Sangli', state: 'Maharashtra', rating: 4.9, phone: '+91 98555 76543', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', crops: ['Grapes', 'Sugarcane', 'Pomegranate'], verified: true, landSize: '12 Acres' },
  { id: 'F004', name: 'Chandra Reddy', location: 'Guntur', district: 'Guntur', state: 'Andhra Pradesh', rating: 4.5, phone: '+91 97000 12345', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150', crops: ['Chilli', 'Cotton', 'Rice'], verified: false, landSize: '5 Acres' },
  { id: 'F005', name: 'Ramesh Sonowal', location: 'Dibrugarh', district: 'Dibrugarh', state: 'Assam', rating: 4.7, phone: '+91 99333 44556', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', crops: ['Tea', 'Rice', 'Ginger'], verified: true, landSize: '20 Acres' }
];

export const MOCK_BUYERS: Buyer[] = [
  { id: 'B001', name: 'Amit Desai', company: 'Organic Foods India Ltd', location: 'Mumbai, MH', rating: 4.7, ordersCount: 142, verified: true, interests: ['Wheat', 'Rice', 'Tea'] },
  { id: 'B002', name: 'Vikram Grover', company: 'Groco Retail Chain', location: 'Delhi NCR', rating: 4.5, ordersCount: 98, verified: true, interests: ['Tomato', 'Potato', 'Onion', 'Grapes'] },
  { id: 'B003', name: 'Srinivas Murthy', company: 'South Agri Exporters', location: 'Chennai, TN', rating: 4.9, ordersCount: 220, verified: true, interests: ['Chilli', 'Rice', 'Sugarcane'] }
];

export const MOCK_PRODUCE: ProduceListing[] = [
  { id: 'P001', farmerId: 'F001', farmerName: 'Rajender Prasad Singh', cropName: 'Paddy (Basmati Rice)', variety: 'Pusa 1121', quantity: 18, pricePerQuintal: 4200, grade: 'A+', harvestDate: '2026-06-28', images: [], status: 'Available', location: 'Bhatinda Mandi, PB' },
  { id: 'P002', farmerId: 'F002', farmerName: 'Kishan Lal Yadav', cropName: 'Mustard Seeds', variety: 'Pusa Bold', quantity: 9, pricePerQuintal: 5800, grade: 'A', harvestDate: '2026-06-25', images: [], status: 'Available', location: 'Alwar APMC, RJ' },
  { id: 'P003', farmerId: 'F003', farmerName: 'Ankita Kulkarni', cropName: 'Sugarcane', variety: 'Co 86032', quantity: 50, pricePerQuintal: 3100, grade: 'A', harvestDate: '2026-07-02', images: [], status: 'Available', location: 'Sangli Mill, MH' },
  { id: 'P004', farmerId: 'F004', farmerName: 'Chandra Reddy', cropName: 'Red Chilli', variety: 'Guntur Sannam', quantity: 4, pricePerQuintal: 18500, grade: 'B', harvestDate: '2026-06-15', images: [], status: 'Pending', location: 'Guntur Yard, AP' },
  { id: 'P005', farmerId: 'F005', farmerName: 'Ramesh Sonowal', cropName: 'Ginger', variety: 'Nadia', quantity: 6, pricePerQuintal: 8200, grade: 'A+', harvestDate: '2026-07-04', images: [], status: 'Available', location: 'Dibrugarh Mandi, AS' }
];

// Price forecasting data for Recharts (Crop Price Prediction)
export const MOCK_PRICE_FORECAST = {
  Rice: [
    { month: 'Jan', currentPrice: 3800, forecastPrice: 3850 },
    { month: 'Feb', currentPrice: 3900, forecastPrice: 3950 },
    { month: 'Mar', currentPrice: 4100, forecastPrice: 4050 },
    { month: 'Apr', currentPrice: 4200, forecastPrice: 4180 },
    { month: 'May', currentPrice: 4250, forecastPrice: 4300 },
    { month: 'Jun', currentPrice: 4300, forecastPrice: 4400 },
    { month: 'Jul', currentPrice: 4450, forecastPrice: 4500 },
    { month: 'Aug', currentPrice: null, forecastPrice: 4580 },
    { month: 'Sep', currentPrice: null, forecastPrice: 4620 },
    { month: 'Oct', currentPrice: null, forecastPrice: 4700 },
    { month: 'Nov', currentPrice: null, forecastPrice: 4650 },
    { month: 'Dec', currentPrice: null, forecastPrice: 4800 }
  ],
  Wheat: [
    { month: 'Jan', currentPrice: 2200, forecastPrice: 2250 },
    { month: 'Feb', currentPrice: 2250, forecastPrice: 2300 },
    { month: 'Mar', currentPrice: 2300, forecastPrice: 2350 },
    { month: 'Apr', currentPrice: 2400, forecastPrice: 2450 },
    { month: 'May', currentPrice: 2450, forecastPrice: 2400 },
    { month: 'Jun', currentPrice: 2420, forecastPrice: 2430 },
    { month: 'Jul', currentPrice: 2480, forecastPrice: 2500 },
    { month: 'Aug', currentPrice: null, forecastPrice: 2550 },
    { month: 'Sep', currentPrice: null, forecastPrice: 2600 },
    { month: 'Oct', currentPrice: null, forecastPrice: 2680 },
    { month: 'Nov', currentPrice: null, forecastPrice: 2750 },
    { month: 'Dec', currentPrice: null, forecastPrice: 2800 }
  ],
  Tomato: [
    { month: 'Jan', currentPrice: 1500, forecastPrice: 1600 },
    { month: 'Feb', currentPrice: 1200, forecastPrice: 1250 },
    { month: 'Mar', currentPrice: 1100, forecastPrice: 1150 },
    { month: 'Apr', currentPrice: 1300, forecastPrice: 1320 },
    { month: 'May', currentPrice: 1800, forecastPrice: 2200 },
    { month: 'Jun', currentPrice: 3200, forecastPrice: 3500 },
    { month: 'Jul', currentPrice: 4500, forecastPrice: 4600 },
    { month: 'Aug', currentPrice: null, forecastPrice: 3800 },
    { month: 'Sep', currentPrice: null, forecastPrice: 2800 },
    { month: 'Oct', currentPrice: null, forecastPrice: 2000 },
    { month: 'Nov', currentPrice: null, forecastPrice: 1800 },
    { month: 'Dec', currentPrice: null, forecastPrice: 1600 }
  ]
};

// Weather mock structure
export const MOCK_WEATHER = {
  currentTemp: 32,
  humidity: '68%',
  rainfallChance: '15%',
  windSpeed: '12 km/h',
  condition: 'Partly Cloudy',
  advisory: 'Optimal weather for fertilizer application today. Rainfall expected in 48 hours. Suggest holding irrigation schedule till Wednesday.',
  pestRisk: 'MODERATE (Rice Stem Borer threat detected in neighboring sub-districts). Keep moisture regulated.',
  forecast: [
    { day: 'Mon', temp: 32, condition: 'Partly Cloudy', rain: 15 },
    { day: 'Tue', temp: 31, condition: 'Light Rain', rain: 60 },
    { day: 'Wed', temp: 29, condition: 'Thunderstorm', rain: 85 },
    { day: 'Thu', temp: 30, condition: 'Patchy Clouds', rain: 20 },
    { day: 'Fri', temp: 32, condition: 'Sunny', rain: 5 },
    { day: 'Sat', temp: 33, condition: 'Sunny', rain: 0 },
    { day: 'Sun', temp: 34, condition: 'Humid Overcast', rain: 10 }
  ]
};

// Soil Health analysis
export const MOCK_SOIL = {
  overallScore: 84, // out of 100
  levels: {
    nitrogen: { val: 185, status: 'Deficient', optimalRange: '280-560 kg/ha', color: 'text-amber-600' },
    phosphorus: { val: 24, status: 'Optimal', optimalRange: '10-25 kg/ha', color: 'text-emerald-600' },
    potassium: { val: 290, status: 'High', optimalRange: '137-337 kg/ha', color: 'text-blue-600' },
    ph: { val: 6.4, status: 'Slightly Acidic', optimalRange: '6.0-7.5', color: 'text-violet-600' },
    moisture: { val: '42%', status: 'Optimal', optimalRange: '35%-50%', color: 'text-emerald-600' }
  },
  advice: [
    'Apply Nitrogen-based fertilizer (e.g. Urea, 50kg/acre) during early morning.',
    'Avoid adding extra rock phosphate as Phosphorus levels are already high-optimal.',
    'Implement crop rotation with leguminous crops after harvest to replenish nitrogen naturally.'
  ],
  fields: [
    { id: 'FLD1', name: 'North Wheat Field', score: 84, activeCrop: 'Wheat' },
    { id: 'FLD2', name: 'South Paddy Field', score: 72, activeCrop: 'Paddy' },
    { id: 'FLD3', name: 'West Fruit Orchard', score: 91, activeCrop: 'Grapes' }
  ]
};

// Crop Disease Scan Result History
export const MOCK_CROP_SCANS = [
  { id: 'SCN001', crop: 'Tomato', disease: 'Early Blight', confidence: 94.2, severity: 'MODERATE', date: '2026-07-04', image: '', status: 'Treated', treatment: 'Spray Chlorothalonil fungicide (0.2%) and prune infected lower branches to check spread.' },
  { id: 'SCN002', crop: 'Rice', disease: 'Bacterial Leaf Blight', confidence: 88.5, severity: 'SEVERE', date: '2026-07-06', image: '', status: 'Action Required', treatment: 'Drain field excess water. Apply Copper Hydroxide (2.0g/L) mixed with Streptocycline (0.1g/L).' },
  { id: 'SCN003', crop: 'Potato', disease: 'Healthy Leaf', confidence: 99.1, severity: 'NONE', date: '2026-06-20', image: '', status: 'Resolved', treatment: 'No disease detected. Continue normal crop monitoring.' }
];

// Government Schemes
export const MOCK_SCHEMES = [
  { id: 'SCH001', name: 'PM Kisan Samman Nidhi', benefits: '₹6,000 per year in 3 installments direct to bank', eligibility: 'All landholding farmer families', documents: ['Aadhaar Card', 'Land Registry papers', 'Bank Passbook'], status: 'Approved', appProgress: 100 },
  { id: 'SCH002', name: 'PM Fasal Bima Yojana (PMFBY)', benefits: 'Comprehensive crop insurance against natural calamities', eligibility: 'All farmers growing notified crops', documents: ['Land Record', 'Sowing Certificate', 'Aadhaar Card'], status: 'Under Review', appProgress: 60 },
  { id: 'SCH003', name: 'Sub-Mission on Agricultural Mechanization (SMAM)', benefits: '40% to 50% subsidy on buying modern farm machinery', eligibility: 'Individual farmers and self-help groups', documents: ['Aadhaar Card', 'Machinery Quotation', 'Soil Test Report'], status: 'Eligible - Apply Now', appProgress: 0 }
];

// Logistics Shipments
export const MOCK_SHIPMENTS = [
  { id: 'SHP101', listingId: 'P001', cropName: 'Paddy (Basmati)', quantity: '18 Tonnes', buyer: 'Amit Desai (Organic Foods India)', partner: 'AgriLogix Solutions', driver: 'Gurpreet Singh', driverPhone: '+91 99998 88877', eta: '2026-07-08, 17:00', status: 'In Transit', currentMilestone: 'Dispatched Bhatinda Mandi', path: ['Bhatinda Hub', 'Ludhiana Junction', 'Delhi Transit', 'Mumbai Warehouse'] },
  { id: 'SHP102', listingId: 'P003', cropName: 'Sugarcane', quantity: '50 Tonnes', buyer: 'Srinivas Murthy (South Agri Exporters)', partner: 'Safexpress Agri', driver: 'Nagesh Rao', driverPhone: '+91 88887 77766', eta: '2026-07-07, 10:00', status: 'Out for Pickup', currentMilestone: 'Truck assigned to Sangli Farm', path: ['Sangli Mill Yard', 'Kolhapur Transit', 'Chennai Port'] }
];

// Expert Consultation and Query Inbox
export const MOCK_QUERIES = [
  { id: 'QRY301', farmerName: 'Ramesh Sonowal', crop: 'Ginger', query: 'My ginger rhizomes show white rot and leaves are drying from margins. Is it fungal?', date: '2026-07-06', urgency: 'URGENT', status: 'Pending', replies: [] },
  { id: 'QRY302', farmerName: 'Kishan Lal Yadav', crop: 'Mustard', query: 'What is the recommended seed rate for mustard crop in sandy soil of Rajasthan?', date: '2026-07-05', urgency: 'ROUTINE', status: 'Replied', replies: ['Use 1.5 - 2.0 kg seeds per acre. Maintain line-to-line spacing of 30cm and depth of 5cm. Ensure pre-sowing irrigation.'] }
];

export const MOCK_ADVISORIES = [
  { id: 'ADV501', title: 'Managing Early Blight in Solanaceous Crops', crop: 'Tomato/Potato', author: 'Dr. Ramesh Chandra (Senior Plant Pathologist)', date: '2026-07-02', reads: 1420, summary: 'A comprehensive guide on biological and chemical mitigation techniques for Early Blight including preventive layout spacing.' },
  { id: 'ADV502', title: 'Sustainable Water Conservation inside Grapes Vineyards', crop: 'Grapes', author: 'Prof. Ankita Kulkarni (Viticluture Expert)', date: '2026-06-29', reads: 980, summary: 'Harnessing drip irrigation frequency optimization protocols together with mulch layer optimization metrics.' }
];

export const MOCK_APPOINTMENTS = [
  { id: 'APT801', farmerName: 'Rajender Prasad Singh', time: 'Today, 15:30 PM', channel: 'Video Call', status: 'Scheduled', details: 'Consultation about secondary crop rot remedies' },
  { id: 'APT802', farmerName: 'Chandra Reddy', time: 'Tomorrow, 11:00 AM', channel: 'Voice Advisory', status: 'Scheduled', details: 'Cotton pest management prescription' }
];

// Buyer contract agreement
export const MOCK_CONTRACTS = [
  { id: 'CTR001', buyerName: 'Organic Foods India Ltd', cropName: 'Basmati Rice', area: '100 Acres', priceLocked: '₹4,500/Quintal', duration: 'Kharif Season 2026', terms: 'Requires organic certification. 40% advance payment, remaining on delivery validation.', status: 'Active' },
  { id: 'CTR002', buyerName: 'Groco Retail Chain', cropName: 'Potato (Jyoti)', area: '50 Acres', priceLocked: '₹1,500/Quintal', duration: 'Rabi Season 2026-27', terms: 'Size requirement 45mm+. Grade A quality report validation required.', status: 'Proposed' }
];

// Admin Platform Analytics
export const MOCK_PLATFORM_STATS = {
  users: { farmers: 12450, buyers: 380, experts: 56, admins: 8 },
  activeOrders: 182,
  monthlyRevenue: 3820000, // INR
  lossPercent: 8.4, // post harvest loss
  mandiPriceVolatility: 'Low-Medium',
  diseaseOutbreakAlerts: 32, // total instances flagged by AI globally
  platformHealth: '99.94%',
  transactionHistory: [
    { month: 'Jan', volume: 1800000, orders: 120 },
    { month: 'Feb', volume: 2200000, orders: 152 },
    { month: 'Mar', volume: 2900000, orders: 190 },
    { month: 'Apr', volume: 3400000, orders: 210 },
    { month: 'May', volume: 3100000, orders: 180 },
    { month: 'Jun', volume: 3900000, orders: 245 }
  ],
  diseaseClusters: [
    { id: 'CL1', region: 'Bathinda, Punjab', crop: 'Rice', disease: 'BL Blight', cases: 14, severity: 'HIGH' },
    { id: 'CL2', region: 'Sangli, Maharashtra', crop: 'Grapes', disease: 'Downy Mildew', cases: 8, severity: 'MEDIUM' },
    { id: 'CL3', region: 'Guntur, Andhra Pradesh', crop: 'Chilli', disease: 'Thrips/Mites', cases: 19, severity: 'HIGH' }
  ]
};

// AI Chatbot knowledge base mapping
export const BOT_RESPONSES: Record<string, string> = {
  'leaf-yellow': 'Yellowing leaves (chlorosis) usually indicates nitrogen deficiency, waterlogging, or spider mite infestation. If yellowing is on lower older leaves, apply Urea/Nitrogen. If on new leaves, check for trace element deficiency (Iron/Zinc).',
  'paddy-fertilizer': 'For paddy: Apply Nitrogen, Phosphorus, Potassium (NPK) in a 120:60:60 kg/ha ratio. Split Nitrogen doses: 50% at transplanting, 25% at active tillering, and 25% at panicle initiation.',
  'irrigate-week': 'Looking at your weather forecast: A light rain is expected tomorrow (60% chance) and a thunderstorm on Wednesday (85%). It is highly recommended to suspend irrigation for 48 hours to prevent waterlogging.',
  'default': 'Welcome to the Smart Agri AI Advisor! I can assist with pest control recipes, mandi prices, satellite soil readouts, or weather risks. Feel free to type your question below.'
};
