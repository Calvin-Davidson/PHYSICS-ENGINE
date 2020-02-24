/*
	23-2-2020
	klasse om punten op de 2d context van een canvas te tekenen

	eigenschappen
	* pos (positie van het middelpunt m.b.v. een Vector2d)
	* radius (grootte van de cirkel in pixels)
	* color (kleur van het punt, als String)
*/

class Point {

  constructor(pos,radius,color){
		this.pos = pos;
		this.radius = radius;
		this.color = color;
  }

  draw(context){
		//hier komt de code om een cirkel te tekenen
		context.beginPath();
		
		context.fillStyle = this.color;
		context.strokeStyle=this.color;

		context.arc(this.pos.dx, this.pos.dy, this.radius, 0, 2 * Math.PI);
		context.stroke();
		context.fill();
		

		context.closePath();
  }

}
