/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, PathConfig } from './types';
import { DEFAULT_PATH_CONFIG, getOptionBSteps } from './data/guideContent';
import { Header } from './components/Header';
import { PathConfigModal } from './components/PathConfigModal';
import { OptionBWizard } from './components/OptionBWizard';
import { OptionAScriptGen } from './components/OptionAScriptGen';
import { SystemSimulator } from './components/SystemSimulator';
import { SafetyMatrix } from './components/SafetyMatrix';
import { UpdateProtocol } from './components/UpdateProtocol';
import { GeminiTroubleshootModal } from './components/GeminiTroubleshootModal';
import { ShieldCheck, HardDrive, User, Sliders, ExternalLink, Cpu, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('wizard-option-b');
  const [config, setConfig] = useState<PathConfig>(DEFAULT_PATH_CONFIG);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(true);
  const [isTroubleshootOpen, setIsTroubleshootOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Header following Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenConfig={() => setIsConfigOpen(true)}
        cleanPath={config.cleanGamePath}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Context Visual Card */}
        <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl">
          <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-neutral-950">
            {imageLoaded ? (
              <img
                src="/src/assets/images/f1_pitlane_split_1794432863533.jpg"
                alt="F1 dual-install wind tunnel chassis"
                referrerPolicy="no-referrer"
                onError={() => setImageLoaded(false)}
                className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity filter contrast-125"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
                <span className="text-xs font-mono text-neutral-600">PADDOCK ISOLATION ENVIRONMENT</span>
              </div>
            )}
            
            {/* Scrim Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
            
            {/* Overlay Content */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-semibold">
                  <span>DUAL-INSTALLATION ARCHITECTURE</span>
                  <span aria-hidden="true">·</span>
                  <span>EA / EPIC PLATFORM</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Formula 1 Dual Clean &amp; Offline Modded Suite
                </h1>
                <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
                  Isolate official EA multiplayer from CreamInstaller DLC unlocks and Swofty Launcher offline mods. Zero EA Anti-Cheat risk, zero save corruption.
                </p>
              </div>

              {/* Status Parameters Bar */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsTroubleshootOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-neutral-900/90 hover:bg-neutral-800 text-red-300 hover:text-white border border-red-900/60 hover:border-red-500 rounded-xl text-xs font-semibold transition-all shadow-md group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
                  <span>Troubleshoot Step with Gemini</span>
                </button>

                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-400 bg-neutral-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-neutral-800">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    AntiCheat: Safe
                  </span>
                  <span className="text-neutral-600" aria-hidden="true">/</span>
                  <span>Clean: {config.cleanGamePath}</span>
                  <span className="text-neutral-600" aria-hidden="true">/</span>
                  <span>User: {config.windowsAccountName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation for smaller screens / explicit sub-nav */}
        <div className="flex items-center gap-1 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('wizard-option-b')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'wizard-option-b'
                ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Option B (Windows User Account)
          </button>
          <button
            onClick={() => setActiveTab('script-option-a')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'script-option-a'
                ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Option A (1-Click Batch Swapper)
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'simulator'
                ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Drive &amp; Save Sandbox
          </button>
          <button
            onClick={() => setActiveTab('safety-matrix')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'safety-matrix'
                ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            AntiCheat &amp; Safety Audit
          </button>
          <button
            onClick={() => setActiveTab('update-protocol')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'update-protocol'
                ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Title Updates &amp; Wheel Sync
          </button>
        </div>

        {/* Tab Content Rendering */}
        {activeTab === 'wizard-option-b' && (
          <OptionBWizard
            config={config}
            onSelectOptionA={() => setActiveTab('script-option-a')}
            onOpenSimulator={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'script-option-a' && (
          <OptionAScriptGen
            config={config}
            onSwitchToOptionB={() => setActiveTab('wizard-option-b')}
          />
        )}

        {activeTab === 'simulator' && (
          <SystemSimulator config={config} />
        )}

        {activeTab === 'safety-matrix' && (
          <SafetyMatrix />
        )}

        {activeTab === 'update-protocol' && (
          <UpdateProtocol config={config} />
        )}
      </main>

      {/* Path Configuration Modal */}
      <PathConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={config}
        onSave={setConfig}
      />

      {/* Global Gemini Step Troubleshooter Modal */}
      <GeminiTroubleshootModal
        isOpen={isTroubleshootOpen}
        onClose={() => setIsTroubleshootOpen(false)}
        config={config}
        step={getOptionBSteps(config)[2]} // Defaults to Step 2 (Folder Swap & CreamInstaller, the most technical step)
      />

      {/* Footer with Unboxed Metadata */}
      <footer className="border-t border-neutral-800 bg-neutral-950 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-400">PaddockDual Setup Suite</span>
            <span aria-hidden="true">·</span>
            <span>EA AntiCheat Isolation Standard</span>
            <span aria-hidden="true">·</span>
            <span>Target: {config.cleanGamePath}</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>Formula 1 2025 / 2026 Compatible</span>
            <span aria-hidden="true">·</span>
            <span>SmokeAPI &amp; Swofty Launcher</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
