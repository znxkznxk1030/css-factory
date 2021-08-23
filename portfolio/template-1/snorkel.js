/*!
 * Created by Canvas Dojo <https://github.com/znxkznxk1030/canvas-dojo>
 *
 * canvas-boilerplate by <https://github.com/christopher4lis/canvas-boilerplate>
 * Learn more https://chriscourses.com/
 */
(function() {
  const cSnorkel = document.getElementById('snorkel-bubble');
  const _ctx = cSnorkel.getContext('2d');

  cSnorkel.width = 150;
  cSnorkel.height = 650;

  // Event Listeners

  addEventListener('resize', () => {
    init();
  });

  // Objects
  class Bubble {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.dy = Math.random() * 3 + 1;
    }

    draw() {
      _ctx.beginPath();
      _ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      _ctx.fillStyle = this.color;
      _ctx.fill();
      _ctx.closePath();
    }

    update() {
      const dx = (Math.random() - 0.5) * 10;
      this.x += dx;

      if (this.x - this.radius < 0 || this.x + this.radius > cSnorkel.width) {
        this.x -= dx;
      }

      this.y -= this.dy;
      if ( this.y <= 0 ) {
        this.x = Math.random() * 10 + cSnorkel.width / 2;
        this.y = cSnorkel.height - this.radius;
      };
      this.draw();
    }
  }

  // Implementation
  let bubbles;
  function init() {
    bubbles = [];

    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 10 + 3;
      const x = (Math.random() * 10) + cSnorkel.width / 2;
      const y = cSnorkel.height - size;
      bubbles.push(new Bubble(x, y, size, '#fff'));
    }
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    _ctx.clearRect(0, 0, cSnorkel.width, cSnorkel.height);
    for (let i = 0; i < 100; i++) {
      const bubble = bubbles[i];
      if (bubble) {
        bubble.update();
      }
    }
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

})();