/*
	23-2-2020
	klasse om punten op de 2d context van een canvas te tekenen

	eigenschappen
	* pos (positie van het middelpunt m.b.v. een Vector2d)
	* radius (grootte van de cirkel in pixels)
	* color (kleur van het punt, als String)
*/

class Point {

	constructor(pos, radius, color, VelS = 20) {
		this.pos = pos;
		this.radius = radius;
		this.color = color;


		let r = Math.floor(Math.random() * (4 - 0 + 1)) + 0; // 0 - 1 - 2 - 3
		switch (r) {
			case 0:
				this.VelX = VelS;
				this.VelY = VelS;
				break;
			case 1:
				this.VelX = VelS;
				this.VelY = -VelS;
				break;
			case 2:
				this.VelX = -VelS;
				this.VelY = VelS;
				break;
			case 3:
				this.VelX = -VelS;
				this.VelY = -VelS;
				break;
		}

	}

	updatePos(pos) {
		this.pos = pos;
	}


	draw(context) {
		//hier komt de code om een cirkel te tekenen
		context.beginPath();

		context.fillStyle = this.color;
		context.strokeStyle = this.color;

		context.arc(this.pos.dx, this.pos.dy, this.radius, 0, 2 * Math.PI);
		context.stroke();
		context.fill();


		context.closePath();
	}


	wallCollision(width, height) {
		if (this.pos.dx - this.radius <= 0) { this.VelX = Math.abs(this.VelX); }
		if (this.pos.dx + this.radius >= width) { this.VelX = -Math.abs(this.VelX); }
		if (this.pos.dy - this.radius <= 0) { this.VelY = Math.abs(this.VelY); }
		if (this.pos.dy + this.radius >= height) { this.VelY = -Math.abs(this.VelY); }
	}
}
