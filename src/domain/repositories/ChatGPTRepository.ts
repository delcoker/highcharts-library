interface ChatGPTRepository {

  getCompletion(prompt: string, volatility: number, tokens: number, numberOfResponsesToGenerate: number): Promise<string>;

  getCompletion(prompt: string, tokens: number, volatility: number): Promise<any>;

  getCompletion(prompt: string, tokens: number): Promise<any>;

  getCompletion(prompt: string): Promise<any>;

  getUsageCost(openAiResponseData: { usage: any; }): number;

  get2(text: string): Promise<any>;

}

export default ChatGPTRepository;
