import Logger from "@/utils/logger";

const logger = new Logger("FetchInterceptor", import.meta.env.VITE_DEBUG_LEVEL);

type SafeHeaderField =
  | "headers"
  | "ok"
  | "redirected"
  | "status"
  | "statusText"
  | "type"
  | "url";

export type ResponseHeader = Pick<Response, SafeHeaderField>;

interface FetchInterceptorHandler {
  fn: (response: Response) => Promise<void>;
  filter: (responseHeader: ResponseHeader) => boolean;
}

class FetchInterceptor {
  private originalFetch: typeof fetch;
  private handlers: Set<FetchInterceptorHandler> = new Set();

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

  addHandler(handler: FetchInterceptorHandler) {
    if (this.handlers.size === 0) {
      this.install();
    }
    this.handlers.add(handler);
  }

  removeHandler(handler: FetchInterceptorHandler) {
    this.handlers.delete(handler);
    if (this.handlers.size === 0) {
      this.uninstall();
    }
  }

  private async interceptFetch(
    ...args: Parameters<typeof fetch>
  ): Promise<Response> {
    const originalResponse = await this.originalFetch.apply(window, args);

    [...this.handlers].map(async (handler) => {
      try {
        if (!handler.filter(originalResponse)) return;
        const clonedResponse = originalResponse.clone();
        await handler.fn(clonedResponse);
      } catch (error) {
        const name = handler.fn.name || "<anonymous>";
        logger.error(`Handler ${name} error:`, error);
      }
    });

    return originalResponse;
  }
}

const fetchInterceptor = new FetchInterceptor();

export default fetchInterceptor;
