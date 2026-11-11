import React, { useState } from 'react';
import { PathConfig } from '../types';
import { HardDrive, Folder, File, ShieldAlert, ShieldCheck, Play, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

interface SystemSimulatorProps {
  config: PathConfig;
}

export const SystemSimulator: React.FC<SystemSimulatorProps> = ({ config }) => {
  const [sessionMode, setSessionMode] = useState<'online' | 'offline'>('online');
  const [profileMethod, setProfileMethod] = useState<'option-b' | 'option-a'>('option-b');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const runSimulation = (mode: 'online' | 'offline') => {
    setSessionMode(mode);
    setIsSimulating(true);
    setSimulationLog([]);

    const logs: string[] = [];
    if (mode === 'online') {
      logs.push(`[1/4] User initiates Official Launch (EA App / Epic Games Launcher).`);
      logs.push(`[2/4] EA Anti-Cheat kernel driver engages. Scanning binaries in "${config.cleanGamePath}"...`);
      logs.push(`[3/4] Directory "${config.cleanGamePath}" is 100% clean. Zero unauthorized DLLs detected.`);
      if (profileMethod === 'option-b') {
        logs.push(`[4/4] Main Windows Account profile loaded from "C:\\Users\\<MainUser>\\Documents\\My Games\\F1 25". Clean entitlement verified.`);
      } else {
        logs.push(`[4/4] Batch script swapped save to clean version. Loaded "Documents\\My Games\\F1 25". Safe for online.`);
      }
    } else {
      logs.push(`[1/4] User switches to "${config.windowsAccountName}" and starts Swofty Launcher.`);
      logs.push(`[2/4] Swofty Launcher engages Anti-Cheat bypass flag (-offline -noeac).`);
      logs.push(`[3/4] Swofty targets isolated folder "${config.offlineGamePath}\\F1_25.exe".`);
      if (profileMethod === 'option-b') {
        logs.push(`[4/4] Game reads isolated save from "C:\\Users\\${config.windowsAccountName}\\Documents\\My Games\\F1 25". DLCs unlocked offline.`);
      } else {
        logs.push(`[4/4] Batch script restored "F1 25_Offline" into active save slot. Unlocked career loaded.`);
      }
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        const item = logs[i];
        setSimulationLog(prev => [...prev, item]);
        i++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 400);
  };

  return (
    <div className="space-y-8">
      {/* Simulation Controls Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-semibold">
              <span>ISOLATION SANDBOX SIMULATOR</span>
              <span>·</span>
              <span>REAL-TIME ENVIRONMENT TESTER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Filesystem & Kernel Integrity Sandbox
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Interact with the visual map of your storage drives and document paths to test how both game versions run without cross-contamination.
            </p>
          </div>

          {/* Action Simulation Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => runSimulation('online')}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                sessionMode === 'online'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-1 ring-emerald-400'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Simulate Online EA Launch</span>
            </button>

            <button
              onClick={() => runSimulation('offline')}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                sessionMode === 'offline'
                  ? 'bg-red-600 text-white border-red-500 shadow-md ring-1 ring-red-400'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Simulate Swofty Offline Launch</span>
            </button>
          </div>
        </div>

        {/* Isolation Method Toggle */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center gap-4 text-xs">
          <span className="text-neutral-400 font-medium">Save Isolation Method:</span>
          <div className="flex items-center gap-2 p-1 bg-neutral-950 border border-neutral-800 rounded-lg">
            <button
              onClick={() => setProfileMethod('option-b')}
              className={`px-3 py-1 rounded-md transition-colors ${
                profileMethod === 'option-b'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Option B (Windows User Accounts)
            </button>
            <button
              onClick={() => setProfileMethod('option-a')}
              className={`px-3 py-1 rounded-md transition-colors ${
                profileMethod === 'option-a'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Option A (1-Click Batch Swapper)
            </button>
          </div>
        </div>
      </div>

      {/* Visual Filesystem Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drive D: Game Directories */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-neutral-400" />
              <h3 className="text-sm font-bold text-white">Drive D: Game Installations</h3>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">D:\Games\</span>
          </div>

          {/* Clean Directory Card */}
          <div className={`p-4 rounded-xl border transition-all ${
            sessionMode === 'online'
              ? 'bg-neutral-950 border-emerald-500/80 ring-1 ring-emerald-500/30'
              : 'bg-neutral-950/60 border-neutral-800 opacity-60'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-white">F1 25 (Clean)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Official Untouched
              </span>
            </div>
            <div className="text-[11px] text-neutral-400 space-y-1 font-mono">
              <div>Path: {config.cleanGamePath}</div>
              <div>AntiCheat: EAAC Kernel Service (Active &amp; Compliant)</div>
              <div>Modified DLLs: NONE (100% Original Executables)</div>
            </div>
            {sessionMode === 'online' && (
              <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Currently ACTIVE for Official Multiplayer</span>
              </div>
            )}
          </div>

          {/* Offline Modded Directory Card */}
          <div className={`p-4 rounded-xl border transition-all ${
            sessionMode === 'offline'
              ? 'bg-neutral-950 border-red-500/80 ring-1 ring-red-500/30'
              : 'bg-neutral-950/60 border-neutral-800 opacity-60'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-red-400" />
                <span className="font-mono text-xs font-bold text-white">F1 25 - Offline</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                CreamInstaller Modded
              </span>
            </div>
            <div className="text-[11px] text-neutral-400 space-y-1 font-mono">
              <div>Path: {config.offlineGamePath}</div>
              <div>AntiCheat: BYPASSED via Swofty Launcher</div>
              <div>Hook: SmokeAPI / ScreamAPI proxy DLLs installed</div>
            </div>
            {sessionMode === 'offline' && (
              <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center gap-2 text-xs text-red-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Currently ACTIVE for Swofty Offline Racing</span>
              </div>
            )}
          </div>
        </div>

        {/* Drive C: User Documents Save Isolation */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-neutral-400" />
              <h3 className="text-sm font-bold text-white">Drive C: Documents &amp; Save Profiles</h3>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">C:\Users\</span>
          </div>

          {profileMethod === 'option-b' ? (
            <>
              {/* Main Account Save */}
              <div className={`p-4 rounded-xl border transition-all ${
                sessionMode === 'online'
                  ? 'bg-neutral-950 border-emerald-500/80 ring-1 ring-emerald-500/30'
                  : 'bg-neutral-950/60 border-neutral-800 opacity-60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-xs font-bold text-white">Main Account Profile</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">
                    Clean Cloud/Local
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 space-y-1 font-mono">
                  <div>Location: C:\Users\&lt;Main&gt;\Documents\My Games\F1 25</div>
                  <div>Content: Legal Career, Official Racenet telemetry</div>
                  <div>Inaccessible to offline user account</div>
                </div>
              </div>

              {/* Offline Account Save */}
              <div className={`p-4 rounded-xl border transition-all ${
                sessionMode === 'offline'
                  ? 'bg-neutral-950 border-red-500/80 ring-1 ring-red-500/30'
                  : 'bg-neutral-950/60 border-neutral-800 opacity-60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-red-400" />
                    <span className="font-mono text-xs font-bold text-white">&quot;{config.windowsAccountName}&quot; Profile</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300">
                    Unlocked Offline
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 space-y-1 font-mono">
                  <div>Location: C:\Users\{config.windowsAccountName}\Documents\My Games\F1 25</div>
                  <div>Content: All DLC items, custom mods, offline season</div>
                  <div>Isolated from main online account</div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Option A Folder Swapping Display */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs font-mono">
                <div className="text-neutral-400 text-[10px]">CURRENT FOLDER STATE IN DOCUMENTS\MY GAMES:</div>
                <div className="p-2.5 bg-neutral-900 rounded border border-neutral-800">
                  <span className="text-neutral-500">Folder &quot;F1 25&quot; is currently pointing to: </span>
                  <span className={sessionMode === 'online' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                    {sessionMode === 'online' ? 'F1 25 (Clean Online Save)' : 'F1 25 (Offline Modded Save)'}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500">
                  {sessionMode === 'online' 
                    ? 'Offline save is parked safely as "F1 25_Offline".' 
                    : 'Online clean save is parked safely as "F1 25_Online".'}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Execution Diagnostics Terminal */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <span className="text-neutral-400 font-bold">SYSTEM EXECUTION DIAGNOSTICS LOG</span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            ZERO THREAT DETECTED
          </span>
        </div>

        <div className="space-y-1.5 min-h-[90px]">
          {simulationLog.length === 0 ? (
            <span className="text-neutral-600 italic">Click one of the simulation buttons above to verify the execution path...</span>
          ) : (
            simulationLog.map((log, idx) => (
              <div key={idx} className="text-neutral-300">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
