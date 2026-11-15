export class ProviderError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;

  constructor(message: string, code = 'PROVIDER_ERROR', statusCode?: number) {
    super(message);
    this.name = 'ProviderError';
    this.code = code;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ProviderTimeoutError extends ProviderError {
  constructor(message = 'AI provider request timed out') {
    super(message, 'PROVIDER_TIMEOUT', 504);
    this.name = 'ProviderTimeoutError';
  }
}
