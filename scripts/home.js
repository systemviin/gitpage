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
  }

  listen() {
    this.canvas.onclick = (ev) => {
      this.brush.drawCircle(ev.clientX, ev.clientY, 10)
    }
  }
}

window.onload = () => (new Home()).listen();