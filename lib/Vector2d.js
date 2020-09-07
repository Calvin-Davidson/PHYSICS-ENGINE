class Vector2d{
	constructor(dx,dy){
		this.dx = dx;
		this.dy = dy;
	}

	differenceVector(a,b){
		this.dx = a.dx - b.dx;
		this.dy = a.dy - b.dy;
	}

	sumVector(a,b){
		this.dx = a.dx + b.dx;
		this.dy = a.dy + b.dy;
	}

	add(vector){
		this.dx += vector.dx;
		this.dy += vector.dy;
	}

	scalMul(scal){
		this.dx *= scal;
		this.dy *= scal;
	}

	dot(vector){
		return (this.dx * vector.dx + this.dy * vector.dy);
	}

	get magnitude(){
		return Math.sqrt(this.dx*this.dx + this.dy*this.dy);
	}

	get angle(){
		return Math.atan2(this.dy,this.dx);
	}

	set magnitude(newMagnitude){
		let angle = this.angle;
		//polar coordinates
		this.dx = newMagnitude*Math.cos(angle);
		this.dy = newMagnitude*Math.sin(angle);
	}

	equals(vector){
		this.dx = vector.dx;
		this.dy = vector.dy;
	}

	draw(context,pos,scale,color){
		let shaftHeight = 10;
		let arrowHeight = 20;
		let arrowWidth = 40;
		let shaftWidth = this.magnitude*scale - arrowWidth;

		context.fillStyle = color || "white";

		context.save();
		context.translate(pos.dx,pos.dy);
		context.rotate(this.angle)

		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(0,shaftHeight/2);
		context.lineTo(shaftWidth,shaftHeight/2);
		context.lineTo(shaftWidth,arrowHeight/2);
		context.lineTo(shaftWidth + arrowWidth,0);
		context.lineTo(shaftWidth,-arrowHeight/2);
		context.lineTo(shaftWidth,-shaftHeight/2);
		context.lineTo(0,-shaftHeight/2);
		context.closePath();
		context.stroke();
		context.fill();

		context.restore();
	}

	distanceTo(position2) {
		let pos1 = this.dx - position2.dx;
		let pos2 = this.dy - position2.dy;

		return Math.sqrt( pos1*pos1 + pos2*pos2 );
	}

	perpendicular(vector) {
		this.dx = -vector.dy;
		this.dy = vector.dx;
	}

	vectorSum(a,b) {
		this.dx = a.dx + b.dx;
		this.dy = a.dy + b.dy;
	}

	vectorCentrum(a,b){
		console.log(a);
		console.log(b);
		this.dx = (a.dx + b.dy) / 2;
		this.dy = (a.dy + b.dy) / 2;
	}
}


