const BOUNCE = 0.95;

export class BounceString {
  constructor(pos, color) {
    const midX = (pos.x2 - pos.x1) / 2 + pos.x1;
    const midY = (pos.y2 - pos.y1) / 2 + pos.y1;

    this.points = [
      {
        x: pos.x1,
        y: pos.y1,
        ox: pos.x1,
        oy: pos.y1,
        vx: 0,
        vy: 0,
      },
      {
        x: midX,
        y: midY,
        ox: midX,
        oy: midY,
        vx: 0,
        vy: 0,
      },
      {
        x: pos.x2,
        y: pos.y2,
        ox: pos.x2,
        oy: pos.y2,
        vx: 0,
        vy: 0,
      },
    ];

    this.detect = 10;
    this.color = color;
  }

  animate(ctx, moveX, moveY) {
    ctx.beginPath();
    ctx.fillStyle = '#ff00ff';
    ctx.arc(moveX, moveY, 20, 0, Math.PI * 2, false);
    ctx.fill();
  }
}
