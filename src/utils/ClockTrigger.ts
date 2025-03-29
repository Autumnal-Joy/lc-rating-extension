class ClockTrigger {
  private timerId?: number;
  private isActive = false;

  public readonly trigger: () => void;
  public readonly on: () => void;
  public readonly off: () => void;

  constructor(
    private readonly onTick: () => void,
    private readonly onTrigger: () => void,
    private readonly interval: number = 1000
  ) {
    this.trigger = () => {
      if (!this.isActive) return;
      this.isActive = false;
      this.stopTimer();
      this.onTrigger();
    };

    this.on = () => {
      if (this.isActive) return;
      this.isActive = true;
      this.startTimer();
    };

    this.off = () => {
      if (!this.isActive) return;
      this.isActive = false;
      this.stopTimer();
    };
  }

  private startTimer() {
    this.timerId = window.setInterval(() => {
      this.onTick();
    }, this.interval);
  }

  private stopTimer() {
    if (this.timerId) clearInterval(this.timerId);
  }
}

export default ClockTrigger;
