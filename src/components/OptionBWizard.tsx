import React, { useState } from 'react';
import { PathConfig, SetupStep } from '../types';
import { getOptionBSteps } from '../data/guideContent';
import { GeminiTroubleshootModal } from './GeminiTroubleshootModal';
import { 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  HardDrive, 
  FolderSync, 
  UserCheck, 
  Play, 
  FileCode,
  Terminal,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface OptionBWizardProps {
  config: PathConfig;
  onSelectOptionA: () => void;
  onOpenSimulator: () => void;
}

export const OptionBWizard: React.FC<OptionBWizardProps> = ({
  config,
  onSelectOptionA,
  onOpenSimulator,
}) => {
  const steps = getOptionBSteps(config);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [activeStepTab, setActiveStepTab] = useState<number>(0);
  const [troubleshootModalOpen, setTroubleshootModalOpen] = useState<boolean>(false);
  const [stepToTroubleshoot, setStepToTroubleshoot] = useState<SetupStep | null>(null);

  const handleOpenTroubleshoot = (s: SetupStep) => {
    setStepToTroubleshoot(s);
    setTroubleshootModalOpen(true);
  };

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const progress = Math.round(
    (Object.values(completedSteps).filter(Boolean).length / steps.length) * 100
  );

  return (
    <div className="space-y-8">
      {/* Top Banner / Setup Context */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
              <span className="text-red-400 font-mono">OPTION B PROTOCOL</span>
              <span>·</span>
              <span>ZERO SAVE CONFLICTS</span>
              <span>·</span>
              <span>KERNEL ANTICHEAT ISOLATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Windows User Account Isolation
            </h1>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Step-by-step master walkthrough tailored for clean directory <code className="px-1.5 py-0.5 bg-neutral-950 text-red-300 rounded font-mono text-xs">{config.cleanGamePath}</code> and offline mod directory <code className="px-1.5 py-0.5 bg-neutral-950 text-emerald-300 rounded font-mono text-xs">{config.offlineGamePath}</code>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
            <div className="bg-neutral-950 border border-neutral-800 px-4 py-3 rounded-xl min-w-[200px]">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="text-neutral-400">Setup Completion</span>
                <span className="font-mono text-red-400 font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-red-500 h-full transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={onOpenSimulator}
              className="text-xs font-medium text-neutral-400 hover:text-white flex items-center gap-1.5 underline underline-offset-4"
            >
              <FolderSync className="w-3.5 h-3.5 text-red-400" />
              Launch Interactive Drive Simulator
            </button>
          </div>
        </div>
      </div>

      {/* Visual Workflow Steps Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {steps.map((s, idx) => {
          const isDone = completedSteps[s.id];
          const isCurrent = activeStepTab === idx;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStepTab(idx)}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                isCurrent
                  ? 'bg-neutral-900 border-red-500/80 shadow-md ring-1 ring-red-500/30'
                  : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  isDone 
                    ? 'bg-emerald-950 text-emerald-400' 
                    : isCurrent 
                    ? 'bg-red-950 text-red-400' 
                    : 'bg-neutral-800 text-neutral-400'
                }`}>
                  STEP 0{s.number}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-neutral-600 shrink-0" />
                )}
              </div>
              <h4 className="text-xs font-semibold text-neutral-200 line-clamp-1">{s.title.replace(/Step \d+: /, '')}</h4>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Interactive Card */}
      {(() => {
        const step = steps[activeStepTab];
        const isDone = completedSteps[step.id];

        return (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-semibold">
                  <span>STAGE {step.number} OF 4</span>
                  <span>·</span>
                  <span>ACTION PROTOCOL</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {step.title}
                </h2>
                <p className="text-sm text-neutral-300">
                  {step.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenTroubleshoot(step)}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs bg-neutral-950 hover:bg-neutral-800 text-red-300 border border-red-900/60 hover:border-red-500/80 transition-all shadow-sm group"
                  title="Troubleshoot this step with Gemini AI"
                >
                  <Sparkles className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
                  <span>Troubleshoot with Gemini</span>
                </button>

                <button
                  onClick={() => toggleStep(step.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap shrink-0 ${
                    isDone
                      ? 'bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 hover:bg-emerald-900/50'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-neutral-400" />
                      <span>Mark as Done</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Step-specific interactive helpers */}
            {step.number === 0 && (
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Why must EA Cloud Saves be disabled?</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  EA App syncs cloud saves automatically upon game exit. If your offline DLC save ever synced to EA's cloud bucket, logging into your official online game could either corrupt your save or send telemetry regarding unowned DLC items to EA servers. Disabling cloud storage keeps saves 100% on your local drive.
                </p>
              </div>
            )}

            {step.number === 1 && (
              <div className="space-y-4">
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold text-neutral-400">
                      HIGH-SPEED DUPLICATION VIA ROBOCOPY (POWER-SHELL / CMD)
                    </span>
                    <button
                      onClick={() => handleCopy(`robocopy "${config.cleanGamePath}" "${config.offlineGamePath}" /E /MT:8`, 'robocopy')}
                      className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-mono"
                    >
                      {copiedIndex === 'robocopy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === 'robocopy' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-emerald-400 bg-neutral-900/90 p-3 rounded-lg overflow-x-auto border border-neutral-800">
                    robocopy &quot;{config.cleanGamePath}&quot; &quot;{config.offlineGamePath}&quot; /E /MT:8
                  </pre>
                  <p className="text-[11px] text-neutral-400 mt-2">
                    Using <code>/MT:8</code> enables 8 parallel copying threads, finishing in a fraction of standard File Explorer copy time.
                  </p>
                </div>
              </div>
            )}

            {step.number === 2 && (
              <div className="space-y-4">
                {/* 10-Second Folder Swap Diagram */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                  <h4 className="text-xs font-bold text-neutral-200 mb-3 flex items-center gap-2">
                    <FolderSync className="w-4 h-4 text-red-400" />
                    <span>The 10-Second Folder Swap Explained Visually</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                      <div className="text-red-400 font-bold mb-1">1. Rename Clean</div>
                      <div className="text-neutral-400 text-[11px]">
                        <code>F1 25</code> &rarr; <span className="text-neutral-200 font-semibold">F1 25 - Clean</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-1">Shelves official game safely away from installer</div>
                    </div>

                    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                      <div className="text-amber-400 font-bold mb-1">2. Run CreamInstaller</div>
                      <div className="text-neutral-400 text-[11px]">
                        <code>F1 25 - Offline</code> &rarr; <span className="text-amber-200 font-semibold">F1 25</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-1">CreamInstaller finds registry path and installs DLLs</div>
                    </div>

                    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                      <div className="text-emerald-400 font-bold mb-1">3. Revert Both Names</div>
                      <div className="text-neutral-400 text-[11px]">
                        Both folders returned to final paths
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-1">Clean is 100% clean; Offline has unlocker</div>
                    </div>
                  </div>
                </div>

                {step.criticalWarning && (
                  <div className="bg-red-950/40 border border-red-800/80 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <span className="font-bold text-red-200">Critical Safety Precaution</span>
                      <p className="text-red-300 leading-relaxed">
                        {step.criticalWarning}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step.number === 3 && (
              <div className="space-y-4">
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold text-neutral-400">
                      ADMIN COMMAND PROMPT / POWERSHELL INSTANT USER CREATION
                    </span>
                    <button
                      onClick={() => handleCopy(`net user "${config.windowsAccountName}" /add & net localgroup administrators "${config.windowsAccountName}" /add`, 'createuser')}
                      className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-mono"
                    >
                      {copiedIndex === 'createuser' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === 'createuser' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-emerald-400 bg-neutral-900/90 p-3 rounded-lg overflow-x-auto border border-neutral-800">
                    net user &quot;{config.windowsAccountName}&quot; /add &amp; net localgroup administrators &quot;{config.windowsAccountName}&quot; /add
                  </pre>
                  <p className="text-[11px] text-neutral-400 mt-2">
                    Creates local user &quot;{config.windowsAccountName}&quot; with Administrator rights so Swofty can isolate AntiCheat without UAC prompts.
                  </p>
                </div>
              </div>
            )}

            {step.number === 4 && (
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>WHERE SAVES ARE PHYSICALLY STORED</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <span className="text-neutral-400 block text-[10px] mb-1">MAIN USER (ONLINE)</span>
                    <span className="text-white break-all">C:\Users\&lt;YourMainUser&gt;\Documents\My Games\F1 25</span>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <span className="text-red-400 block text-[10px] mb-1">OFFLINE USER (SWOFTY MODDED)</span>
                    <span className="text-white break-all">C:\Users\{config.windowsAccountName}\Documents\My Games\F1 25</span>
                  </div>
                </div>
              </div>
            )}

            {/* Checklist details list */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-300">Detailed Action Items:</h4>
              <ul className="space-y-2.5">
                {step.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-neutral-300 leading-relaxed">
                    <span className="font-mono text-neutral-500 font-bold shrink-0 mt-0.5">{idx + 1}.</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step safety verification banner */}
            <div className="p-4 bg-neutral-950/60 border border-neutral-800/80 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Verification:</strong> {step.safetyCheck}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenTroubleshoot(step)}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span>Stuck on Step 0{step.number}?</span>
                </button>

                {activeStepTab > 0 && (
                  <button
                    onClick={() => setActiveStepTab(prev => prev - 1)}
                    className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                )}
                {activeStepTab < steps.length - 1 && (
                  <button
                    onClick={() => setActiveStepTab(prev => prev + 1)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Routine Gameplay Guide (Online vs Offline Routine) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h3>Playing Official Online / Multiplayer</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Whenever you want to race in EA official ranked multiplayer, leagues, or official events:
          </p>
          <ol className="text-xs text-neutral-400 space-y-2 list-decimal list-inside">
            <li>Log into your <strong>Main Windows Account</strong>.</li>
            <li>Launch the game normally via <strong>EA App</strong> or <strong>Epic Games Launcher</strong>.</li>
            <li>EA Anti-Cheat loads cleanly and checks <code className="text-neutral-200">{config.cleanGamePath}</code>.</li>
            <li>Your clean online save file in Documents is loaded with zero risk.</li>
          </ol>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-red-400 font-bold text-sm">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <h3>Playing Offline Unlocked / Swofty Mods</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Whenever you want to race 2026 Season mods, unlocked DLCs, or custom tracks:
          </p>
          <ol className="text-xs text-neutral-400 space-y-2 list-decimal list-inside">
            <li>Press Win + L or Start Menu &rarr; Switch to <strong>&quot;{config.windowsAccountName}&quot;</strong>.</li>
            <li>Open <strong>Swofty Launcher</strong> with AntiCheat Bypass enabled.</li>
            <li>Swofty boots the game from <code className="text-neutral-200">{config.offlineGamePath}</code>.</li>
            <li>Saves and career data load strictly from this user&apos;s isolated Documents folder.</li>
          </ol>
        </div>
      </div>

      {stepToTroubleshoot && (
        <GeminiTroubleshootModal
          isOpen={troubleshootModalOpen}
          onClose={() => setTroubleshootModalOpen(false)}
          step={stepToTroubleshoot}
          config={config}
        />
      )}
    </div>
  );
};
