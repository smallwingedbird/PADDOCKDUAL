import { PathConfig, SetupStep, RiskItem } from '../types';

export const DEFAULT_PATH_CONFIG: PathConfig = {
  cleanGamePath: 'D:\\Games\\F1 25',
  offlineGamePath: 'D:\\Games\\F1 25 - Offline',
  swoftyExePath: 'C:\\Program Files\\Swofty Launcher\\SwoftyLauncher.exe',
  windowsAccountName: 'Offline Gaming',
  gameVersion: 'F1 25',
  platform: 'Epic Games Store (via EA App)',
};

export function getOptionBSteps(config: PathConfig): SetupStep[] {
  const cleanDir = config.cleanGamePath;
  const offlineDir = config.offlineGamePath;
  const cleanTempDir = cleanDir + ' - Clean';
  const gameExe = 'F1_25.exe';

  return [
    {
      id: 'step-0',
      number: 0,
      title: 'Prerequisite: Turn Off EA Cloud Saves',
      summary: 'Prevent the EA App from silently uploading or synchronizing save progress from your computer to cloud servers.',
      details: [
        'Open the EA App on your PC.',
        'Click on your profile avatar in the top-right corner and select "Settings".',
        'Navigate to the "Application" tab on the left.',
        'Scroll to "Cloud storage" and toggle OFF "Enable cloud storage for all supported games".',
        'Close the EA App and Epic Games Launcher completely from the Windows system tray (near the clock).'
      ],
      safetyCheck: 'Verify EA App and Epic Games processes are completely closed before renaming folders.',
      quickIssues: [
        'EA App cloud save toggle is greyed out or missing',
        'EA background services (EABackgroundService) won\'t close',
        'Save file warning: "Cloud sync error" appeared on exit'
      ]
    },
    {
      id: 'step-1',
      number: 1,
      title: 'Duplicate Your Clean Game Folder',
      summary: `Create an independent copy of your intact game directory at "${offlineDir}".`,
      details: [
        `Open Windows File Explorer and navigate to your game drive: "${cleanDir.substring(0, cleanDir.lastIndexOf('\\'))}".`,
        `Right-click the folder "${cleanDir.split('\\').pop()}", click "Copy", and paste it into the same directory.`,
        `Rename the newly copied folder to: "${offlineDir.split('\\').pop()}".`,
        'Ensure you have sufficient free disk space (approx. 60–80 GB for a full install duplication).'
      ],
      commands: [
        {
          label: 'PowerShell Instant Copy Command (Robocopy fast multi-thread)',
          command: `robocopy "${cleanDir}" "${offlineDir}" /E /MT:8`,
          type: 'powershell'
        }
      ],
      safetyCheck: `Verify you now see both "${cleanDir}" and "${offlineDir}" in File Explorer.`,
      quickIssues: [
        'Robocopy error: "Access is denied" or Error Code 5',
        'Not enough disk space on drive D: to duplicate full game',
        'Robocopy hangs or seems frozen on large pak files'
      ]
    },
    {
      id: 'step-2',
      number: 2,
      title: 'The 10-Second Folder Swap & CreamInstaller',
      summary: 'Trick CreamInstaller into unlocking the offline copy while leaving your original clean game 100% untouched.',
      details: [
        'Ensure EA App and Epic Games Launcher are completely closed.',
        `Rename "${cleanDir.split('\\').pop()}" to "${cleanTempDir.split('\\').pop()}". (Protects your real clean game).`,
        `Rename "${offlineDir.split('\\').pop()}" to "${cleanDir.split('\\').pop()}". (Temporary so CreamInstaller detects it).`,
        'Download CreamInstaller from GitHub (ubden/CreamInstaller) and run CreamInstaller.exe.',
        'Wait for it to scan. Check the box for F1 25 and check all DLC packages you wish to unlock.',
        'Click "Generate and Install". Wait for the success confirmation, then close CreamInstaller.',
        `Immediately swap the names back:`,
        `1. Rename "${cleanDir.split('\\').pop()}" back to "${offlineDir.split('\\').pop()}".`,
        `2. Rename "${cleanTempDir.split('\\').pop()}" back to "${cleanDir.split('\\').pop()}".`
      ],
      criticalWarning: 'Never launch the EA App while the folders are in swapped state! Always finish reverting the folder names first.',
      safetyCheck: `Double-check your clean folder "${cleanDir}" has original unmodified DLLs and only "${offlineDir}" contains the proxy DLLs.`,
      quickIssues: [
        'CreamInstaller does not detect F1 25 in the list',
        'Windows Defender quarantined or blocked CreamInstaller.exe',
        'I accidentally launched the EA App while folders were swapped',
        'Which DLC boxes should I check in CreamInstaller?'
      ]
    },
    {
      id: 'step-3',
      number: 3,
      title: 'Create the Second Local Windows User Account',
      summary: `Create a dedicated local Windows profile ("${config.windowsAccountName}") with Administrator rights for Swofty.`,
      details: [
        'Press Win + I to open Windows Settings, then navigate to Accounts → Other users (or Family & other users).',
        'Click "Add account" (or "Add someone else to this PC").',
        'Click "I don\'t have this person\'s sign-in information", then click "Add a user without a Microsoft account".',
        `Enter the account name: "${config.windowsAccountName}" and optionally set a password (or leave blank).`,
        'Click Next to finish creation.',
        'Click on the new account in Settings, select "Change account type", and select "Administrator".',
        'Why Administrator? Swofty Launcher requires elevated permissions to suspend EA Anti-Cheat kernel drivers safely.'
      ],
      commands: [
        {
          label: 'One-Click Admin Command Prompt / PowerShell User Creation',
          command: `net user "${config.windowsAccountName}" /add & net localgroup administrators "${config.windowsAccountName}" /add`,
          type: 'cmd'
        }
      ],
      safetyCheck: `Confirm "${config.windowsAccountName}" appears under Local Users with Administrator privileges.`,
      quickIssues: [
        'Command "net user" returned: "System error 5 has occurred. Access is denied."',
        'New account does not show up on Windows login lock screen',
        'Can I set a password or PIN for the Offline Gaming account?',
        'Do I need to sign in with a Microsoft account or email?'
      ]
    },
    {
      id: 'step-4',
      number: 4,
      title: 'First-Time Setup in the Offline Windows Profile',
      summary: 'Sign into the new profile, configure Swofty Launcher to target the offline copy, and test boot.',
      details: [
        `Click your Windows Start Menu profile icon and click "Switch user" or sign out.`,
        `Log into "${config.windowsAccountName}". Windows will spend about 30 seconds setting up your fresh user desktop.`,
        'Open Swofty Launcher from its install directory or start menu.',
        'In Swofty Launcher Settings / Game Paths, specify the offline executable:',
        `Path: "${offlineDir}\\${gameExe}"`,
        'Toggle ON "Bypass Anti-Cheat / Offline Mode" in Swofty Launcher.',
        'Click Play / Launch Game via Swofty Launcher.',
        'The game boots completely offline: save files are automatically isolated in C:\\Users\\' + config.windowsAccountName + '\\Documents\\My Games\\F1 25!'
      ],
      safetyCheck: 'Check that the game boots without EA Anti-Cheat splash screen and shows DLC liveries/content available.',
      quickIssues: [
        'Game crashes on launch through Swofty Launcher',
        'EA Anti-Cheat splash screen still appears on startup',
        'DLC content (liveries/tracks) is still locked in game',
        'My steering wheel / controller calibration is missing in new account'
      ]
    }
  ];
}

