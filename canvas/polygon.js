/*!
 * Created by Canvas Dojo <https://github.com/znxkznxk1030/canvas-dojo>
 *
 * canvas-boilerplate by <https://github.com/christopher4lis/canvas-boilerplate>
 * Learn more https://chriscourses.com/
 */

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const PI = Math.PI * 2;


const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

class Polygon {
  constructor(x, y, radius, sides ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;
    this.color = '#000';
  }

  draw() {
    c.save();
    c.beginPath();
    
    c.fillStyle = this.color;

    c.translate(this.x, this.y);
    const angle = PI / this.sides;

    for (let index = 0; index < this.sides; index++) {
      const x = this.radius * Math.cos(angle * index);
      const y = this.radius * Math.sin(angle * index);

      (index === 0) ? c.moveTo(x, y): c.lineTo(x, y);
    }

    c.fill();

    c.closePath();
    c.restore();
  }

  update() {
    this.draw();
  }
}

// Implementation
let polygon;
let sides = 3;
let dx = 1;

function init() {
  polygon = new Polygon(canvas.width / 2, canvas.height / 2, canvas.height/3, 3);
  // setInterval(() => {
  //   sides += dx;
  //   if (sides >= 50) {
  //     dx = -1;
  //   } else if (sides <= 3) {
  //     dx = 1;
  //   }
  //   polygon.sides = sides;
  // }, 400);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  polygon.update();
}

init();
animate();

/**
 *  utils.js - <https://github.com/christopher4lis/canvas-boilerplate/blob/master/src/js/utils.js>
 *  @function randomIntFromRange Picks a random integer within a range
 *  @function randomColor Picks a random color
 *  @function dispatch Find the distance between two points
 **/ 

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
