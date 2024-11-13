import type Steps from "../core/steps";

export default function StepCounter(parent: Element, steps: Steps) {
  const count = document.createElement("div");
  const updateCounter = () => {
    count.textContent = `#${steps.pomodoros}`;
  };

  updateCounter();
  steps.onChange(updateCounter);

  parent.appendChild(count);
  return count;
}