export function generateOnlineBatchScript(config: PathConfig): string {
  const gameDir = config.cleanGamePath;
  return `@echo off
:: ========================================================
:: PaddockDual - Official F1 Online Launcher (Option A)
:: Safe Official Launch with Save Folder Protection
:: ========================================================
title F1 Online Launcher - Official AntiCheat
echo [PaddockDual] Preparing Clean Online Environment...

:: 1. Safety verification of clean game path
if not exist "${gameDir}" (
    echo [ERROR] Clean game directory not found at:
    echo "${gameDir}"
    pause
    exit /b
)

:: 2. Swap Save Folders safely in Documents
cd /d "%USERPROFILE%\\Documents\\My Games"
if not exist "My Games" mkdir "%USERPROFILE%\\Documents\\My Games"

:: If an active save exists, rename it to Offline
if exist "F1 25" (
    echo [PaddockDual] Shelving current save to F1 25_Offline...
    if exist "F1 25_Offline" rmdir /s /q "F1 25_Offline_Backup" 2>nul
    ren "F1 25" "F1 25_Offline"
)

:: If a clean online save exists, activate it
if exist "F1 25_Online" (
    echo [PaddockDual] Activating clean official save...
    ren "F1 25_Online" "F1 25"
)

echo [PaddockDual] Save environment is CLEAN.
echo [PaddockDual] Launching EA / Epic Official Game...
start "" "${gameDir}\\F1_25.exe"
exit
`;
}

export function generateOfflineBatchScript(config: PathConfig): string {
  const swoftyPath = config.swoftyExePath;
  const offlineDir = config.offlineGamePath;

  return `@echo off
:: ========================================================
:: PaddockDual - Modded F1 Offline Launcher (Option A)
:: Swofty Launcher & DLC Unlocker Isolated Environment
:: ========================================================
title F1 Offline Launcher - Swofty Offline Mode
echo [PaddockDual] Preparing Offline Modded Environment...

:: 1. Verify offline game directory
if not exist "${offlineDir}" (
    echo [ERROR] Offline game directory not found at:
    echo "${offlineDir}"
    pause
    exit /b
)

:: 2. Swap Save Folders in Documents
cd /d "%USERPROFILE%\\Documents\\My Games"

:: If an active save exists, shelve it as Online
if exist "F1 25" (
    echo [PaddockDual] Shelving clean save to F1 25_Online...
    ren "F1 25" "F1 25_Online"
)

:: If an offline save exists, restore it as active
if exist "F1 25_Offline" (
    echo [PaddockDual] Activating modded offline save...
    ren "F1 25_Offline" "F1 25"
)

echo [PaddockDual] Starting Swofty Launcher in Offline Mode...
if exist "${swoftyPath}" (
    start "" "${swoftyPath}"
) else (
    echo [NOTICE] Swofty Launcher executable not found at specified path.
    echo Launching offline game executable directly:
    start "" "${offlineDir}\\F1_25.exe"
)
exit
`;
}

