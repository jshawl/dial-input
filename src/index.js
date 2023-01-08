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
  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
  const dasharray = 320;
  let dashoffset = dasharray * (element.value / (element.getAttribute("max")||100));
  let progress = dashoffset / dasharray
  const circle = createCircle({
    class: 'progress',
    cx: 65,
    cy: 65,
    r: 50,
    fill: "none",
    style: 'transform: rotate(90deg); transform-origin: 65px 65px',
    "stroke-dasharray": dasharray,
    "stroke-dashoffset": dasharray - progress * dasharray,
    "stroke-width": 5,
    stroke: '#007AFF'
  })
  svg.appendChild(circle)
  const knob = createCircle({
    class: 'knob',
    fill: "#ccc",
    cx: "65",
    cy: "115",
    r: 10,
    stroke: "#fff",
    "stroke-width": 3,
    filter: "drop-shadow(1px 1px 2px rgb(0 0 0 / 0.2))"
  })
  knob.style['transform-origin'] = `65px 65px`
  knob.style.transform = `rotate(${360 * progress}deg)`
  svg.appendChild(knob)
  element.parentElement.insertBefore(svg, element)

  const state = {
    element,
    svg,
    progress
  }
  svg.addEventListener('click', (e) => {
    const x = e.clientX - svg.getBoundingClientRect().left;
    const y = e.clientY - svg.getBoundingClientRect().top;
    const cx = circle.getAttribute("cx");
    const cy = circle.getAttribute("cy");
    const degrees = deg(x - cx, y - cy);
    const value = degrees / 3.6;
    element.value = value;
    dashoffset = dasharray * (element.value / (element.getAttribute("max")||100));
    state.progress = dashoffset / dasharray;
    circle.setAttribute("stroke-dashoffset", dasharray - state.progress * dasharray);
    knob.style.transform = `rotate(${360 * state.progress}deg)`
  })

  return state
}

export default Dial
