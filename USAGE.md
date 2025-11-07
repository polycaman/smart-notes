# Smart Notes Usage Guide

## Overview

Smart Notes is an Electron-based desktop application that combines note-taking with AI-powered text improvement. The application features a split-view interface where you can write notes on the left and use AI to improve them on the right.

## Main Components

### 1. Notes Sidebar
Located on the left side of the main screen:
- Displays all your saved notes
- Click any note to select and edit it
- Shows note title, preview, and last modified date
- Click "+ New Note" to create a new note
- Click 🗑️ to delete a note (with confirmation)

### 2. Note Editor
Main editing area:
- **Title Field**: Edit the note's title at the top
- **Content Area**: Large text area for your note content
- **Voice Controls**:
  - 🎤 (Microphone): Start speech-to-text for writing
  - 🔴 (Red Recording): Stop recording
  - 🔊 (Speaker): Read the note aloud
  - 🔇 (Mute): Stop reading
- Auto-saves when you finish editing

### 3. AI Fixer Panel
Right side panel for AI assistance:
- **Prompt Input**: Describe what you want the AI to do
  - Examples: "Fix grammar", "Make it formal", "Summarize in 3 sentences"
  - Use the 🎤 button to speak your prompt
- **Fix Text Button**: Send your note to AI for processing
- **Result Area**: Shows the AI-improved version
- **Apply to Note**: Replace your note with the AI version
- **Clear**: Reset the fixer panel

## Features in Detail

### Creating and Managing Notes

1. **New Note**: Click "+ New Note" in the sidebar
2. **Edit Title**: Click the title field and type
3. **Edit Content**: Click in the main text area and type or speak
4. **Save**: Changes auto-save when you click outside the field
5. **Delete**: Click 🗑️ next to any note in the sidebar

### Speech-to-Text

The application uses your browser's built-in speech recognition:

1. **For Notes**: 
   - Click the 🎤 microphone icon in the editor header
   - Speak clearly
   - Your words will be appended to the note
   - Icon turns 🔴 while listening

2. **For Prompts**:
   - Click the 🎤 icon next to the prompt field
   - Speak your instruction
   - Text appears in the prompt field

**Note**: Speech recognition requires microphone permissions and may not work in all browsers.

### Text-to-Speech

- Click 🔊 to have your note read aloud
- Click 🔇 to stop playback
- Uses your system's default voice

### AI Text Fixing

The AI Fixer can help you:
- **Fix errors**: "Fix grammar and spelling"
- **Change tone**: "Make it more professional" / "Make it casual"
- **Rewrite**: "Simplify this" / "Make it more detailed"
- **Summarize**: "Summarize in 3 bullets"
- **Translate style**: "Rewrite as a formal email"

**How to use**:
1. Make sure you have a note selected with content
2. Type or speak your instruction in the Prompt field
3. Click "Fix Text"
4. Wait for AI to process (button shows "Processing...")
5. Review the result
6. Click "Apply to Note" to use it, or "Clear" to try again

## Settings

Access settings by clicking "Settings" in the top navigation bar.

### AI Provider Configuration

Choose between two AI providers:

#### Ollama (Local)
- **Pros**: Private, offline, no API costs
- **Cons**: Requires local installation and setup
- **Setup**:
  1. Install Ollama from [ollama.ai](https://ollama.ai)
  2. Download a model: `ollama pull llama2`
  3. Ensure Ollama is running
  4. Configure:
     - Server URL: `http://localhost:11434` (default)
     - Model: `llama2` (or another model you downloaded)

#### ChatGPT (Cloud)
- **Pros**: Powerful, no local setup required
- **Cons**: Requires API key, costs money, needs internet
- **Setup**:
  1. Create account at [OpenAI Platform](https://platform.openai.com)
  2. Generate API key
  3. Configure:
     - API Key: Your OpenAI key (starts with `sk-`)
     - Model: `gpt-3.5-turbo` (fast, cheap) or `gpt-4` (better, expensive)

## Keyboard Shortcuts

Currently, the application uses mouse/touch interaction. Future versions may include keyboard shortcuts.

## Troubleshooting

### Speech Recognition Not Working
- Check microphone permissions in your browser/system
- Ensure you're using a supported browser (Chrome, Edge)
- Make sure your microphone is working in other applications

### AI Fixer Errors

**Ollama Errors**:
- "Failed to connect to Ollama": Make sure Ollama is running
- Check the server URL in Settings
- Verify the model is downloaded: `ollama list`

**ChatGPT Errors**:
- "Invalid API key": Check your API key in Settings
- "Failed to connect": Check internet connection
- Check your OpenAI account has credits

### Notes Not Saving
- This shouldn't happen as saves are automatic
- Check the console for errors (View > Developer Tools)
- Notes are stored in your system's user data directory

## Data Storage

- **Notes**: Stored in your system's application data folder
  - Windows: `%APPDATA%/smart-notes/notes/`
  - macOS: `~/Library/Application Support/smart-notes/notes/`
  - Linux: `~/.config/smart-notes/notes/`
- **Settings**: Same location, `settings.json`
- Each note is a separate JSON file named by its ID

## Tips for Best Results

1. **Clear Prompts**: Be specific in your AI prompts
   - Good: "Fix grammar and make it more professional"
   - Bad: "Make it better"

2. **Iterate**: Don't be afraid to try different prompts
   - Start with basic fixes
   - Then refine with more specific requests

3. **Voice Input**: Speak naturally and pause between thoughts
   - The system works best with clear speech
   - Background noise can affect accuracy

4. **AI Provider**: Choose based on your needs
   - Use Ollama for privacy and offline work
   - Use ChatGPT for best quality and speed

## Privacy & Security

- **Local Mode (Ollama)**: Everything stays on your computer
- **Cloud Mode (ChatGPT)**: Your notes are sent to OpenAI's servers
- **API Keys**: Stored locally, never transmitted except to the configured service
- **Notes**: Stored locally on your computer, never uploaded anywhere else
