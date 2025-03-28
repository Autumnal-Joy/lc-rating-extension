import Logger from "./logger";

const logger = new Logger("FetchInterceptor");
class FetchInterceptor {
  private originalFetch: typeof fetch;
  private handlers: Set<(response: Response) => Promise<void>> = new Set();

  private install() {
    if (window.fetch === this.originalFetch) {
      window.fetch = this.interceptFetch.bind(this);
      logger.log("Fetch interceptor installed");
    }
  }

  private uninstall() {
    if (window.fetch === this.interceptFetch) {
      window.fetch = this.originalFetch;
      logger.log("Fetch interceptor uninstalled");
    }
  }

  constructor() {
    this.originalFetch = window.fetch;
  }

  addHandler(handler: (response: Response) => Promise<void>) {
    if (this.handlers.size === 0) {
      this.install();
    }
    this.handlers.add(handler);
  }

  removeHandler(handler: (response: Response) => Promise<void>) {
    this.handlers.delete(handler);
    if (this.handlers.size === 0) {
      this.uninstall();
    }
  }

  private async interceptFetch(
    ...args: Parameters<typeof fetch>
  ): Promise<Response> {
    const originalResponse = await this.originalFetch.apply(window, args);

    await Promise.all(
      [...this.handlers].map(async (handler) => {
        try {
          const clonedResponse = originalResponse.clone();
          await handler(clonedResponse);
        } catch (error) {
          const name = handler.name || "<anonymous>";
          logger.error(`Handler ${name} error:`, error);
        }
      })
    ).catch((error) => {
      logger.error("Fetch interceptor error:", error);
    });

    return originalResponse;
  }
}

const fetchInterceptor = new FetchInterceptor();

export default fetchInterceptor;
