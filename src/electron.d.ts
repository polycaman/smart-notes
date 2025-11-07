import { Note } from './app/models/note.model';
import { Settings } from './app/models/settings.model';

declare global {
  interface Window {
    electronAPI: {
      saveNote: (note: Note) => Promise<{ success: boolean }>;
      loadNotes: () => Promise<Note[]>;
      deleteNote: (noteId: string) => Promise<{ success: boolean }>;
      saveSettings: (settings: Settings) => Promise<{ success: boolean }>;
      loadSettings: () => Promise<Settings>;
    };
  }
}

export {};
