// ====== HEADER ===== //

// import { wave } from "./wave";

let isMenuOpen = false;

const elMenuIcon = document.getElementById('nav-toggle');
const elNavMenu = document.getElementById('nav-menu');

elMenuIcon.addEventListener('click', () => {
  elNavMenu.classList.toggle('nav__show');
});

const listNavLink = document.querySelectorAll('.nav__link');

const removeActiveClass = () => {
  listNavLink.forEach((elNavLink) => {
    elNavLink.classList.remove('active');
  });
};

listNavLink.forEach((elNavLink) => {
  elNavLink.addEventListener('click', () => {
    removeActiveClass();
    elNavLink.classList.add('active');
  });
});

// ====== HOME ====== //
gsap.registerPlugin(ScrollTrigger);

let progress = 0;

const t1 = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.home',
      start: 'center center',
      end: 'bottom top',
      // markers: true,
      onUpdate: (self) => {
        // console.log(self);
        progress = self.progress;
      },
      pin: true,
      scrub: true,
    },
  })
  .addLabel('target-point');

t1.from('.home__image--snorkel', { opacity: 0, top: '-120px' }, 'target-point');
t1.from('.home__bubble-container', { opacity: 0}, 'target-point');
t1.to('.home__title--A', { color: "#fff" });
// t1.from('.home__image--gold', { opacity: 0, left: '-150px' }, 'target-point');

// css로 처리할 수 없는 에니메이션 처리
const heightPadding = 200;
setInterval(() => {
  // console.log(progress);
  if (wave != null) {
    referHeight = innerHeight - (innerHeight * progress) - heightPadding;
  }
}, 100);




/*!
 * Wave Animation - Arthur Kim
 *
 * Created by Canvas Dojo <https://github.com/znxkznxk1030/canvas-dojo>
 *
 * canvas-boilerplate by <https://github.com/christopher4lis/canvas-boilerplate>
 * Learn more https://chriscourses.com/
 */

const canvas = document.getElementById('canvas_home');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
  animate();
});

// Objects
let referHeight = innerHeight * 0.9;
class Point {
  constructor(x, weight) {
    this.x = x;
    this.y = referHeight;
    this.originY = referHeight;
    this.weight = weight;

    this.speed = 0.05;
    this.max = Math.random() * 100 + canvas.height / 50;
  }

  update() {
    this.weight += this.speed + Math.random() * 0.05;
    this.y = referHeight + Math.sin(this.weight) * this.max;
  }
}

class Wave {
  constructor() {
    this.numPoints = 7;
    this.gap = innerWidth / (this.numPoints - 1);
    this.init();
  }

  init() {
    this.points = [];

    for (let index = 0; index < this.numPoints; index++) {
      const point = new Point(this.gap * index, index);
      this.points.push(point);
    }
    console.log(this.points);
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
let wave = null;
function init() {
  wave = new Wave();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  wave.draw();
}

init();
animate();