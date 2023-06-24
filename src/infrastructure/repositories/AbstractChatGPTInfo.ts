export default abstract class AbstractChatGPTInfo {

  protected readonly version = 'v1';
  protected readonly engine = 'chat';
  protected readonly model = 'gpt-3.5-turbo';
// protected readonly model = 'ada';

  protected readonly completionsUri = `${this.version}/${this.engine}/completions`;

  protected readonly tokenInputCost = 0.06 / 1000;
  protected readonly tokenOutputCost = 0.12 / 1000;

  protected constructor(private readonly apiKey: string | undefined) {
    if (!apiKey) {
      throw new Error('API key is not defined.');
    }
  }

  public getUsageCost(completion: any): number {
    console.dir('REQUESTS: ' + completion.headers['x-ratelimit-limit-requests'], { depth: null, color: true });
    console.dir('REMAINING: ' + completion.headers['x-ratelimit-remaining-requests'], { depth: null, color: true });

    const usage = completion.data.usage;
    const promptCost = usage.prompt_tokens * this.tokenInputCost;
    const outputCost = usage.completion_tokens * this.tokenOutputCost;

    console.log('USAGE:', usage);
    console.log('PROMPT COST:', promptCost);
    console.log('OUTPUT COST:', outputCost);
    console.log('TOTAl COST:', promptCost + outputCost);

    return outputCost;
  }
}