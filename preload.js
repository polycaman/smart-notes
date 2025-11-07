const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveNote: (note) => ipcRenderer.invoke('save-note', note),
  loadNotes: () => ipcRenderer.invoke('load-notes'),
  deleteNote: (noteId) => ipcRenderer.invoke('delete-note', noteId),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  loadSettings: () => ipcRenderer.invoke('load-settings')
});
