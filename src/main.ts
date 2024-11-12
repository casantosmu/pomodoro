import "./style.css";

import StartPauseButton from "./components/start-pause-button";
import Container from "./components/container";
import Counter from "./components/counter";
import Timer from "./core/timer";
import StepButtons from "./components/step-buttons";
import StepTitle from "./components/step-title";
import Steps from "./core/steps";

const steps = new Steps();
const timer = new Timer(steps.duration);

steps.onChange(() => {
  timer.setTime(steps.duration);
});

const containerEl = Container(document.querySelector("#app")!);

StepTitle(containerEl, steps);
Counter(containerEl, timer);

const navEl = document.createElement("div");
containerEl.appendChild(navEl);

StepButtons(navEl, timer, steps);
StartPauseButton(navEl, timer);
