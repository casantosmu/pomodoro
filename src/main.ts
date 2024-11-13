import "./style.css";

import PlayButtons from "./components/play-buttons";
import Container from "./components/container";
import TimerCounter from "./components/timer-counter";
import Timer from "./core/timer";
import StepButtons from "./components/step-buttons";
import StepTitle from "./components/step-title";
import Steps from "./core/steps";
import StepCounter from "./components/step-counter";

const steps = new Steps();
const timer = new Timer(steps.duration);

steps.onChange(() => {
  timer.setTime(steps.duration);
});
timer.onComplete(() => {
  steps.complete();
});

const containerEl = Container(document.querySelector("#app")!);

StepButtons(containerEl, timer, steps);
TimerCounter(containerEl, timer);
PlayButtons(containerEl, timer, steps);
StepCounter(containerEl, steps);
StepTitle(containerEl, steps);
