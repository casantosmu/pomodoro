export default class Timer {
  #remainingMs: number;
  #startMs: number | undefined = undefined;
  #timeoutId: number | undefined = undefined;
  #setTimeObservers: (() => void)[] = [];
  #startObservers: (() => void)[] = [];
  #pauseObservers: (() => void)[] = [];
  #completeObservers: (() => void)[] = [];

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
    this.#startMs = undefined;

    clearTimeout(this.#timeoutId);

    this.#notify(this.#pauseObservers);
    this.#notify(this.#setTimeObservers);
  }

  start() {
    if (this.#startMs !== undefined) {
      console.warn("timer already running");
      return;
    }

    this.#startMs = Date.now();

    const handleComplete = () => {
      this.#remainingMs = 0;
      this.#startMs = undefined;

      this.#notify(this.#pauseObservers);
      this.#notify(this.#completeObservers);
    };

    this.#timeoutId = setTimeout(handleComplete, this.#remainingMs);
    this.#notify(this.#startObservers);
  }

  pause() {
    if (this.#startMs === undefined) {
      console.warn("timer is not running");
      return;
    }

    this.#remainingMs = this.#remainingMs - (Date.now() - this.#startMs);
    this.#startMs = undefined;

    clearTimeout(this.#timeoutId);
    this.#notify(this.#pauseObservers);
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

  onComplete(callback: () => void) {
    this.#completeObservers.push(callback);
  }

  #notify(observers: (() => void)[]) {
    for (const callback of observers) {
      callback();
    }
  }
}
