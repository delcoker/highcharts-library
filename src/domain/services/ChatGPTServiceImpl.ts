import ChatGPTRepository from "../repositories/ChatGPTRepository";
import ChatGPTService from "./ChatGPTService";

export default class ChatGPTServiceImpl implements ChatGPTService {
  constructor(readonly chatGPTRepository: ChatGPTRepository
  ) {
  }

  async getAnalysis(prompt: string): Promise<string> {

    const data = await this.chatGPTRepository.getCompletion(prompt);

    return data.choices?.[0]?.message.content || new Error("No content received");
  }

}