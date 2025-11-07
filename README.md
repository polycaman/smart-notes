# 📝 Smart Notes

A powerful desktop application for AI-powered note-taking. Write notes faster, cleaner, and simpler using text-to-speech and AI assistance!

## ✨ Features

- **Create, Edit, and Delete Notes**: Organize your thoughts with an intuitive note management system
- **Text-to-Speech Writing**: Write notes using your voice with built-in speech recognition
- **AI Text Fixer**: Improve your notes with AI assistance
  - Fix grammar and spelling
  - Rewrite in different styles
  - Summarize content
  - And more!
- **Dual AI Provider Support**:
  - **Ollama** (Local): Run AI models locally for privacy and offline use
  - **ChatGPT** (Cloud): Use OpenAI's powerful models
- **Split View Interface**: Work on your note while using the AI fixer side-by-side
- **Voice Commands**: Use speech-to-text for both notes and AI prompts

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm (v10 or later)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/polycaman/smart-notes.git
cd smart-notes
```

2. Install dependencies:
```bash
npm install
```

3. Build the Angular application:
```bash
npm run build
```

4. Run the Electron application:
```bash
npm run electron-build
```

## 🛠️ Development

To run the application in development mode:

1. Start the Angular development server:
```bash
npm start
```

2. In another terminal, run Electron:
```bash
npm run electron
```

## 🤖 AI Provider Setup

### Using Ollama (Local)

1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull a model:
```bash
ollama pull llama2
```
3. Make sure the Ollama server is running
4. Configure in Settings:
   - AI Provider: Ollama
   - Server URL: http://localhost:11434
   - Model: llama2 (or your chosen model)

### Using ChatGPT (Cloud)

1. Create an account at [OpenAI Platform](https://platform.openai.com)
2. Generate an API key from the dashboard
3. Configure in Settings:
   - AI Provider: ChatGPT
   - API Key: Your OpenAI API key
   - Model: gpt-3.5-turbo (or gpt-4)

## 📖 Usage

1. **Creating Notes**: Click "New Note" to create a new note
2. **Writing**: 
   - Type directly in the editor
   - Click the 🎤 microphone icon to use speech-to-text
   - Click 🔊 to have your note read aloud
3. **AI Fixer**:
   - Select a note
   - Enter a prompt (e.g., "Fix grammar" or "Make it more professional")
   - Use the 🎤 icon to speak your prompt
   - Click "Fix Text" to process
   - Review the result and click "Apply to Note" if satisfied

## 🏗️ Technology Stack

- **Electron**: Desktop application framework
- **Angular 17**: Frontend framework (standalone components)
- **TypeScript**: Type-safe development
- **Web Speech API**: Speech recognition and synthesis
- **Ollama API**: Local AI model integration
- **OpenAI API**: ChatGPT integration

## 📦 Building for Production

To package the application for distribution:

```bash
npm run package
```

This will create installers in the `release` directory.

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
