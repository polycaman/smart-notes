const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the Angular app
  const indexPath = path.join(__dirname, 'dist', 'smart-notes', 'browser', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    mainWindow.loadFile(indexPath);
  } else {
    // For development - load from Angular dev server
    mainWindow.loadURL('http://localhost:4200');
  }

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for note operations
ipcMain.handle('save-note', async (event, note) => {
  const notesDir = path.join(app.getPath('userData'), 'notes');
  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir, { recursive: true });
  }
  
  const notePath = path.join(notesDir, `${note.id}.json`);
  fs.writeFileSync(notePath, JSON.stringify(note, null, 2));
  return { success: true };
});

ipcMain.handle('load-notes', async () => {
  const notesDir = path.join(app.getPath('userData'), 'notes');
  if (!fs.existsSync(notesDir)) {
    return [];
  }
  
  const files = fs.readdirSync(notesDir);
  const notes = files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const content = fs.readFileSync(path.join(notesDir, file), 'utf-8');
      return JSON.parse(content);
    });
  
  return notes;
});

ipcMain.handle('delete-note', async (event, noteId) => {
  const notesDir = path.join(app.getPath('userData'), 'notes');
  const notePath = path.join(notesDir, `${noteId}.json`);
  
  if (fs.existsSync(notePath)) {
    fs.unlinkSync(notePath);
    return { success: true };
  }
  
  return { success: false };
});

// IPC handlers for settings
ipcMain.handle('save-settings', async (event, settings) => {
  const settingsPath = path.join(app.getPath('userData'), 'settings.json');
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  return { success: true };
});

ipcMain.handle('load-settings', async () => {
  const settingsPath = path.join(app.getPath('userData'), 'settings.json');
  
  if (fs.existsSync(settingsPath)) {
    const content = fs.readFileSync(settingsPath, 'utf-8');
    return JSON.parse(content);
  }
  
  // Default settings
  return {
    aiProvider: 'ollama',
    ollamaUrl: 'http://localhost:11434',
    ollamaModel: 'llama2',
    chatgptApiKey: '',
    chatgptModel: 'gpt-3.5-turbo'
  };
});
