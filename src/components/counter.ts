import type Timer from "../core/timer";

export default function Counter(parent: Element, timer: Timer) {
  const counter = document.createElement("span");
  const updateCounter = () => {
    const min = Math.floor(timer.remainingMs / 60000);
    const sec = Math.floor((timer.remainingMs % 60000) / 1000);
    counter.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  updateCounter();
  timer.onSetTime(updateCounter);

  let intervalId: number;
  timer.onStart(() => {
    updateCounter();
    intervalId = setInterval(updateCounter, 1000);
  });
  timer.onPause(() => {
    clearInterval(intervalId);
  });

  parent.appendChild(counter);
  return counter;
}
