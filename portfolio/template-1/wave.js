/*!
 * Created by Canvas Dojo <https://github.com/znxkznxk1030/canvas-dojo>
 *
 * canvas-boilerplate by <https://github.com/christopher4lis/canvas-boilerplate>
 * Learn more https://chriscourses.com/
 */

const canvas = document.getElementById('canvas_home');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
  animate();
});

// Objects
class Point {
  constructor(x, y, weight) {
    this.x = x;
    this.y = y;
    this.originY = y;
    this.weight = weight;

    this.speed = 0.05;
    this.max = Math.random() * 100 + canvas.height / 50;
  }

  update() {
    this.weight += this.speed + Math.random() * 0.05;
    this.y = this.originY + Math.sin(this.weight) * this.max;
  }
}

class Wave {
  constructor() {
    this.numPoints = 6;
    this.gap = innerWidth / (this.numPoints - 1);

    this.height = innerHeight - 50;
    this.init();
  }

  init() {
    this.points = [];

    for (let index = 0; index < this.numPoints; index++) {
      const point = new Point(this.gap * index, this.height, index);
      this.points.push(point);
    }
  }

  resizeHeight(height) {
    this.height = height;
    this.init();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = '#50CB93';

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    let midX, midY;

    ctx.moveTo(prevX, prevY);

    for (let index = 0; index < this.points.length; index++) {
      const point = this.points[index];
      const currX = point.x;
      const currY = point.y;
      point.update();

      midX = ( prevX + currX ) / 2;
      midY = ( prevY + currY ) / 2;

      ctx.quadraticCurveTo(prevX, prevY, midX, midY);

      prevX = currX;
      prevY = currY;
    }

    ctx.quadraticCurveTo(midX, midY, prevX, prevY);
    
    ctx.lineTo(prevX, innerHeight);
    ctx.lineTo(0, innerHeight);
    ctx.fill();
  }

  update() {
    this.draw();
  }
}

// Implementation
var wave = null;
function init() {
  wave = new Wave();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  wave.draw();
}

// export { wave };
