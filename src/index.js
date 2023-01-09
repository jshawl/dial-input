const createCircle = props => {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  for(let prop in props)
    circle.setAttribute(prop, props[prop])
  return circle
}

const deg = (x, y) => {
  const rad = Math.atan2(y, x);
  let degrees = rad * (180 / Math.PI) - 90;
  if (degrees < 0) {
    degrees += 360;
  }
  return degrees;
};

const Dial = (selector) => {
  const element = document.querySelector(selector)
  element.style.display = 'none'
  const max = element.getAttribute("max") || 100
  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
  svg.setAttribute("height", "130")
  svg.setAttribute("width", "130")
  const dasharray = 320;
  const cx = 65;
  const r = 50;
  let dashoffset = dasharray * (element.value / max);
  let progress = dashoffset / dasharray
  const state = {
    element,
    svg,
    progress
  }
  const circle = createCircle({
    class: 'progress',
    cx,
    cy: cx,
    fill: "none",
    r,
    stroke: '#007AFF',
    "stroke-dasharray": dasharray,
    "stroke-dashoffset": dasharray - progress * dasharray,
    "stroke-width": 5,
    style: `transform: rotate(90deg); transform-origin: ${cx}px ${cx}px;`
  })
  const available = createCircle({
    cx,
    cy: cx,
    fill: "none",
    r,
    stroke: "#ebebeb",
    "stroke-width": 5
  })
  const knob = createCircle({
    class: 'knob',
    cx,
    cy: cx + r,
    fill: "#ccc",
    filter: "drop-shadow(1px 1px 2px rgb(0 0 0 / 0.2))",
    r: 10,
    stroke: "#fff",
    "stroke-width": 3,
    style: `transform: rotate(${360 * state.progress}deg); transform-origin: ${cx}px ${cx}px;`
  })
  svg.appendChild(available)
  svg.appendChild(circle)
  svg.appendChild(knob)
  element.parentElement.insertBefore(svg, element)
  let dragging
  svg.addEventListener('pointerdown', (e) => {
    dragging = true
  })
  const onClick = (e) => {
    const x = e.clientX - svg.getBoundingClientRect().left;
    const y = e.clientY - svg.getBoundingClientRect().top;
    const degrees = deg(x - circle.getAttribute("cx"), y - circle.getAttribute("cy"));
    element.value = degrees / 3.6;
    dashoffset = dasharray * (element.value / max);
    state.progress = dashoffset / dasharray;
    circle.setAttribute("stroke-dashoffset", dasharray - state.progress * dasharray);
    knob.style.transform = `rotate(${360 * state.progress}deg)`
  }
  svg.addEventListener('pointerup', (e) => {
    dragging = false
    onClick(e)
  })
  svg.addEventListener('pointermove', (e) => {
    if(!dragging) return;
    onClick(e)
  })
  return state
}

export default Dial
