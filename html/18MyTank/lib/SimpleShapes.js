class Box{
  constructor(position, size, id=0){
    this.id = id;
    this.pos = position;
    this.x = position.x;
    this.y = position.y;
    this.w = size.x;
    this.h = size.y;
  }
  Draw(context, style = "red"){
    context.beginPath();
    context.rect(this.x,this.y,this.w,this.h);
    context.strokeStyle = style;
    context.stroke();
  }
}

class Circle{
	constructor(position, radius){
    this.id = 1;
    this.pos = position;
    this.x = position.x;
    this.y = position.y;
    this.r = radius;
  }
	Draw(context, style = "red"){
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		context.strokeStyle = style;
		context.stroke();
	}
}

class Convex{
	constructor(position, points, buildEdges, edges = []){
		this.id = 2;
		this.points = points;
		this.edges = edges;
		this.pos = position;
		this.avpos = position;
		if(buildEdges){
			this.BuildEdges();
		}
	}

	Draw(context, strokeStyle = "red"){
		context.beginPath();
		context.moveTo(this.points[0].x, this.points[0].y);
		for(let i=1; i<this.points.length; i++){
			context.lineTo(this.points[i].x, this.points[i].y)
		}
		context.lineTo(this.points[0].x, this.points[0].y);
		context.strokeStyle = strokeStyle;
		context.stroke();
	}

	BuildEdges() {
		let p1 = new Vector2d(0,0);
		let p2 = new Vector2d(0,0);
		this.edges = [];
		for(let i=0;i<this.points.length;i++){
			p1 = this.points[i];
			if(i+1>= this.points.length){
				p2 = this.points[0]
			} else {
				p2 = this.points[i+1];
			}
			this.edges.push(Vector2dMinVector2d(p2,p1));
		}
	}

	CalculateAveragePosition() {
		let result = new Vector2d(0,0);
		for(let i=0;i<points.length;i++){
			result.x+=this.points[i].x;
			result.y+=this.points[i].y;
		}
		return new Vector2d(result.x/this.points.length,result.y/this.points.length);
	}

	Move(moveDirection) {
		for(let i=0;i<this.points.length;i++){
			let p = this.points[i];
			this.points[i] = new Vector2d(p.x+moveDirection.x,p.y+moveDirection.y);
		}
	}

  Rotate(angle,axis) {
    let radians = (Math.PI/-180)*angle;
    let cos = Math.cos(radians);
    let sin = Math.sin(radians);
    for(let i=0;i<this.points.length;i++){
			let p = this.points[i];
      let nx = (cos * (p.x - axis.x)) + (sin * (p.y - axis.y)) + axis.x;
      let ny = (cos * (p.y - axis.y)) - (sin * (p.x - axis.x)) + axis.y;
      this.points[i] = new Vector2d(nx,ny);
    }
  }
}
