import ChatGPTRepository from '../../domain/repositories/ChatGPTRepository';
import { CreateChatCompletionRequest } from 'openai/api';
import AbstractChatGPTInfo from './AbstractChatGPTInfo';
import { Configuration, OpenAIApi } from 'openai';


class OpenApiRepositoryImpl extends AbstractChatGPTInfo implements ChatGPTRepository {
  private readonly openai;

  public constructor(apiKey: string | undefined) {
    super(apiKey);
    const configuration = new Configuration({ apiKey: apiKey });
    this.openai = new OpenAIApi(configuration);
  }


  async getCompletion(prompt: string, volatility: number = 0.8, tokens: number = 100): Promise<any> {
    const payload = {
      max_tokens: tokens,
      temperature: volatility,
      n: 1,
      model: this.model,
      'messages': [{ 'role': 'system', 'content': 'You are a helpful assistant.' },
        { 'role': 'user', 'content': prompt },
      ],
    };

    const chatCompletion = await this.openai.createChatCompletion(payload as CreateChatCompletionRequest);
    this.getUsageCost(chatCompletion);
    return chatCompletion.data;
  }


  async get2(prompt: string): Promise<any> {
    // const getUsageCost = await apiClient.post(`/${completionsUri}/completions`, { params: { status } });
    return Promise.resolve(undefined);
  }


}

export default OpenApiRepositoryImpl;
