/**
 * @jest-environment jsdom
 */

import Dial from "./index";

const template = (props) => `<input type='range' ${props}/>`;

beforeEach(() => {
  document.body.innerHTML = template();
});

test('selecting an existing input[type="range"]', () => {
  const dial = Dial('[type="range"]');
  expect(dial.element).toBeTruthy();
});

test("replaces the range input with an SVG", () => {
  const dial = Dial('[type="range"]');
  expect(dial.element.style.display).toBe("none");
  expect(dial.element.parentElement.querySelector("svg")).toBeTruthy();
  expect(dial.svg.querySelector(".progress")).toBeTruthy();
});

test("the dial progress value matches the range value on instantiation", () => {
  const dial = Dial('[type="range"]');
  expect(dial.element.value).toBe("50"); // default
  expect(dial.progress).toBe(dial.element.value / 100 /* 0.5 */);

  // reset
  document.body.innerHTML = template('value="10"');
  const dial2 = Dial('[type="range"]');
  expect(dial2.element.value).toBe("10");
  expect(dial2.progress).toBe(0.1);

  // reset
  document.body.innerHTML = template('value="10" max="40"');
  const dial3 = Dial('[type="range"]');
  expect(dial3.progress).toBe(0.25);

  // TODO support min values
});

test("the knob follows the progress", () => {
  const dial = Dial('[type="range"]');
  expect(dial.svg.querySelector(".knob")).toBeTruthy();
  expect(dial.svg.querySelector(".knob").style.transform).toBe(
    "rotate(180deg)"
  );

  // reset
  document.body.innerHTML = template('value="10" max="40"');
  const dial2 = Dial('[type="range"]');
  expect(dial2.svg.querySelector(".knob").style.transform).toBe(
    "rotate(90deg)"
  );
});

test("clicking on the dial updates the range value and progress", () => {
  const event = new MouseEvent("pointerup", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 215,
    clientY: 215,
  });
  const dial = Dial('[type="range"]');
  dial.svg.dispatchEvent(event);
  expect(Number(dial.element.value)).toBeGreaterThan(75);
  expect(dial.svg.querySelector(".knob").style.transform).toBe(
    "rotate(306deg)"
  );
  expect(Number(dial.progress)).toBeGreaterThan(0.75);
});

test("dragging the knob updates the range value and progress", () => {
  const down = new MouseEvent("pointerdown", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 0,
    clientY: 0,
  });
  const move = new MouseEvent("pointermove", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 100,
    clientY: 300,
  });
  const up = new MouseEvent("pointerup", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 100,
    clientY: 300,
  });
  const dial = Dial('[type="range"]');
  dial.svg.dispatchEvent(down);
  dial.svg.dispatchEvent(move);
  dial.svg.dispatchEvent(up);
  expect(Number(dial.element.value)).toBeGreaterThan(75);
  expect(dial.svg.querySelector(".knob").style.transform).toBe(
    "rotate(306deg)"
  );
  expect(Number(dial.progress)).toBeGreaterThan(0.75);
});
