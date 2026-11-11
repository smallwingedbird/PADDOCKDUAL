import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side Gemini Client Initialization
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') return null;

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Route for Troubleshooting Specific Steps
app.post('/api/gemini/troubleshoot', async (req, res) => {
  try {
    const { stepNumber, stepTitle, stepSummary, config, userQuery, quickIssue } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      return res.status(200).json({
        success: true,
        isFallback: true,
        analysis: "API Key Note: To enable live dynamic responses from Gemini 3.8 Flash, make sure an API key is attached in Settings > Secrets.",
        immediateFix: [
          `For ${stepTitle || 'this step'}: Ensure all EA App and Epic Games background tasks are fully killed in Task Manager before renaming folders or running installers.`,
          `Check file paths: Clean path "${config?.cleanGamePath || 'D:\\Games\\F1 25'}" and Offline path "${config?.offlineGamePath || 'D:\\Games\\F1 25 - Offline'}".`,
          `If running scripts or net user commands, ensure PowerShell or Command Prompt is opened with "Run as Administrator".`
        ],
        commands: [
          `taskkill /F /IM EADesktop.exe /IM EpicGamesLauncher.exe 2>nul`,
          `robocopy "${config?.cleanGamePath || 'D:\\Games\\F1 25'}" "${config?.offlineGamePath || 'D:\\Games\\F1 25 - Offline'}" /E /MT:8`
        ],
        safetyVerdict: "Your clean online game remains protected as long as modified DLLs stay in the duplicate directory."
      });
    }

    const systemPrompt = `You are an expert PC Formula 1 gaming engineer and systems administrator specializing in dual-installation safety, EA Anti-Cheat (EAAC) kernel isolation, Windows user permissions, and Swofty Launcher modding.
The user is troubleshooting a specific step in their F1 dual-installation setup.

CURRENT CONFIGURATION:
- Clean/Official Game Directory: ${config?.cleanGamePath || 'D:\\Games\\F1 25'}
- Offline/Modded Game Directory: ${config?.offlineGamePath || 'D:\\Games\\F1 25 - Offline'}
- Swofty Launcher Executable: ${config?.swoftyExePath || 'C:\\Program Files\\Swofty Launcher\\SwoftyLauncher.exe'}
- Offline Windows User Account: ${config?.windowsAccountName || 'Offline Gaming'}
- Platform: ${config?.platform || 'Epic Games Store (via EA App)'}
- Game: ${config?.gameVersion || 'F1 25'}

STEP BEING TROUBLESHOOTED:
- Step Number: ${stepNumber}
- Step Name: ${stepTitle}
- Step Description: ${stepSummary}

USER ISSUE / QUESTION:
${quickIssue ? `Selected Issue: "${quickIssue}"\n` : ''}${userQuery ? `User notes: "${userQuery}"` : ''}

Provide a direct, practical, technical response in JSON format.
Rules:
1. Focus directly on the root cause and immediate solution.
2. Provide exact copyable commands (PowerShell or CMD) if a fix involves terminal or file operations.
3. Explicitly verify that their clean online game and EA account remain 100% safe from EA AntiCheat bans.
4. Keep the prose crisp and professional.

JSON structure:
{
  "analysis": "Short 1-2 sentence diagnosis of what went wrong or why this issue happens",
  "immediateFix": ["Step 1...", "Step 2...", "Step 3..."],
  "commands": ["command 1", "command 2"],
  "safetyVerdict": "One sentence reassurance on AntiCheat / save isolation"
}`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('GEMINI_API_TIMEOUT')), 10000)
    );

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Please diagnose and troubleshoot this step issue: ${quickIssue || ''} ${userQuery || ''}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const response = (await Promise.race([generatePromise, timeoutPromise])) as any;

    const text = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = {
        analysis: text,
        immediateFix: ["Review the step instructions and ensure all background launcher processes are closed."],
        commands: [],
        safetyVerdict: "Clean game path is untouched."
      };
    }

    return res.json({
      success: true,
      isFallback: false,
      ...parsedData,
    });
  } catch (error: any) {
    console.error('Gemini troubleshoot error:', error);

    const errorMessage = error?.message || 'Unknown error';
    let clientHelp = 'Failed to analyze step with Gemini.';
    if (errorMessage.includes('PERMISSION_DENIED') || errorMessage.includes('API_KEY_INVALID')) {
      clientHelp = 'Gemini API authentication error. Please verify your API key in Settings > Secrets.';
    }

    return res.status(200).json({
      success: false,
      error: clientHelp,
      analysis: 'Could not connect to Gemini service. Fallback diagnostic provided below.',
      immediateFix: [
        'Ensure EA App, Epic Games, and Swofty Launcher are fully closed in Task Manager.',
        'Run Command Prompt or PowerShell as Administrator.',
        'Double-check folder names: your clean game should be named exactly as registered in the EA App.'
      ],
      commands: [
        `taskkill /F /IM EADesktop.exe /IM EpicGamesLauncher.exe /IM SwoftyLauncher.exe 2>nul`
      ],
      safetyVerdict: 'Your files are unchanged and safe.'
    });
  }
});

// Mount Vite or static server
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`PaddockDual server running on port ${PORT}`);
});
