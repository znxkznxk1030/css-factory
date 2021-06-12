export function distance(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  return Math.sqrt(dx * dx + dy * dy);
}

export function lineCircle(x1, y1, x2, y2, cx, cy, r) {
  const lineLength = distance(x1, y1, x2, y2);
  const point =
    ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / Math.pow(lineLength, 2);

  const px = x1 + point * (x2 - x1);
  const py = y1 + point * (y2 - y1);

  return distance(px, py, cx, cy) < r;
}