export const SAFETY_RISK_ITEMS: RiskItem[] = [
  {
    area: 'EA Anti-Cheat (EAAC) Kernel Detection',
    riskLevel: 'Safe',
    description: 'EAAC operates at kernel ring 0 and scans memory and active game binaries on boot for unauthorized DLL proxies.',
    howWePreventIt: 'By keeping your official game folder clean and only running Swofty Launcher on the isolated duplicate with anti-cheat bypassed, EAAC never sees or scans modified DLLs.',
    technicalReason: 'Swofty Launcher intercepts the boot sequence, blocks the EA AntiCheat service initialization, and runs the game in offline sandbox mode.'
  },
  {
    area: 'Accidental Official Launch with Modified DLLs',
    riskLevel: 'High Risk if Neglected',
    description: 'Launching the game through the EA App or Epic Games while proxy DLLs (version.dll, SmokeAPI) sit in the main folder.',
    howWePreventIt: 'The Folder Swap step ensures CreamInstaller NEVER touches D:\\Games\\F1 25. The official path always points to untouched files.',
    technicalReason: 'EA App checks folder file hashes and signatures on startup. If unverified DLLs reside in the registered path, EAAC halts boot and reports the hash mismatch.'
  },
  {
    area: 'Save Profile Entitlement Mismatches',
    riskLevel: 'Critical Warning',
    description: 'Saving a profile that has unlocked DLC (championship tracks, special liveries, podium passes) and later loading it in official online play.',
    howWePreventIt: 'Option B separates Windows user accounts so each has its own independent Documents\\My Games folder. Option A swaps folders automatically.',
    technicalReason: 'When the game connects to EA Racenet servers, it compares local inventory flags with the EA server entitlement token. A mismatch triggers a "Save Corrupted" error or flags account telemetry.'
  },
  {
    area: 'EA Cloud Saves Cross-Sync',
    riskLevel: 'Low Risk',
    description: 'EA Cloud synchronization overwriting local clean saves or transmitting offline progress to EA servers.',
    howWePreventIt: 'Step 0 disables EA Cloud storage in the EA App settings, guaranteeing that save files stay exclusively local.',
    technicalReason: 'EA Cloud Storage only triggers when the game client terminates cleanly and syncs with cloud buckets. Disabling it prevents automatic background upload.'
  },
  {
    area: 'DLC Raw Assets vs License Hooks',
    riskLevel: 'Safe',
    description: 'CreamInstaller only patches API hooks; missing raw asset files (3D models, audio, textures) can cause crashes.',
    howWePreventIt: 'F1 25 standard installs bundle all liveries, helmets, and track geometry in the main package. Swofty Launcher handles additional community asset mixins.',
    technicalReason: 'SmokeAPI and CreamAPI spoof ownership flags. Since F1 25 base install contains the encrypted asset packages, the unlocker successfully exposes them without extra downloads.'
  }
];

export const FREQUENT_QUESTIONS = [
  {
    q: 'Why Option B (Windows User) instead of Option A (Batch Script)?',
    a: 'Option B offers true physical filesystem isolation. Windows creates a brand new C:\\Users\\Offline Gaming\\Documents folder that is completely inaccessible to your primary account\'s game instances. You never have to worry about script timing, folder renaming errors, or accidental clicks.'
  },
  {
    q: 'Do I have to re-download the entire 70GB game for the offline copy?',
    a: 'No! You simply copy and paste your existing D:\\Games\\F1 25 folder into D:\\Games\\F1 25 - Offline on the same drive. If you use our fast robocopy command or standard Windows copy, it takes 3 to 7 minutes on an SSD.'
  },
  {
    q: 'Will my steering wheel / controller calibration transfer to the new Windows account?',
    a: 'Wheel drivers (Fanatec, Logitech G HUB, Thrustmaster) run system-wide, so your wheel will work immediately. In-game button mappings and force feedback calibration reside in hardware_settings_config.xml. You can copy that single XML file from your main Documents folder to your new profile\'s Documents folder.'
  },
  {
    q: 'What happens when EA pushes a patch or Title Update?',
    a: 'Update the CLEAN game on your main account via EA/Epic. Test that online play works. Then wait a few days for Swofty Launcher to update its anti-cheat bypass offsets before copying the updated files over to your offline folder.'
  },
  {
    q: 'Windows Defender flags CreamInstaller as HackTool:Win32/GameHack. Is it safe?',
    a: 'Yes, this is an expected false-positive. All DLL proxy generators (CreamAPI, SmokeAPI) are categorized as "HackTool" or "Riskware" because they intercept API entitlement calls. Provided you download from the official GitHub (ubden/CreamInstaller), it is verified open-source.'
  }
];
