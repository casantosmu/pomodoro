import type Steps from "../core/steps";
import type Timer from "../core/timer";

export default function PlayButtons(
  parent: Element,
  timer: Timer,
  steps: Steps
) {
  const nav = document.createElement("nav");

  const playButton = document.createElement("button");
  playButton.addEventListener("click", () => {
    timer.toggle();
  });
  nav.appendChild(playButton);

  const completeButton = document.createElement("button");
  completeButton.textContent = "▶▶";
  completeButton.addEventListener("click", () => {
    steps.complete();
  });
  nav.appendChild(completeButton);

  const handleStart = () => {
    playButton.textContent = "Pause";
    completeButton.classList.remove("d-none");
  };
  const handlePause = () => {
    playButton.textContent = "Start";
    completeButton.classList.add("d-none");
  };

  handlePause();
  timer.onStart(handleStart);
  timer.onPause(handlePause);

  parent.appendChild(nav);
  return nav;
}
