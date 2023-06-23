import ChatGPTRepository from "../../domain/repositories/ChatGPTRepository";
import apiClient from "../utils/ApiClient";

const version = "v1";
const engine = "chat";
const model = "davinci-003";
// https://api.openai.com/v1/chat/completions
const uri = `${version}/${engine}/${model}`;

class ChatGPTRepositoryImpl implements ChatGPTRepository {

  async getCompletion(prompt: string, volatility: number = 0.8, tokens: number = 100): Promise<string> {
    const payload = {
      prompt, max_tokens: tokens,
      temperature: volatility,
      n: 1,
      model: model
    };

    const completion = await apiClient.post(`/v1/chat/completions`, payload);
    console.log(completion);
    console.log(completion.data);
    return completion.data;
  }

  async get(prompt: string): Promise<string> {
    console.log("WRONGGGGGGGGGGGGGGGGGGG");
    const get = await apiClient.post(`/${uri}/completions`, prompt);
    return get.data;
  }

  async get2(prompt: string): Promise<string> {
    const get = await apiClient.post(`/${uri}/completions`, { params: { status } });
    return get.data;
  }

}

export default ChatGPTRepositoryImpl;
