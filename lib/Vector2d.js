class Vector2d {
	constructor(dx, dy) {
		this.dx = dx;
		this.dy = dy;
	}

	differenceVector(a, b) {
		this.dx = a.dx - b.dx;
		this.dy = a.dy - b.dy;
	}

	sumVector(a, b) {
		this.dx = a.dx + b.dx;
		this.dy = a.dy + b.dy;
	}

	add(vector) {
		this.dx += vector.dx;
		this.dy += vector.dy;
	}

	scalMul(scal) {
		this.dx *= scal;
		this.dy *= scal;
	}

	dot(vector) {
		return (this.dx * vector.dx + this.dy * vector.dy);
	}

	get magnitude() {
		return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
	}

	get angle() {
		return Math.atan2(this.dy, this.dx);
	}

	set magnitude(newMagnitude) {
		let angle = this.angle;
		//polar coordinates
		this.dx = newMagnitude * Math.cos(angle);
		this.dy = newMagnitude * Math.sin(angle);
	}

	equals(vector) {
		this.dx = vector.dx;
		this.dy = vector.dy;
	}

	static draw(context, x,y,angle){
		let sh = 15;
		let sw = 100;
		let hh = 20;
		let hw = 30;

		context.save();
		context.beginPath();
		context.fillStyle = "black";
		context.strokeStyle = "orange";
		context.translate(x, y);
		context.rotate(angle);

		context.moveTo(0,0);
		context.lineTo(0,sh);
		context.lineTo(sw,sh);
		context.lineTo(sw,hh);
		context.lineTo(sw + hw ,0);
		context.lineTo(sw,-hh);
		context.lineTo(sw,-sh);
		context.lineTo(0,-sh);
		context.closePath();
		context.stroke();
		context.fill();
		context.restore();
	}

	draw(context, x,y,angle){
		Vector2d.draw(context,x,y,angle);
	}


	distanceTo(position2) {
		let pos1 = this.dx - position2.dx;
		let pos2 = this.dy - position2.dy;

		return Math.sqrt(pos1 * pos1 + pos2 * pos2);
	}

	perpendicular(vector) {
		this.dx = -vector.dy;
		this.dy = vector.dx;
	}

	vectorSum(a, b) {
		this.dx = a.dx + b.dx;
		this.dy = a.dy + b.dy;
	}

	vectorCentrum(a, b) {
		console.log(a);
		console.log(b);
		this.dx = (a.dx + b.dy) / 2;
		this.dy = (a.dy + b.dy) / 2;
	}
}