import { degreesFromCoordinates, limit, createSVGElement } from "./util.js";

const Dial = (selector) => {
  const element = document.querySelector(selector);
  const max = element.getAttribute("max") || 100;
  const svg = createSVGElement("svg");
  const cx = 65;
  const r = 50;
  const state = {
    element,
    svg,
    progress: element.value / max,
  };
  const circleProps = {
    cx,
    cy: cx,
    fill: "none",
    r,
    "stroke-dasharray": 320,
    "stroke-width": 5,
    style: `transform: rotate(135deg); transform-origin: ${cx}px ${cx}px;`,
  };
  const onClick = (e) => {
    const {left, top} = svg.getBoundingClientRect()
    const degrees = degreesFromCoordinates(
      e.clientX - left - progress.getAttribute("cx"),
      e.clientY - top - progress.getAttribute("cy")
    );
    element.value = degrees / 3.6;
    state.progress = element.value / max;
    progress.setAttribute(
      "stroke-dashoffset",
      limit(320 - (state.progress - 0.15) * 320, 90, 330)
    );
    knob.style.transform = `rotate(${
      360 * limit(state.progress, 0.15, 0.85)
    }deg)`;
  };
  let dragging = false; 
  element.style.display = "none";
  svg.setAttribute("height", "130");
  svg.setAttribute("width", "130");
  const progress = createSVGElement("circle", {
    ...circleProps,
    class: "progress",
    stroke: "#007AFF",
    "stroke-dashoffset": limit(320 - (state.progress - 0.15) * 320, 90, 330),
  });
  const available = createSVGElement("circle", {
    ...circleProps,
    stroke: "#ebebeb",
    "stroke-dashoffset": 90,
  });
  const knob = createSVGElement("circle", {
    class: "knob",
    cx,
    cy: cx + r,
    fill: "#ccc",
    filter: "drop-shadow(1px 1px 2px rgb(0 0 0 / 0.2))",
    r: 10,
    stroke: "#fff",
    "stroke-width": 3,
    style: `transform: rotate(${
      360 * limit(state.progress, 0.15, 0.85)
    }deg); transform-origin: ${cx}px ${cx}px;`,
  });
  svg.appendChild(available);
  svg.appendChild(progress);
  svg.appendChild(knob);
  element.parentElement.insertBefore(svg, element);
  svg.addEventListener("pointerdown", (e) => {
    dragging = true;
    svg.classList.add("active");
    onClick(e);
  });
  svg.addEventListener("pointerup", (e) => {
    dragging = false;
    svg.classList.remove("active");
    onClick(e);
  });
  svg.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    onClick(e);
  });
  return state;
};

export default Dial;
