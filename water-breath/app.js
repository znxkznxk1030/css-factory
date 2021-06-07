window.onload = () => {
  new App();
};

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    this.wave = new Wave();

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;

    this.ctx.scale(2, 2);
    this.wave.resize(this.stageWidth, this.stageHeight);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.wave.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

class Point {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.originY = y;

    this.speed = 0.05;
    this.weight = index;
    this.max = Math.random() * 100 + document.body.clientWidth / 50;
    this.min = Math.random() * 100 + document.body.clientWidth / 50;
  }

  update() {
    this.weight += this.speed + Math.random() * 0.05;
    this.y = this.originY + Math.sin(this.weight) * this.max + Math.cos(this.weight) * this.min;
  }
}

class Wave {
  constructor() {
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;


    this.init();
  }

  init() {
    this.numPoints = parseInt(this.stageWidth / 100);
    this.gapX = this.stageWidth / (this.numPoints - 1);
    this.points = []

    for (let i = 0; i < this.numPoints; i++) {
      this.points.push(new Point(this.gapX * i, this.centerY, i));
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#51c4d3';

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;
    let midX;
    let midY;

    ctx.moveTo(prevX, prevY);

    for (let i = 0; i < this.numPoints; i++) {
      const point = this.points[i];
      point.update();

      midX = ( prevX + point.x ) / 2
      midY = ( prevY + point.y ) / 2

      ctx.quadraticCurveTo(prevX, prevY, midX, midY);

      prevX = point.x
      prevY = point.y
      // ctx.arc(point.x, point.y, 20, 0, 2 * Math.PI);
    }

    ctx.quadraticCurveTo(midX, midY, prevX, prevY);
    ctx.lineTo(prevX, this.stageHeight);
    ctx.lineTo(0, this.stageHeight);
    ctx.fill();
  }
}
