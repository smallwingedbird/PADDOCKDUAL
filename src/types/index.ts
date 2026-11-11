export interface PathConfig {
  cleanGamePath: string;
  offlineGamePath: string;
  swoftyExePath: string;
  windowsAccountName: string;
  gameVersion: 'F1 25' | 'F1 24' | 'F1 23' | 'F1 26 (Future)';
  platform: 'Epic Games Store (via EA App)' | 'EA App Direct' | 'Steam';
}

export interface SetupStep {
  id: string;
  number: number;
  title: string;
  summary: string;
  details: string[];
  commands?: {
    label: string;
    command: string;
    type: 'powershell' | 'cmd' | 'run';
  }[];
  criticalWarning?: string;
  safetyCheck: string;
  quickIssues?: string[];
}

export interface RiskItem {
  area: string;
  riskLevel: 'Safe' | 'Low Risk' | 'High Risk if Neglected' | 'Critical Warning';
  description: string;
  howWePreventIt: string;
  technicalReason: string;
}

export type ActiveTab = 'wizard-option-b' | 'script-option-a' | 'simulator' | 'safety-matrix' | 'update-protocol';
