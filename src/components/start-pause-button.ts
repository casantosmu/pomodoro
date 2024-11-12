import type Timer from "../core/timer";

export default function StartPauseButton(parent: Element, timer: Timer) {
  const button = document.createElement("button");
  button.textContent = "Start";
  button.addEventListener("click", () => {
    timer.toggle();
  });

  timer.onStart(() => {
    button.textContent = "Pause";
  });
  timer.onPause(() => {
    button.textContent = "Start";
  });

  parent.appendChild(button);
  return button;
}
