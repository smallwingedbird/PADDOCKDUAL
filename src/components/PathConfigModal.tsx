import React, { useState } from 'react';
import { PathConfig } from '../types';
import { X, Folder, UserCheck, HardDrive, Shield } from 'lucide-react';

interface PathConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PathConfig;
  onSave: (newConfig: PathConfig) => void;
}

export const PathConfigModal: React.FC<PathConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [form, setForm] = useState<PathConfig>(config);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const handleCleanChange = (newClean: string) => {
    const trimmed = newClean.trim();
    setForm(prev => ({
      ...prev,
      cleanGamePath: newClean,
      offlineGamePath: trimmed ? `${trimmed} - Offline` : prev.offlineGamePath
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-lg w-full p-6 text-neutral-100 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h3 className="text-lg font-bold text-white">Installation & Path Parameters</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Customizes all generated scripts, PowerShell snippets, and folder directions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Clean / Official Game Directory (EA / Epic)
            </label>
            <div className="relative">
              <HardDrive className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={form.cleanGamePath}
                onChange={(e) => handleCleanChange(e.target.value)}
                placeholder="D:\Games\F1 25"
                className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
            <span className="text-[11px] text-neutral-500 mt-1 block">
              Where your untouched, official version installed via Epic or EA App resides.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Modded / Offline Directory (Duplicated Copy)
            </label>
            <div className="relative">
              <Folder className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={form.offlineGamePath}
                onChange={(e) => setForm({ ...form, offlineGamePath: e.target.value })}
                placeholder="D:\Games\F1 25 - Offline"
                className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
            <span className="text-[11px] text-neutral-500 mt-1 block">
              Target for CreamInstaller proxy DLLs and Swofty Launcher offline hooks.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Isolated Windows User Account Name (Option B)
            </label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={form.windowsAccountName}
                onChange={(e) => setForm({ ...form, windowsAccountName: e.target.value })}
                placeholder="Offline Gaming"
                className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Swofty Launcher Executable Path
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={form.swoftyExePath}
                onChange={(e) => setForm({ ...form, swoftyExePath: e.target.value })}
                placeholder="C:\Program Files\Swofty Launcher\SwoftyLauncher.exe"
                className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white bg-transparent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors shadow-sm"
            >
              Apply Paths
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
