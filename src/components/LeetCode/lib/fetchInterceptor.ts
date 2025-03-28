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
      logger.info("Fetch interceptor installed");
      window.fetch = this.interceptFetch.bind(this);
      logger.debug("fetch", window.fetch);
    }
  }

  private uninstall() {
    if (window.fetch === this.interceptFetch) {
      logger.info("Fetch interceptor uninstalled");
      window.fetch = this.originalFetch;
      logger.debug("fetch", window.fetch);
    }
  }

  constructor() {
    this.originalFetch = window.fetch;
  }

  addHandler(handler: FetchInterceptorHandler) {
    logger.info("Fetch interceptor handler added");
    if (this.handlers.size === 0) {
      this.install();
    }
    this.handlers.add(handler);
    logger.debug("handler", handler);
    logger.debug("handlers", this.handlers);
  }

  removeHandler(handler: FetchInterceptorHandler) {
    logger.info("Fetch interceptor handler removed");
    this.handlers.delete(handler);
    if (this.handlers.size === 0) {
      this.uninstall();
    }
    logger.debug("handler", handler);
    logger.debug("handlers", this.handlers);
  }

  private async interceptFetch(
    ...args: Parameters<typeof fetch>
  ): Promise<Response> {
    logger.info("Fetch interceptor triggered");
    const originalResponse = await this.originalFetch.apply(window, args);

    [...this.handlers].map(async (handler) => {
      try {
        const match = handler.filter(originalResponse);
        if (!match) return;
        logger.info("Fetch interceptor handler match");
        logger.debug("handler", handler);
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
