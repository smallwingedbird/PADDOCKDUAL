import React from 'react';
import { SAFETY_RISK_ITEMS } from '../data/guideContent';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2, Lock, Cpu, Database } from 'lucide-react';

export const SafetyMatrix: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-semibold">
          <span>THREAT MODEL &amp; SAFETY AUDIT</span>
          <span>·</span>
          <span>EA ANTICHEAT (EAAC) &amp; DRM DECONSTRUCTION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Comprehensive Anti-Cheat &amp; Account Safety Audit
        </h2>
        <p className="text-sm text-neutral-300 leading-relaxed w-full">
          Formula 1 titles on PC utilize EA Anti-Cheat (EAAC) at Ring 0 (kernel level), combined with EA Racenet cloud entitlement validation. Here is the exact technical analysis of how our dual-install isolation protects your account from bans and save corruption.
        </p>
      </div>

      {/* Safety Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Risk Vector &amp; Mitigation Breakdown</span>
          </h3>
          <span className="text-xs font-mono text-neutral-500">5 Monitored Vectors</span>
        </div>

        <div className="divide-y divide-neutral-800">
          {SAFETY_RISK_ITEMS.map((item, idx) => {
            const isCritical = item.riskLevel === 'Critical Warning';
            const isHigh = item.riskLevel === 'High Risk if Neglected';
            const isSafe = item.riskLevel === 'Safe';

            return (
              <div key={idx} className="p-6 space-y-4 hover:bg-neutral-900/60 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{item.area}</span>
                  </h4>
                  <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md w-fit ${
                    isCritical
                      ? 'bg-red-950 text-red-300 border border-red-800'
                      : isHigh
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {item.riskLevel}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2">
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80 space-y-1">
                    <span className="text-neutral-500 text-[10px] block">HOW OUR SETUP PREVENTS IT</span>
                    <span className="text-emerald-400 font-semibold">{item.howWePreventIt}</span>
                  </div>
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80 space-y-1">
                    <span className="text-neutral-500 text-[10px] block">UNDERLYING TECHNICAL MECHANISM</span>
                    <span className="text-neutral-300">{item.technicalReason}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Grid: Single vs Dual Installation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-red-900/40 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <h3>The Flawed Single-Folder Approach</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Running CreamInstaller directly on your main installation and attempting to play online or offline from one folder creates constant hazards:
          </p>
          <ul className="text-xs text-neutral-400 space-y-2 list-disc list-inside">
            <li>Any accidental click on the EA App icon boots EAAC while modified DLLs reside in the folder, risking an immediate ban.</li>
            <li>Game updates will fail or require verifying files, wiping all mods.</li>
            <li>Career saves store unlocked items that will corrupt when connecting to EA Racenet multiplayer.</li>
          </ul>
        </div>

        <div className="bg-neutral-900 border border-emerald-900/40 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <h3>The PaddockDual Isolation Architecture</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            By separating both the game binaries (<code className="text-neutral-200">D:\Games\F1 25 - Offline</code>) and user profile storage (<code className="text-neutral-200">C:\Users\Offline Gaming\Documents</code>):
          </p>
          <ul className="text-xs text-neutral-400 space-y-2 list-disc list-inside">
            <li>Your official game directory remains bit-for-bit identical to EA&apos;s verified store release.</li>
            <li>EA Anti-Cheat can scan 100% of your online files without discovering a single anomaly.</li>
            <li>Save profiles never touch, protecting your online account from entitlement mismatches.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
