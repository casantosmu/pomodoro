export default class Timer {
  #remainingMs: number;
  #startMs: number | undefined = undefined;
  #timeoutId: number | undefined = undefined;
  #setTimeObservers: (() => void)[] = [];
  #startObservers: (() => void)[] = [];
  #pauseObservers: (() => void)[] = [];

  constructor(timeMs: number) {
    this.#remainingMs = timeMs;
  }

  get remainingMs() {
    if (this.#startMs === undefined) {
      return this.#remainingMs;
    }
    return this.#remainingMs - (Date.now() - this.#startMs);
  }

  setTime(timeMs: number) {
    this.#remainingMs = timeMs;

    for (const callback of this.#setTimeObservers) {
      callback();
    }
  }

  start() {
    if (this.#startMs !== undefined) {
      console.warn("timer already running");
      return;
    }

    this.#startMs = Date.now();

    this.#timeoutId = setTimeout(() => {
      this.pause();
    }, this.#remainingMs);

    for (const callback of this.#startObservers) {
      callback();
    }
  }

  pause() {
    if (this.#startMs === undefined) {
      console.warn("timer is not running");
      return;
    }

    this.#remainingMs = this.#remainingMs - (Date.now() - this.#startMs);
    this.#startMs = undefined;

    clearTimeout(this.#timeoutId);

    for (const callback of this.#pauseObservers) {
      callback();
    }
  }

  toggle() {
    if (this.#startMs === undefined) {
      this.start();
    } else {
      this.pause();
    }
  }

  onSetTime(callback: () => void) {
    this.#setTimeObservers.push(callback);
  }

  onStart(callback: () => void) {
    this.#startObservers.push(callback);
  }

  onPause(callback: () => void) {
    this.#pauseObservers.push(callback);
  }
}
