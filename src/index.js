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
    "stroke-dasharray": dasharray,
    "stroke-dashoffset": dashoffset,
    "stroke-width": 5,
    stroke: '#007AFF'
  })
  svg.appendChild(circle)
  const knob = createCircle({
    class: 'knob'
  })
  knob.style.transformOrigin = `65px 65px`
  knob.style.transform = `rotate(${360 * progress}deg)`
  svg.appendChild(knob)
  element.parentElement.insertBefore(svg, element)

  const o = {
    element,
    svg,
    progress
  }
  svg.addEventListener('click', (e) => {
    const x = e.screenX - svg.getBoundingClientRect().left;
    const y = e.screenY - svg.getBoundingClientRect().top;
    const cx = circle.getAttribute("cx");
    const cy = circle.getAttribute("cy");
    const degrees = deg(x - cx, y - cy);
    const value = degrees / 3.6;
    element.value = value;
    dashoffset = dasharray * (element.value / (element.getAttribute("max")||100));
    o.progress = dashoffset / dasharray;
    knob.style.transform = `rotate(${360 * o.progress}deg)`
  })

  return o
}

export default Dial
