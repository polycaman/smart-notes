import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  constructor(
    private http: HttpClient,
    private settingsService: SettingsService
  ) {}

  async fixText(prompt: string, textToFix: string): Promise<string> {
    const settings = this.settingsService.getSettings();
    
    if (settings.aiProvider === 'ollama') {
      return this.fixWithOllama(prompt, textToFix, settings);
    } else {
      return this.fixWithChatGPT(prompt, textToFix, settings);
    }
  }

  private async fixWithOllama(prompt: string, textToFix: string, settings: any): Promise<string> {
    try {
      const fullPrompt = `${prompt}\n\nText to fix:\n${textToFix}\n\nProvide only the corrected text without any explanation:`;
      
      const response = await firstValueFrom(
        this.http.post<any>(`${settings.ollamaUrl}/api/generate`, {
          model: settings.ollamaModel,
          prompt: fullPrompt,
          stream: false
        })
      );

      return response.response || 'No response from Ollama';
    } catch (error) {
      console.error('Ollama error:', error);
      throw new Error('Failed to connect to Ollama. Make sure the server is running.');
    }
  }

  private async fixWithChatGPT(prompt: string, textToFix: string, settings: any): Promise<string> {
    try {
      if (!settings.chatgptApiKey) {
        throw new Error('ChatGPT API key is not configured');
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.chatgptApiKey}`
      });

      const response = await firstValueFrom(
        this.http.post<any>('https://api.openai.com/v1/chat/completions', {
          model: settings.chatgptModel,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that fixes and improves text based on user instructions. Provide only the corrected text without any explanation.'
            },
            {
              role: 'user',
              content: `${prompt}\n\nText to fix:\n${textToFix}`
            }
          ],
          temperature: 0.7
        }, { headers })
      );

      return response.choices[0]?.message?.content || 'No response from ChatGPT';
    } catch (error: any) {
      console.error('ChatGPT error:', error);
      if (error.status === 401) {
        throw new Error('Invalid ChatGPT API key');
      }
      throw new Error('Failed to connect to ChatGPT API');
    }
  }
}
