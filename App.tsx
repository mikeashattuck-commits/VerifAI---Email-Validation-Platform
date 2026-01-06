import React, { useState } from 'react';
import { ViewState } from './types';
import { VerifierTool } from './components/VerifierTool';
import { Dashboard } from './components/Dashboard';
import { ApiDocs } from './components/ApiDocs';
import { ShieldCheck, BarChart2, Book, Menu, X, Github } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'HOME', label: 'Verifier', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'DASHBOARD', label: 'Dashboard', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'DOCS', label: 'API Docs', icon: <Book className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('HOME')}>
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Verif<span className="text-brand-400">AI</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewState)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  view === item.id 
                    ? 'bg-slate-800 text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <div className="h-6 w-px bg-slate-800 mx-2"></div>
            <a 
              href="https://github.com/umuterturk/email-verifier" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-900">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id as ViewState);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                    view === item.id 
                      ? 'bg-slate-800 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {view === 'HOME' && (
          <div className="relative overflow-hidden pt-16 pb-24">
             {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 text-xs font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  API v2.0 is live
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                  Stop bounces. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">
                    Verify emails instantly.
                  </span>
                </h1>
                <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                  The most accurate email validation API. Powered by real-time DNS lookup and GenAI to catch disposables, typos, and spam traps before they hit your database.
                </p>
              </div>

              <VerifierTool />

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Real-time DNS</h3>
                  <p className="text-slate-400">We query MX records live to ensure the receiving mail server actually exists and accepts mail.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <BarChart2 className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Smart Typo Fixes</h3>
                  <p className="text-slate-400">Automatically detect and suggest corrections for misspelled domains like 'gmal.com'.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
                  <p className="text-slate-400">Gemini models analyze username patterns to flag high-risk or role-based accounts.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'DASHBOARD' && <Dashboard />}
        {view === 'DOCS' && <ApiDocs />}
      </main>

      <footer className="border-t border-slate-800 py-12 bg-slate-900 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 mb-4">
            &copy; {new Date().getFullYear()} VerifAI. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-slate-400">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;