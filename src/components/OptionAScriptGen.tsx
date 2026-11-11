import React, { useState } from 'react';
import { PathConfig, SetupStep } from '../types';
import { generateOnlineBatchScript, generateOfflineBatchScript } from '../data/guideContent';
import { GeminiTroubleshootModal } from './GeminiTroubleshootModal';
import { Download, Copy, Check, Terminal, Shield, FolderSync, Info, AlertTriangle, Sparkles } from 'lucide-react';

interface OptionAScriptGenProps {
  config: PathConfig;
  onSwitchToOptionB: () => void;
}

export const OptionAScriptGen: React.FC<OptionAScriptGenProps> = ({
  config,
  onSwitchToOptionB,
}) => {
  const [activeScript, setActiveScript] = useState<'online' | 'offline' | 'backup'>('online');
  const [copied, setCopied] = useState<boolean>(false);
  const [troubleshootOpen, setTroubleshootOpen] = useState<boolean>(false);

  const onlineScript = generateOnlineBatchScript(config);
  const offlineScript = generateOfflineBatchScript(config);

  const backupScript = `@echo off
:: ========================================================
:: PaddockDual - Complete Save & Telemetry Backup Script
:: ========================================================
title PaddockDual Save Backup
echo [PaddockDual] Backing up all F1 25 Saves and Configuration...

set "BACKUP_DIR=%USERPROFILE%\\Documents\\F1_25_Save_Backups\\Backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%"
set "BACKUP_DIR=%BACKUP_DIR: =0%"

mkdir "%BACKUP_DIR%" 2>nul
xcopy /E /I /Y "%USERPROFILE%\\Documents\\My Games\\F1 25*" "%BACKUP_DIR%"

echo [PaddockDual] Backup successfully saved to:
echo "%BACKUP_DIR%"
pause
`;

  const currentContent = 
    activeScript === 'online' 
      ? onlineScript 
      : activeScript === 'offline' 
      ? offlineScript 
      : backupScript;

  const currentFilename = 
    activeScript === 'online' 
      ? 'Launch_F1_Online.bat' 
      : activeScript === 'offline' 
      ? 'Launch_F1_Offline_Swofty.bat' 
      : 'Backup_F1_Saves.bat';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Top Description */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
              <span className="text-amber-400 font-mono">OPTION A PROTOCOL</span>
              <span>·</span>
              <span>SINGLE USER AUTOMATION</span>
              <span>·</span>
              <span>1-CLICK SAVE SWAPPER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              1-Click Batch Automation Suite
            </h1>
            <p className="text-sm text-neutral-300 leading-relaxed">
              If you prefer not to switch Windows user profiles, these automated batch files silently swap the <code className="px-1.5 py-0.5 bg-neutral-950 text-amber-300 rounded font-mono text-xs">Documents\My Games\F1 25</code> folders before launching either game version.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={onSwitchToOptionB}
              className="px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl transition-colors whitespace-nowrap"
            >
              Switch to Option B (Windows User Account)
            </button>
          </div>
        </div>
      </div>

      {/* Script Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
          <button
            onClick={() => setActiveScript('online')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeScript === 'online'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Launch_F1_Online.bat
          </button>
          <button
            onClick={() => setActiveScript('offline')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeScript === 'offline'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Launch_F1_Offline_Swofty.bat
          </button>
          <button
            onClick={() => setActiveScript('backup')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeScript === 'backup'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Backup_F1_Saves.bat
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setTroubleshootOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-red-900/60 hover:border-red-500 rounded-lg transition-colors group"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
            <span>Troubleshoot Script with Gemini</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {currentFilename}</span>
          </button>
        </div>
      </div>

      {/* Live Script Display */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-red-400" />
            <span className="text-white font-semibold">{currentFilename}</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500">Targets: {config.cleanGamePath}</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">Windows Batch (.bat)</span>
        </div>

        <div className="p-4 sm:p-6 bg-neutral-950/70 overflow-x-auto font-mono text-xs text-neutral-200 leading-relaxed">
          <pre>{currentContent}</pre>
        </div>
      </div>

      {/* How Option A Works & Safety Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-300">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 font-semibold text-white text-sm">
            <FolderSync className="w-4 h-4 text-emerald-400" />
            <h4>How the Automatic Save Swapper Works</h4>
          </div>
          <p className="leading-relaxed text-neutral-400">
            Before booting your selected version, the script navigates to <code className="text-neutral-200">Documents\My Games</code>.
          </p>
          <ul className="space-y-2 list-disc list-inside text-neutral-400">
            <li>When launching <strong>Online</strong>: renames any active <code className="text-neutral-200">F1 25</code> to <code className="text-neutral-200">F1 25_Offline</code>, then restores <code className="text-neutral-200">F1 25_Online</code> back to <code className="text-neutral-200">F1 25</code>.</li>
            <li>When launching <strong>Offline</strong>: renames any active <code className="text-neutral-200">F1 25</code> to <code className="text-neutral-200">F1 25_Online</code>, then restores <code className="text-neutral-200">F1 25_Offline</code> back to <code className="text-neutral-200">F1 25</code>.</li>
          </ul>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 font-semibold text-white text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h4>Rules for Option A Safety</h4>
          </div>
          <p className="leading-relaxed text-neutral-400">
            Always launch the game via your desktop batch shortcuts, never directly from the EA App or Epic Games icon while an offline session was last active.
          </p>
          <p className="leading-relaxed text-neutral-400">
            If you ever accidentally launch from the EA App directly without running the batch file first, your offline save may load into EA servers. (This is why Option B with a separate Windows profile is the safer permanent choice).
          </p>
        </div>
      </div>

      <GeminiTroubleshootModal
        isOpen={troubleshootOpen}
        onClose={() => setTroubleshootOpen(false)}
        config={config}
        step={{
          id: 'option-a-scripts',
          number: 1,
          title: `Batch Script Execution (${currentFilename})`,
          summary: `Automated save folder swapping and game launcher for ${activeScript.toUpperCase()} mode.`,
          details: [
            'Executes batch commands in %USERPROFILE%\\Documents\\My Games.',
            'Swaps active F1 25 save folder to protect EA servers from entitlement mismatches.',
            'Launches target game executable.'
          ],
          safetyCheck: 'Ensure Command Prompt has permissions to rename folders in Documents.',
          quickIssues: [
            'Access is denied when batch file attempts to rename F1 25 folder',
            'Batch file flashes briefly and closes without launching game',
            'The system cannot find the path specified for F1_25.exe',
            'Swofty Launcher does not start from batch file'
          ]
        }}
      />
    </div>
  );
};
