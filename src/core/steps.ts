export const STEP = {
  FOCUS: "FOCUS",
  SHORT_BREAK: "SHORT_BREAK",
  LONG_BREAK: "LONG_BREAK",
} as const;

type Step = (typeof STEP)[keyof typeof STEP];

export default class Steps {
  #currentStep: Step = STEP.FOCUS;
  #observers: ((step: Step) => void)[] = [];

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

  set(step: Step) {
    this.#currentStep = step;

    for (const callback of this.#observers) {
      callback(this.#currentStep);
    }
  }

  onChange(callback: (step: Step) => void) {
    this.#observers.push(callback);
  }
}
