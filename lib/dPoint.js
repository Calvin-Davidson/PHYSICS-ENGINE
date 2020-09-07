class dPoint {
  constructor(pos,vel,acc,radius,color,label) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.radius = radius;
    this.color = color;
    this.label = label || '' ;
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if(this.pos.dx > canvas.width - this.radius){
      this.vel.dx = - Math.abs(this.vel.dx);
      this.pos.dx = canvas.width - this.radius
    }
    if(this.pos.dx < this.radius){

      this.vel.dx = Math.abs(this.vel.dx);
      this.pos.dx = this.radius
    }

    if(this.pos.dy> canvas.height - this.radius){
      this.vel.dy = -Math.abs(this.vel.dy);
      this.pos.dy = canvas.height  - this.radius
    }

    if(this.pos.dy < this.radius){
      this.vel.dy = Math.abs(this.vel.dy);
      this.pos.dy = this.radius
    }

  }

  draw(context){
    context.beginPath();
    context.strokeStyle = "blue";
    context.fillStyle = this.color;
    context.arc(this.pos.dx,this.pos.dy,this.radius,0,2*Math.PI);
    context.stroke();
    context.fill();
    context.closePath();
    context.fillStyle = "black";
    context.font = "12px Arial";
    context.fillText(this.label, this.pos.dx-20, this.pos.dy-this.radius-10);
  }
}
