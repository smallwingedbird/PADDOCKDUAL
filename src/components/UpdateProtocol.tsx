import React, { useState } from 'react';
import { PathConfig, SetupStep } from '../types';
import { FREQUENT_QUESTIONS } from '../data/guideContent';
import { GeminiTroubleshootModal } from './GeminiTroubleshootModal';
import { RefreshCw, Copy, Check, Sliders, HelpCircle, ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react';

interface UpdateProtocolProps {
  config: PathConfig;
}

export const UpdateProtocol: React.FC<UpdateProtocolProps> = ({ config }) => {
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [troubleshootModalOpen, setTroubleshootModalOpen] = useState<boolean>(false);

  const wheelCopyCmd = `copy "%USERPROFILE%\\Documents\\My Games\\F1 25\\hardwaresettings\\hardware_settings_config.xml" "C:\\Users\\${config.windowsAccountName}\\Documents\\My Games\\F1 25\\hardwaresettings\\" /Y`;

  const handleCopyWheel = () => {
    navigator.clipboard.writeText(wheelCopyCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Patch Protocol Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-semibold">
              <span>MAINTENANCE WORKFLOW</span>
              <span>·</span>
              <span>EA TITLE UPDATES &amp; PATCH PROTOCOL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How to Handle EA Game Updates Safely
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed w-full">
              When EA releases a Title Update or season patch, follow this 4-step protocol to keep both copies in working order without breaking mods or AntiCheat.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setTroubleshootModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs bg-neutral-950 hover:bg-neutral-800 text-red-300 border border-red-900/60 hover:border-red-500/80 transition-all shadow-sm shrink-0 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
            <span>Troubleshoot Updates with Gemini</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-[11px] font-mono font-bold text-red-400 px-1.5 py-0.5 bg-red-950 rounded">PHASE 1</span>
            <h4 className="text-sm font-bold text-white">Update Official Game</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Log into your Main Windows Account. Let EA App or Epic Games download the update to <code className="text-neutral-200">{config.cleanGamePath}</code>.
            </p>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-[11px] font-mono font-bold text-amber-400 px-1.5 py-0.5 bg-amber-950 rounded">PHASE 2</span>
            <h4 className="text-sm font-bold text-white">Verify Online Play</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Launch the game normally on your main account. Verify that multiplayer works and your clean profile loads without issues.
            </p>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-[11px] font-mono font-bold text-neutral-400 px-1.5 py-0.5 bg-neutral-800 rounded">PHASE 3</span>
            <h4 className="text-sm font-bold text-white">Wait for Swofty Patch</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Major game updates change executable memory offsets. Check if Swofty Launcher has released a compatible update before modifying offline files.
            </p>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-[11px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 bg-emerald-950 rounded">PHASE 4</span>
            <h4 className="text-sm font-bold text-white">Refresh Offline Copy</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Once ready, copy the updated clean game to your offline directory and re-apply CreamInstaller via the 10-second folder swap trick.
            </p>
          </div>
        </div>
      </div>

      {/* Hardware & Wheel Calibration Migration */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <Sliders className="w-5 h-5 text-red-400" />
          <h3>Migrating Force Feedback &amp; Button Mappings to New Windows User</h3>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed w-full">
          Wheel hardware drivers (Fanatec, Logitech G HUB, Thrustmaster, Simucube) run system-wide across all Windows accounts. However, your in-game button mappings and force feedback calibration reside in <code className="text-neutral-200">hardware_settings_config.xml</code>.
        </p>

        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-neutral-400">
              POWERSHELL / CMD ONE-LINER TO SYNC WHEEL CALIBRATION
            </span>
            <button
              onClick={handleCopyWheel}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-mono"
            >
              {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-emerald-400 bg-neutral-900 p-3 rounded-lg overflow-x-auto border border-neutral-800">
            {wheelCopyCmd}
          </pre>
          <span className="text-[11px] text-neutral-500 block">
            Run this in Administrator Command Prompt on your main account to instantly clone your force feedback profile into the offline account.
          </span>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-base mb-2">
          <HelpCircle className="w-5 h-5 text-red-400" />
          <h3>Frequently Asked Questions &amp; Technical Clarifications</h3>
        </div>

        <div className="space-y-3">
          {FREQUENT_QUESTIONS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-neutral-900/50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                    {item.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neutral-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-neutral-400 leading-relaxed border-t border-neutral-850">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <GeminiTroubleshootModal
        isOpen={troubleshootModalOpen}
        onClose={() => setTroubleshootModalOpen(false)}
        config={config}
        step={{
          id: 'update-wheel-protocol',
          number: 5,
          title: 'Title Updates & Force Feedback Calibration',
          summary: 'Handling EA game patches, Swofty offsets, and wheel calibration across Windows profiles.',
          details: [
            'Updating clean game via EA/Epic without breaking mods.',
            'Cloning hardware_settings_config.xml to offline profile.',
            'Fixing wheel force feedback or pedal inversion in new user.'
          ],
          safetyCheck: 'Ensure clean game is updated first and tested online before copying files.',
          quickIssues: [
            'EA game update overwrote F1_25.exe and Swofty now crashes',
            'Force feedback / button bindings missing in Offline Gaming user',
            'Pedals inverted or wheel not recognized in new profile',
            'Swofty Launcher says: "Game version mismatch after update"'
          ]
        }}
      />
    </div>
  );
};
