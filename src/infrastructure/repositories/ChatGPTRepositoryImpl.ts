import ChatGPTRepository from '../../domain/repositories/ChatGPTRepository';
import apiClient, { updateAuthorization } from '../utils/ApiClient';
import AbstractChatGPTInfo from './AbstractChatGPTInfo';


class ChatGPTRepositoryImpl extends AbstractChatGPTInfo implements ChatGPTRepository {
  public constructor(apiKey: string | undefined) {
    super(apiKey);
    updateAuthorization('Bearer ' + apiKey);
  }

  async getCompletion(prompt: string, volatility: number = 0.8, tokens: number = 1000, numberOfResponsesToGenerate = 1): Promise<string> {
    const payload = {
      max_tokens: tokens,
      temperature: volatility,
      n: numberOfResponsesToGenerate,
      model: this.model,
      'messages': [{ 'role': 'system', 'content': 'You are a helpful assistant.' },
        { 'role': 'user', 'content': prompt },
      ],
    };

    const completion = await apiClient.post(`${this.completionsUri}`, payload);
    this.getUsageCost(completion);
    return completion.data;
  }

  async get2(prompt: string): Promise<any> {
    const get = await apiClient.post(`/${this.completionsUri}`, { params: { status } });
    return get.data;
  }

}

export default ChatGPTRepositoryImpl;
