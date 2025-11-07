import { Injectable } from '@angular/core';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: Settings = {
    aiProvider: 'ollama',
    ollamaUrl: 'http://localhost:11434',
    ollamaModel: 'llama2',
    chatgptApiKey: '',
    chatgptModel: 'gpt-3.5-turbo'
  };

  async loadSettings(): Promise<Settings> {
    if (window.electronAPI) {
      this.settings = await window.electronAPI.loadSettings();
    }
    return this.settings;
  }

  async saveSettings(settings: Settings): Promise<void> {
    this.settings = settings;
    if (window.electronAPI) {
      await window.electronAPI.saveSettings(settings);
    }
  }

  getSettings(): Settings {
    return this.settings;
  }
}
