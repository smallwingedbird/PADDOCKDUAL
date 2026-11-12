import React from 'react';
import { ActiveTab } from '../types';
import { Settings, ShieldCheck, Terminal, Compass, RefreshCw, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenConfig: () => void;
  cleanPath: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenConfig,
  cleanPath,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); setActiveTab('wizard-option-b'); }}
          className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 bg-red-600 rounded-sm inline-block group-hover:scale-110 transition-transform"></span>
          <span>PADDOCKDUAL</span>
        </a>

        {/* Zone 2: 4-5 Navigation Links (Single-line whitespace-nowrap) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <button
            onClick={() => setActiveTab('wizard-option-b')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'wizard-option-b'
                ? 'text-white border-red-500 font-semibold'
                : 'border-transparent hover:text-neutral-200'
            }`}
          >
            Windows Profile Guide (Option B)
          </button>
          
          <button
            onClick={() => setActiveTab('script-option-a')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'script-option-a'
                ? 'text-white border-red-500 font-semibold'
                : 'border-transparent hover:text-neutral-200'
            }`}
          >
            Batch Swapper (Option A)
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'simulator'
                ? 'text-white border-red-500 font-semibold'
                : 'border-transparent hover:text-neutral-200'
            }`}
          >
            Isolation Sandbox
          </button>

          <button
            onClick={() => setActiveTab('safety-matrix')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'safety-matrix'
                ? 'text-white border-red-500 font-semibold'
                : 'border-transparent hover:text-neutral-200'
            }`}
          >
            AntiCheat & Safety Audit
          </button>

          <button
            onClick={() => setActiveTab('update-protocol')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'update-protocol'
                ? 'text-white border-red-500 font-semibold'
                : 'border-transparent hover:text-neutral-200'
            }`}
          >
            Update Protocol & Wheel Sync
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenConfig}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Configure target installation directory paths"
          >
            <Settings className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Path: {cleanPath}</span>
            <span className="sm:hidden">Paths</span>
          </button>
        </div>
      </div>
    </header>
  );
};
