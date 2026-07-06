import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthScreens from './components/AuthScreens';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';
import FarmerDashboard from './components/FarmerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import AdminDashboard from './components/AdminDashboard';
import ExpertDashboard from './components/ExpertDashboard';
import ExtraScreens from './components/ExtraScreens';

type AppState = 'landing' | 'auth' | 'app';
type RoleType = 'Farmer' | 'Buyer' | 'Admin' | 'Expert';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentRole, setCurrentRole] = useState<RoleType>('Farmer');
  const [activeModule, setActiveModule] = useState<string>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Custom screen views
  const [extraView, setExtraView] = useState<'profile' | 'settings' | 'notifications' | null>(null);

  // Chatbot drawer toggle
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Notifications bell trigger (simulated view)
  const handleOpenNotifications = () => {
    setExtraView('notifications');
    setActiveModule('');
  };

  const handleRoleChange = (role: 'Farmer' | 'Buyer' | 'Admin' | 'Expert' | 'Landing' | 'Auth') => {
    if (role === 'Landing') {
      setAppState('landing');
      setExtraView(null);
      return;
    }
    if (role === 'Auth') {
      setAppState('auth');
      setExtraView(null);
      return;
    }
    setCurrentRole(role);
    setExtraView(null);
    setActiveModule('home'); // Reset view to home of that role
  };

  const handleSidebarSelect = (moduleId: string) => {
    if (['profile', 'settings', 'notifications'].includes(moduleId)) {
      setExtraView(moduleId as any);
      setActiveModule('');
    } else {
      setExtraView(null);
      setActiveModule(moduleId);
    }
  };

  // Navigating from landing page triggers
  const handleStartSandbox = (role: RoleType) => {
    setCurrentRole(role);
    setExtraView(null);
    setActiveModule('home');
    setAppState('app');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-brand selection:text-white">
      
      {/* 1. LANDING PAGE STATE */}
      {appState === 'landing' && (
        <LandingPage 
          onGetStarted={() => setAppState('auth')}
          onExploreDemo={handleStartSandbox}
          onTalkToAI={() => setIsChatbotOpen(true)}
        />
      )}

      {/* 2. AUTHENTICATION SCREENS STATE */}
      {appState === 'auth' && (
        <AuthScreens 
          onSuccess={(role) => {
            // Role returned is lowercase from AuthScreens, let's map it safely
            const mappedRole: RoleType = 
              role === 'Buyer' ? 'Buyer' : 
              role === 'Admin' ? 'Admin' : 
              role === 'Expert' ? 'Expert' : 'Farmer';
            setCurrentRole(mappedRole);
            setExtraView(null);
            setActiveModule('home');
            setAppState('app');
          }}
          onGoBack={() => setAppState('landing')}
        />
      )}

      {/* 3. CORE MULTI-ROLE APPLICATION WORKSPACE */}
      {appState === 'app' && (
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Global Header */}
          <Navbar 
            currentRole={currentRole}
            setCurrentRole={handleRoleChange}
            isSidebarCollapsed={isSidebarCollapsed}
            setIsSidebarCollapsed={setIsSidebarCollapsed}
            onToggleChat={() => setIsChatbotOpen(prev => !prev)}
            onOpenNotifications={handleOpenNotifications}
          />

          <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar Left Navigation */}
            <Sidebar 
              currentRole={currentRole}
              activeModule={extraView || activeModule}
              setActiveModule={handleSidebarSelect}
              isCollapsed={isSidebarCollapsed}
            />

            {/* Dashboard Display Core Window */}
            <main className="flex-1 overflow-y-auto bg-slate-50 pb-16 md:pb-6">
              {extraView ? (
                <ExtraScreens 
                  viewType={extraView} 
                  currentRole={currentRole}
                  onLogout={() => {
                    setAppState('landing');
                    setActiveModule('home');
                    setExtraView(null);
                  }}
                />
              ) : (
                <>
                  {currentRole === 'Farmer' && (
                    <FarmerDashboard 
                      activeModule={activeModule}
                      setActiveModule={setActiveModule}
                      onTalkToAI={() => setIsChatbotOpen(true)}
                    />
                  )}
                  {currentRole === 'Buyer' && (
                    <BuyerDashboard 
                      activeModule={activeModule}
                      setActiveModule={setActiveModule}
                      onTalkToAI={() => setIsChatbotOpen(true)}
                    />
                  )}
                  {currentRole === 'Admin' && (
                    <AdminDashboard 
                      activeModule={activeModule}
                      setActiveModule={activeModule => setActiveModule(activeModule)}
                    />
                  )}
                  {currentRole === 'Expert' && (
                    <ExpertDashboard 
                      activeModule={activeModule}
                      setActiveModule={setActiveModule}
                    />
                  )}
                </>
              )}
            </main>
          </div>

          {/* AI Advisor Chatbot embedded overlay container */}
          {isChatbotOpen && (
            <div className="fixed bottom-6 right-6 z-50">
              <Chatbot 
                onClose={() => setIsChatbotOpen(false)} 
              />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
