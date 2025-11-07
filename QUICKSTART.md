# Quick Start Guide

Get Smart Notes running in 5 minutes!

## Prerequisites

- Node.js 20+ and npm 10+
- For Ollama: [Install Ollama](https://ollama.ai) (optional)
- For ChatGPT: [OpenAI API Key](https://platform.openai.com/api-keys) (optional)

## Installation

```bash
# Clone the repository
git clone https://github.com/polycaman/smart-notes.git
cd smart-notes

# Install dependencies
npm install

# Build the application
npm run build

# Run the application
npm run electron-build
```

## First Time Setup

### Option 1: Using Ollama (Local, Private, Offline)

1. Install Ollama from [ollama.ai](https://ollama.ai)

2. Download a model:
   ```bash
   ollama pull llama2
   ```

3. Verify Ollama is running:
   ```bash
   ollama list
   ```

4. In Smart Notes:
   - Go to Settings
   - Select "Ollama (Local)"
   - Keep default URL: `http://localhost:11434`
   - Set Model: `llama2`
   - Click "Save Settings"

### Option 2: Using ChatGPT (Cloud, Internet Required)

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)

2. In Smart Notes:
   - Go to Settings
   - Select "ChatGPT (Cloud)"
   - Enter your API Key
   - Choose Model (start with `gpt-3.5-turbo`)
   - Click "Save Settings"

## Basic Usage

### Creating Your First Note

1. Click "+ New Note" in the sidebar
2. Click the title field and type a title
3. Click the content area and start typing
4. Your note auto-saves!

### Using Voice Input

1. Click the 🎤 microphone button
2. Allow microphone permissions if prompted
3. Speak clearly
4. Your words appear in the note

### Using AI Fixer

1. Write or paste some text in a note
2. In the AI Fixer panel, enter a prompt like:
   - "Fix grammar and spelling"
   - "Make this more professional"
   - "Summarize in 3 bullets"
3. Click "Fix Text"
4. Review the result
5. Click "Apply to Note" to use it

## Example Workflow

```
1. Create a new note
   ↓
2. Write quick thoughts using voice or keyboard
   ↓
3. Use AI to fix grammar: "Fix grammar and spelling"
   ↓
4. Apply the fixed version
   ↓
5. Use AI again to improve: "Make it more professional"
   ↓
6. Apply and you're done!
```

## Troubleshooting

### "Speech recognition not supported"
- Use Chrome or Edge browser engine
- Check microphone permissions

### "Failed to connect to Ollama"
- Make sure Ollama is running: `ollama list`
- Check the server URL in Settings

### "Invalid ChatGPT API key"
- Verify your API key at [OpenAI Platform](https://platform.openai.com/api-keys)
- Make sure you have credits in your account

## Tips for Best Results

1. **Voice Input**: Speak clearly, pause between sentences
2. **AI Prompts**: Be specific about what you want
3. **Iterate**: Try different prompts if the first result isn't perfect
4. **Save Often**: Notes auto-save, but you can manually save with Ctrl+S (coming soon)

## Next Steps

- Read the full [Usage Guide](USAGE.md)
- Explore the [Architecture](ARCHITECTURE.md)
- Try different AI models
- Experiment with voice commands

## Getting Help

- Check [USAGE.md](USAGE.md) for detailed documentation
- Review [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- File issues on GitHub for bugs or feature requests

## Development Mode

For development with hot reload:

```bash
# Terminal 1: Start Angular dev server
npm start

# Terminal 2: Start Electron
npm run electron
```

The app will reload automatically when you change files.

---

**Enjoy taking smarter notes! 📝✨**
