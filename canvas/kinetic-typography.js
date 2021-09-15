/*!
 * Created by Canvas Dojo <https://github.com/znxkznxk1030/canvas-dojo>
 *
 * canvas-boilerplate by <https://github.com/christopher4lis/canvas-boilerplate>
 * Learn more https://chriscourses.com/
 */

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.background = '#000';

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
  radius: 70,
};

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('Arthur', 0, 30);
// ctx.strokeStyle = 'white'
// ctx.strokeRect(0, 0, 100, 100);
const textCoordinates = ctx.getImageData(0, 0, 100, 100);

// Objects
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 2;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }

  draw() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    let distance = getDistance(mouse.x, mouse.y, this.x, this.y);

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < maxDistance) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }

      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }

    this.draw();
  }
}

// Implementation
let particleArray = [];
function init() {
  particleArray = [];

  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if (textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128)
        particleArray.push(new Particle(x * 6, y * 6));
    }
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particleArray.forEach((particle) => {
    particle.update();
  });

  connect();
}

function connect() {
  particleArray.forEach((a) => {
    particleArray.forEach((b) => {
      let distance = getDistance(a.x, a.y, b.x, b.y);

      if (distance < 11) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        // ctx.closePath();
      }
    });
  });
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

function getDistance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
