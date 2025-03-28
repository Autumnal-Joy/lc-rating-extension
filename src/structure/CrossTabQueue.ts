import Logger from "@/utils/logger";

const crossTabQueueStoragePrefix = "CrossTabQueue";
const logger = new Logger("CrossTabQueue", import.meta.env.VITE_DEBUG_LEVEL);

export default class CrossTabQueue<T> {
  private readonly storageKey: string;
  private listenerId?: ReturnType<typeof GM_addValueChangeListener>;

  constructor(key: string) {
    this.storageKey = `${crossTabQueueStoragePrefix}_${key}`;
    logger.info(`CrossTabQueue initialized for ${this.storageKey}`);
  }

  private updateData(updater: (current: T[]) => T[]) {
    logger.info(`Data updated for ${this.storageKey}`);
    const oldData = GM_getValue<T[]>(this.storageKey, []);
    const newData = updater(oldData);
    GM_setValue(this.storageKey, newData);
    logger.debug("Old data:", oldData);
    logger.debug("New data:", newData);
  }

  push(item: T) {
    this.updateData((current) => [...current, item]);
  }

  /** 订阅队列变化 */
  subscribe(callback: (items: T[]) => void) {
    logger.info(`Initial items for ${this.storageKey}`);
    try {
      const items = this.flushQueue();
      logger.debug("Initial items:", items);
      if (items.length > 0) callback(items);
    } catch (error) {
      logger.error(`${this.storageKey} initial processing failed:`, error);
    }

    // 监听后续变更
    this.listenerId = GM_addValueChangeListener(this.storageKey, () => {
      logger.info(`Data changed for ${this.storageKey}`);
      const items = this.flushQueue();
      if (items.length > 0) callback(items);
    });
  }

  unsubscribe() {
    logger.info(`Unsubscribed from ${this.storageKey}`);
    if (this.listenerId) {
      GM_removeValueChangeListener(this.listenerId);
    }
  }

  /** 获取并清空队列 */
  private flushQueue() {
    logger.info(`Flushing queue for ${this.storageKey}`);
    const currentData = GM_getValue<T[]>(this.storageKey, []);
    if (currentData.length === 0) return [];

    let flushedItems: T[] = [];
    this.updateData(() => {
      flushedItems = [...currentData];
      return [];
    });
    logger.debug("Flushed items:", flushedItems);
    return flushedItems;
  }
}
