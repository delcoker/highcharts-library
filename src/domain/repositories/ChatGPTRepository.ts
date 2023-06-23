interface ChatGPTRepository {

  getCompletion(prompt: string, volatility: number, tokens: number): Promise<any>;

  getCompletion(prompt: string): Promise<any>;

  get(text: string): Promise<any>;

  get2(text: string): Promise<any>;

}

export default ChatGPTRepository;
