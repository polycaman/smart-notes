export interface Settings {
  aiProvider: 'ollama' | 'chatgpt';
  ollamaUrl: string;
  ollamaModel: string;
  chatgptApiKey: string;
  chatgptModel: string;
}
