import type Steps from "../core/steps";
import { STEP } from "../core/steps";

export default function StepTitle(parent: Element, steps: Steps) {
  const title = document.createElement("h2");
  title.textContent = "Focus Timer";

  steps.onChange((step) => {
    switch (step) {
      case STEP.FOCUS:
        title.textContent = "Focus Timer";
        break;
      case STEP.SHORT_BREAK:
        title.textContent = "Short Break Timer";
        break;
      case STEP.LONG_BREAK:
        title.textContent = "Long Break Timer";
        break;
    }
  });

  parent.appendChild(title);
  return title;
}
