export default interface ChatGPTService {

  getAnalysis(prompt: string): Promise<string>;

}