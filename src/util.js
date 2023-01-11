export const degreesFromCoordinates = (x, y) => {
  const rad = Math.atan2(y, x);
  let degrees = rad * (180 / Math.PI) - 90;
  if (degrees < 0) {
    degrees += 360;
  }
  return degrees;
};

export const limit = (n, from, to) => (n < from ? from : n > to ? to : n);

export const createSVGElement = (tag, props = {}) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (let prop in props) element.setAttribute(prop, props[prop]);
  return element;
};
