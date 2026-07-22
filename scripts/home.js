class CanvasTools {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  drawCircle(x, y, radius) {
    const rect = this.canvas.getBoundingClientRect();

    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgb(102 51 153)"
    this.ctx.arc(x - rect.left, y - rect.top, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}

class Home {
  constructor() {
    this.canvas = document.getElementById("homeCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.brush = new CanvasTools(this.canvas, this.ctx);
    this.drawLoop = false;
    this.drawX = 0;
    this.drawY = 0;
    this.circleSize = 10;
  }

  setPos(ev) {
    this.drawX = ev.clientX;
    this.drawY = ev.clientY;
  }

  drawShape() { 
    if (this.drawLoop) {
      this.brush.drawCircle(this.drawX, this.drawY, this.circleSize);
      this.circleSize += 5;
      setTimeout(() => this.drawShape(), 75);
    }
  }

  listen() {
    this.canvas.onmouseup = (ev) => {
      this.drawLoop = false;
    }

    this.canvas.onmousemove = (ev) => {   
      this.setPos(ev);

      if(!this.drawLoop && ev.buttons == 1) {
        this.circleSize = 10;
        this.drawLoop = true;
        this.drawShape();
      }

      this.drawLoop = (ev.buttons == 1);      
    }
  }
}

window.onload = () => (new Home()).listen();