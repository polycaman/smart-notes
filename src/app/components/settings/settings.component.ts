import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/settings.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings = {
    aiProvider: 'ollama',
    ollamaUrl: 'http://localhost:11434',
    ollamaModel: 'llama2',
    chatgptApiKey: '',
    chatgptModel: 'gpt-3.5-turbo'
  };
  
  saveMessage = '';
  showApiKey = false;

  constructor(private settingsService: SettingsService) {}

  async ngOnInit() {
    this.settings = await this.settingsService.loadSettings();
  }

  async saveSettings() {
    try {
      await this.settingsService.saveSettings(this.settings);
      this.saveMessage = 'Settings saved successfully!';
      setTimeout(() => {
        this.saveMessage = '';
      }, 3000);
    } catch (error) {
      this.saveMessage = 'Failed to save settings';
    }
  }

  toggleApiKeyVisibility() {
    this.showApiKey = !this.showApiKey;
  }
}
