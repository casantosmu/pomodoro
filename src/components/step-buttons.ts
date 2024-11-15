import type Steps from "../core/steps";
import { STEP } from "../core/steps";
import type Timer from "../core/timer";

const buttons = [
  {
    text: "Focus",
    step: STEP.FOCUS,
  },
  {
    text: "Short Break",
    step: STEP.SHORT_BREAK,
  },
  {
    text: "Long Break",
    step: STEP.LONG_BREAK,
  },
];

export default function StepButtons(
  parent: Element,
  timer: Timer,
  steps: Steps
) {
  const nav = document.createElement("nav");

  for (const { text, step } of buttons) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.addEventListener("click", () => {
      steps.set(step);
    });

    timer.onStart(() => {
      btn.disabled = true;
    });
    timer.onPause(() => {
      btn.disabled = false;
    });

    nav.appendChild(btn);
  }

  parent.appendChild(nav);
  return nav;
}
