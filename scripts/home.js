class CanvasTools {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  drawCircle(x, y, radius) {
    const rect = this.canvas.getBoundingClientRect();

    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgb(102 51 153)"
    let xPos = x - rect.left;
    let yPos = y - rect.top;
    console.log(xPos, yPos);
    this.ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
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
    this.isTouch = false;
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

    // ---- Mouse Handlers ----
    this.canvas.onmousedown = (ev) => {
      if(this.isTouch) return;

      this.drawLoop = true;
      this.circleSize = 10;      
      this.setPos(ev);
      this.drawShape();    
    }
    
    this.canvas.onmouseup = (ev) => {
      if(this.isTouch) return;

      this.drawLoop = false;
    }  

    this.canvas.onmousemove = (ev) => {   
      if(this.isTouch) return;

      this.setPos(ev);
    }

    // ---- Touch Handlers ----
    this.canvas.ontouchstart = (ev) => {
      this.isTouch = true;
      this.drawLoop = true;
      this.circleSize = 10;
      this.setPos(ev.touches[0]);
      this.drawShape();
    }  

    this.canvas.ontouchend = (ev) => {
      this.drawLoop = false;
    }

    this.canvas.ontouchmove = (ev) => {
      if(ev.touches.length > 0) {
        this.setPos(ev.touches[0]);
      }
    }
  }
}

window.onload = () => (new Home()).listen();