# Smart Notes - Application Architecture

## Project Structure

```
smart-notes/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── notes/
│   │   │   │   ├── notes.component.ts       # Main notes view controller
│   │   │   │   ├── notes.component.html     # Notes template with split view
│   │   │   │   └── notes.component.css      # Notes styling
│   │   │   └── settings/
│   │   │       ├── settings.component.ts     # Settings controller
│   │   │       ├── settings.component.html   # Settings template
│   │   │       └── settings.component.css    # Settings styling
│   │   ├── services/
│   │   │   ├── notes.service.ts             # Note CRUD operations
│   │   │   ├── settings.service.ts          # Settings management
│   │   │   ├── speech.service.ts            # TTS and STT features
│   │   │   └── ai.service.ts                # AI integration (Ollama/ChatGPT)
│   │   ├── models/
│   │   │   ├── note.model.ts                # Note data structure
│   │   │   └── settings.model.ts            # Settings data structure
│   │   ├── app.component.ts                 # Root component with navigation
│   │   └── app.routes.ts                    # Application routing
│   ├── assets/                              # Static assets
│   ├── electron.d.ts                        # TypeScript definitions for Electron API
│   ├── index.html                           # Main HTML file
│   ├── main.ts                              # Angular bootstrap
│   └── styles.css                           # Global styles
├── main.js                                  # Electron main process
├── preload.js                               # Electron preload script
├── package.json                             # Dependencies and scripts
├── angular.json                             # Angular CLI configuration
├── tsconfig.json                            # TypeScript configuration
├── README.md                                # Project documentation
└── USAGE.md                                 # User guide

## Application Architecture

### Electron Layer
- **main.js**: Main process that creates the browser window and handles IPC
- **preload.js**: Secure bridge between renderer and main process
- **IPC Handlers**: Save/load notes, save/load settings

### Angular Layer
- **Standalone Components**: Modern Angular 17 architecture
- **Services**: Business logic and API communication
- **Routing**: Navigation between Notes and Settings views

### Data Flow

1. **Note Operations**:
   ```
   UI (Component) → NotesService → IPC (preload) → Main Process → File System
   ```

2. **AI Operations**:
   ```
   UI (Component) → AiService → HTTP → Ollama/ChatGPT API
   ```

3. **Speech Operations**:
   ```
   UI (Component) → SpeechService → Web Speech API
   ```

## UI Layout

### Notes View (Split View)

```
┌─────────────────────────────────────────────────────────────┐
│  📝 Smart Notes                    [Notes] [Settings]        │
├─────────────┬───────────────────────┬───────────────────────┤
│   SIDEBAR   │   NOTE EDITOR         │   AI FIXER PANEL      │
│             │                       │                       │
│ [+ New]     │ Title: ___________    │ 🤖 AI Text Fixer      │
│             │ [🎤] [🔊] [🔇]        │                       │
│ > Note 1    │                       │ Prompt:               │
│   Note 2    │ ┌─────────────────┐  │ ┌─────────────────┐  │
│   Note 3    │ │                 │  │ │ Fix grammar     │🎤 │
│             │ │  Note content   │  │ └─────────────────┘  │
│             │ │  goes here...   │  │                       │
│             │ │                 │  │ [Fix Text] [Clear]    │
│             │ │                 │  │                       │
│             │ └─────────────────┘  │ Fixed Text:           │
│             │                       │ ┌─────────────────┐  │
│             │                       │ │ Result appears  │  │
│             │                       │ │ here...         │  │
│             │                       │ └─────────────────┘  │
│             │                       │ [Apply to Note]       │
└─────────────┴───────────────────────┴───────────────────────┘
```

### Settings View

```
┌─────────────────────────────────────────────────────────────┐
│  📝 Smart Notes                    [Notes] [Settings]        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ⚙️ Settings                                                 │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ AI Provider                                         │    │
│  │ ○ Ollama (Local)  ○ ChatGPT (Cloud)               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Ollama Configuration                                │    │
│  │ Server URL: http://localhost:11434                 │    │
│  │ Model: llama2                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  [Save Settings]                                             │
│                                                               │
│  ℹ️ Information                                              │
│  - Setup instructions for Ollama                             │
│  - Setup instructions for ChatGPT                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Key Features Implementation

