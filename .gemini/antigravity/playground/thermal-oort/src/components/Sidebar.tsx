import React from 'react';
import { 
  Sprout, Sparkles, Leaf, TrendingUp, CloudSun, Beaker, CheckSquare, 
  ShoppingBag, Landmark, MessageSquare, Briefcase, Users, FileText, 
  Truck, HelpCircle, Settings, ShieldAlert, BarChart3, AlertTriangle, 
  BookOpen, Inbox, History, PieChart, Activity
} from 'lucide-react';

interface SidebarProps {
  currentRole: 'Farmer' | 'Buyer' | 'Admin' | 'Expert' | 'Landing' | 'Auth';
  activeModule: string;
  setActiveModule: (val: string) => void;
  isCollapsed: boolean;
}

export default function Sidebar({
  currentRole,
  activeModule,
  setActiveModule,
  isCollapsed
}: SidebarProps) {
  
  // Sidebar config for Farmers
  const farmerLinks = [
    { id: 'home', label: 'Summary Dashboard', icon: Sprout },
    { id: 'scan', label: 'AI Crop Disease Detect', icon: Leaf },
    { id: 'price', label: 'Crop Price Forecast', icon: TrendingUp },
    { id: 'weather', label: 'Weather & Climate', icon: CloudSun },
    { id: 'soil', label: 'Soil Health Tracker', icon: Beaker },
    { id: 'advice', label: 'Smart Recommendations', icon: CheckSquare },
    { id: 'shop', label: 'Resource Shop', icon: ShoppingBag },
    { id: 'sell', label: 'Direct Marketplace', icon: Briefcase },
    { id: 'logistics', label: 'Logistics & Pickups', icon: Truck },
    { id: 'schemes', label: 'Govt Schemes', icon: Landmark }
  ];

  // Sidebar config for B2B Buyers
  const buyerLinks = [
    { id: 'home', label: 'Overview Dashboard', icon: BarChart3 },
    { id: 'farmers', label: 'Verified Farms', icon: Users },
    { id: 'ai-recommend', label: 'AI Supplier Match', icon: Sparkles },
    { id: 'reports', label: 'Quality & Traceability', icon: FileText },
    { id: 'orders', label: 'Secure Procurement', icon: ShoppingBag },
    { id: 'tracking', label: 'Shipment Tracking', icon: Truck },
    { id: 'contracts', label: 'Contract Farming', icon: Landmark },
    { id: 'support', label: 'Disputes & Support', icon: HelpCircle }
  ];

  // Sidebar config for Administrators
  const adminLinks = [
    { id: 'home', label: 'Telemetry Overview', icon: Activity },
    { id: 'market-analytics', label: 'Market Prices & Volatility', icon: TrendingUp },
    { id: 'demand-supply', label: 'Demand Forecasting', icon: PieChart },
    { id: 'disease-monitor', label: 'Disease Flag Heatmap', icon: ShieldAlert },
    { id: 'loss-estimate', label: 'Harvest Loss Meters', icon: AlertTriangle },
    { id: 'transactions', label: 'Revenue & GMV Charts', icon: BarChart3 },
    { id: 'scheme-metrics', label: 'Scheme Adoption Logs', icon: Landmark }
  ];

  // Sidebar config for Agri Experts
  const expertLinks = [
    { id: 'home', label: 'Control Center', icon: Activity },
    { id: 'inbox', label: 'Farmer Query Inbox', icon: Inbox },
    { id: 'recommender', label: 'Advisory Engine', icon: Sparkles },
    { id: 'knowledge', label: 'Knowledge Publisher', icon: BookOpen },
    { id: 'cases', label: 'Case Histories', icon: History }
  ];

  const getLinks = () => {
    switch (currentRole) {
      case 'Farmer': return farmerLinks;
      case 'Buyer': return buyerLinks;
      case 'Admin': return adminLinks;
      case 'Expert': return expertLinks;
      default: return [];
    }
  };

  const links = getLinks();

  if (currentRole === 'Landing' || currentRole === 'Auth') return null;

  return (
    <aside className={`bg-gradient-to-b from-brand-dark to-slate-900 text-white flex flex-col transition-all duration-300 border-r border-slate-800 ${
      isCollapsed ? 'w-16' : 'w-64'
    } shrink-0 h-[calc(100vh-4rem)] sticky top-16`}>
      
      {/* Brand area if not collapsed */}
      {!isCollapsed && (
        <div className="p-4 border-b border-white/10 bg-black/10">
          <div className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-brand-accent animate-pulse-soft" />
            <div>
              <span className="font-bold text-sm tracking-wide block uppercase">AgriEcosystem</span>
              <span className="text-[10px] text-brand-accent font-medium">Empower • Connect • Grow</span>
            </div>
          </div>
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex-1 py-4 overflow-y-auto space-y-1.5 px-3">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = activeModule === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActiveModule(link.id)}
              className={`w-full flex items-center gap-3.5 py-3.5 px-3.5 rounded-xl transition-all text-xs font-medium text-left ${
                isActive 
                  ? 'bg-brand text-white shadow-md shadow-brand-dark/50 border border-brand-accent/30' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              title={link.label}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="truncate">{link.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Support and settings links */}
      <div className="p-3 border-t border-white/10 bg-black/20 space-y-1">
        <button
          onClick={() => setActiveModule('notifications')}
          className={`w-full flex items-center gap-3.5 py-2.5 px-3.5 rounded-lg text-xs font-medium text-left ${
            activeModule === 'notifications' ? 'bg-brand text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <ShieldAlert className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Alert Center</span>}
        </button>
        <button
          onClick={() => setActiveModule('settings')}
          className={`w-full flex items-center gap-3.5 py-2.5 px-3.5 rounded-lg text-xs font-medium text-left ${
            activeModule === 'settings' ? 'bg-brand text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}
