export const STEP = {
  FOCUS: "FOCUS",
  SHORT_BREAK: "SHORT_BREAK",
  LONG_BREAK: "LONG_BREAK",
} as const;

type Step = (typeof STEP)[keyof typeof STEP];

export default class Steps {
  #currentStep: Step = STEP.FOCUS;
  #pomodorosCount = 1;
  #observers: (() => void)[] = [];

  get current() {
    return this.#currentStep;
  }

  get duration() {
    switch (this.#currentStep) {
      case STEP.FOCUS:
        return 25 * 60 * 1000;
      case STEP.SHORT_BREAK:
        return 5 * 60 * 1000;
      case STEP.LONG_BREAK:
        return 30 * 60 * 1000;
    }
  }

  get pomodoros() {
    return this.#pomodorosCount;
  }

  set(step: Step) {
    this.#currentStep = step;
    this.#notifyObservers();
  }

  complete() {
    switch (this.#currentStep) {
      case STEP.FOCUS:
        if (this.#pomodorosCount % 4 !== 0) {
          this.#currentStep = STEP.SHORT_BREAK;
        } else {
          this.#currentStep = STEP.LONG_BREAK;
        }
        break;
      case STEP.SHORT_BREAK:
      case STEP.LONG_BREAK:
        this.#currentStep = STEP.FOCUS;
        this.#pomodorosCount++;
        break;
    }

    this.#notifyObservers();
  }

  onChange(callback: () => void) {
    this.#observers.push(callback);
  }

  #notifyObservers() {
    for (const callback of this.#observers) {
      callback();
    }
  }
}