### 1. Notes Management
- **Location**: `src/app/components/notes/notes.component.ts`
- **Service**: `src/app/services/notes.service.ts`
- **Storage**: Electron IPC → Local file system (JSON files)
- **Auto-save**: On blur events from input fields

### 2. Text-to-Speech (Writing)
- **Location**: `src/app/services/speech.service.ts`
- **API**: Web Speech API (SpeechRecognition)
- **Trigger**: Microphone button in note editor
- **Visual Feedback**: Button changes to 🔴 while recording

### 3. Speech-to-Text (Reading)
- **Location**: `src/app/services/speech.service.ts`
- **API**: Web Speech API (SpeechSynthesis)
- **Trigger**: Speaker button in note editor
- **Control**: Mute button to stop

### 4. AI Fixer Panel
- **Location**: Right panel in notes view
- **Components**:
  - Prompt input (with voice support)
  - Fix button (processes with AI)
  - Result display area
  - Apply button (replaces note content)
- **AI Service**: `src/app/services/ai.service.ts`

### 5. Ollama Integration
- **Endpoint**: POST to `{ollamaUrl}/api/generate`
- **Parameters**: model, prompt, stream=false
- **Configuration**: Settings page
- **Local**: No internet required

### 6. ChatGPT Integration
- **Endpoint**: POST to `https://api.openai.com/v1/chat/completions`
- **Authentication**: Bearer token (API key)
- **Configuration**: Settings page
- **Cloud**: Requires internet and API key

## Security Features

1. **Context Isolation**: Enabled in BrowserWindow
2. **Node Integration**: Disabled in renderer
3. **Preload Script**: Secure IPC bridge via contextBridge
4. **API Key Storage**: Local file system only
5. **No Remote Code**: All code bundled with app

## Build Process

1. **Development**:
   ```bash
   npm start          # Angular dev server
   npm run electron   # Electron with dev server
   ```

2. **Production**:
   ```bash
   npm run build          # Build Angular app
   npm run electron-build # Run Electron with built app
   npm run package        # Create installer
   ```

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Desktop Framework | Electron | 28.0.0 |
| Frontend Framework | Angular | 17.0.0 |
| Language | TypeScript | 5.2.0 |
| HTTP Client | @angular/common/http | 17.0.0 |
| Reactive Programming | RxJS | 7.8.0 |
| Voice API | Web Speech API | Browser Native |
| AI (Local) | Ollama | External Server |
| AI (Cloud) | OpenAI API | REST API |

## Data Storage

### Notes
- **Format**: JSON
- **Location**: `{userData}/notes/{noteId}.json`
- **Structure**:
  ```json
  {
    "id": "lz5x8y9z1a",
    "title": "My Note",
    "content": "Note content here...",
    "createdAt": "2025-11-07T10:00:00.000Z",
    "updatedAt": "2025-11-07T10:30:00.000Z"
  }
  ```

### Settings
- **Format**: JSON
- **Location**: `{userData}/settings.json`
- **Structure**:
  ```json
  {
    "aiProvider": "ollama",
    "ollamaUrl": "http://localhost:11434",
    "ollamaModel": "llama2",
    "chatgptApiKey": "",
    "chatgptModel": "gpt-3.5-turbo"
  }
  ```

## Error Handling

1. **Speech Recognition Errors**: User-friendly messages in UI
2. **AI Connection Errors**: Specific error messages (Ollama vs ChatGPT)
3. **File System Errors**: Handled in main process
4. **Network Errors**: HTTP error handling with meaningful messages

## Future Enhancements

Potential features for future versions:
- Note search and filtering
- Tags and categories
- Export notes (PDF, Markdown)
- Note sharing
- Custom voice models
- More AI providers (Claude, Gemini)
- Keyboard shortcuts
- Dark mode
- Note templates
- Collaborative editing
