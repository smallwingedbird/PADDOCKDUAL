import React, { useState } from 'react';
import { PathConfig, SetupStep } from '../types';
import { 
  X, 
  Sparkles, 
  Terminal, 
  Check, 
  Copy, 
  AlertCircle, 
  ShieldCheck, 
  Loader2, 
  Send,
  HelpCircle
} from 'lucide-react';

interface GeminiTroubleshootModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: SetupStep;
  config: PathConfig;
}

interface TroubleshootResponse {
  analysis: string;
  immediateFix: string[];
  commands?: string[];
  safetyVerdict?: string;
  isFallback?: boolean;
}

export const GeminiTroubleshootModal: React.FC<GeminiTroubleshootModalProps> = ({
  isOpen,
  onClose,
  step,
  config,
}) => {
  const [selectedQuickIssue, setSelectedQuickIssue] = useState<string>('');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TroubleshootResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSelectQuickIssue = (issue: string) => {
    setSelectedQuickIssue(issue);
    setCustomQuery(issue);
  };

  const handleCopyCommand = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedQuickIssue && !customQuery.trim()) {
      setSelectedQuickIssue(step.quickIssues?.[0] || 'Troubleshoot this step');
    }

    setIsLoading(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const response = await fetch('/api/gemini/troubleshoot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stepNumber: step.number,
          stepTitle: step.title,
          stepSummary: step.summary,
          config,
          userQuery: customQuery,
          quickIssue: selectedQuickIssue,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.error && !data.immediateFix) {
        setErrorMessage(data.error);
      } else {
        setResult(data);
      }
    } catch (err: any) {
      console.error('Troubleshoot error:', err);
      setErrorMessage(
        err?.message || 'Could not communicate with the troubleshooting service.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full p-6 text-neutral-100 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-800 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>GEMINI AI STEP TROUBLESHOOTER</span>
              <span className="text-neutral-600">·</span>
              <span>STAGE {step.number}</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Troubleshooting: {step.title}
            </h3>
            <p className="text-xs text-neutral-400">
              Diagnose errors, permission denies, launcher issues, or folder detection failures.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-5">
          {/* Quick Issue Prompts */}
          {step.quickIssues && step.quickIssues.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-neutral-400 block">
                Common Symptoms for This Step:
              </span>
              <div className="flex flex-wrap gap-2">
                {step.quickIssues.map((issue, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectQuickIssue(issue)}
                    className={`px-3 py-1.5 text-xs rounded-lg border text-left transition-all ${
                      selectedQuickIssue === issue
                        ? 'bg-red-950/80 text-red-200 border-red-700/80 font-medium'
                        : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
                    }`}
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User Custom Query Input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-300">
              Describe What Happened (or Edit Selected Issue):
            </label>
            <textarea
              rows={3}
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="e.g. When I ran robocopy I got error code 5 access denied, or CreamInstaller says 0 DLCs detected..."
              className="w-full p-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-neutral-600 resize-none"
            />
          </div>

          {/* Submit Trigger */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-neutral-500">
              Powered by Gemini 3.8 Flash · Evaluates anti-cheat &amp; paths
            </span>
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Diagnose &amp; Fix Issue</span>
                </>
              )}
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 bg-red-950/60 border border-red-800 rounded-xl flex items-start gap-3 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Troubleshooting Notice</span>
                <p className="text-red-300 mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* AI Result Card */}
          {result && (
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4 animate-in fade-in duration-300">
              {/* Diagnosis Header */}
              <div className="space-y-1.5 pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ROOT CAUSE DIAGNOSIS</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  {result.analysis}
                </p>
              </div>

              {/* Step-by-Step Fix */}
              {result.immediateFix && result.immediateFix.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-300 block">
                    Immediate Action Steps:
                  </span>
                  <ul className="space-y-2">
                    {result.immediateFix.map((stepText, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                        <span className="w-4 h-4 rounded-full bg-neutral-800 text-neutral-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{stepText}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Terminal Commands */}
              {result.commands && result.commands.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-neutral-850">
                  <span className="text-xs font-mono font-semibold text-neutral-400 block">
                    COPYABLE COMMAND FIXES:
                  </span>
                  <div className="space-y-2">
                    {result.commands.map((cmd, idx) => (
                      <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 flex items-center justify-between gap-3">
                        <code className="text-xs font-mono text-emerald-400 overflow-x-auto break-all">
                          {cmd}
                        </code>
                        <button
                          type="button"
                          onClick={() => handleCopyCommand(cmd, idx)}
                          className="px-2.5 py-1 text-xs text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded transition-colors flex items-center gap-1 shrink-0 font-mono"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AntiCheat Verdict */}
              {result.safetyVerdict && (
                <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-lg flex items-center gap-2.5 text-xs text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Safety Verdict:</strong> {result.safetyVerdict}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-neutral-500 font-mono">
            Target: {config.cleanGamePath}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
