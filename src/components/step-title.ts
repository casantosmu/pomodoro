import type Steps from "../core/steps";
import { STEP } from "../core/steps";

export default function StepTitle(parent: Element, steps: Steps) {
  const title = document.createElement("h2");
  const updateTitle = () => {
    switch (steps.current) {
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
  };

  updateTitle();
  steps.onChange(updateTitle);

  parent.appendChild(title);
  return title;
}
