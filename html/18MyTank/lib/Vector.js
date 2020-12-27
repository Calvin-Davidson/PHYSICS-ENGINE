class Vector2d
{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	Length() {
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}

	Normalize() {
		let length = this.Length();
		if(length==0||length==-0){length=1;}
		this.x = this.x / length;
		this.y = this.y / length;
	}

	ClampLength(maxLength) {
		let length = this.Length();
		let ratio = length / maxLength;
		if(ratio>1) {
			this.x = this.x / ratio;
			this.y = this.y / ratio;
		}
	}

	GetNormalized() {
		let length = Length();
		return new Vector2d(this.x / length,this.y / length);
	}

	DotProduct(va) {
		return this.x * va.x + this.y * va.y;
	}

	DistanceTo(va) {
		return Math.sqrt(Math.pow(va.x-this.x, 2) + Math.pow(va.y-this.y, 2));
	}

	EqualsVector2d(v) {
		return this.x==v.x&&this.y==v.y;
	}

	Draw(context,pos,scale,color = "white"){
		let shaftHeight = 10;
		let arrowHeight = 20;
		let arrowWidth = 40;
		let shaftWidth = this.magnitude*scale - arrowWidth;

		context.fillStyle = color;

		context.save();
		context.translate(pos.x,pos.y);
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
}

function Vector2dPlusVector2d(va, vb){
	return new Vector2d(va.x+vb.x, va.y+vb.y);
}

function Vector2dMinVector2d(va, vb){
	return new Vector2d(va.x-vb.x, va.y-vb.y);
}

function Vector2dMultVector2d(va, vb){
	return new Vector2d(va.x*vb.x, va.y*vb.y);
}

function Vector2dMultFloat(va, fb){
	return new Vector2d(va.x*fb, va.y*fb);
}

function InvertVector2d(va){
	return new Vector2d(-va.x, -va.y);
}

function perpendicularVector2d(va){
	return new Vector2d(-va.y, va.x);
}

function Vector2dEqualsVector2d(va,vb,margin=0) {
	if(margin>0){
		return Math.abs(va.x-vb.x)>margin && Math.abs(va.y-vb.y)>margin;
	}
	else {
		return va.x==vb.x&&va.y==vb.y;
	}
}

function DistanceVector2d(va,vb){
	return Math.sqrt(Math.pow(va.x-vb.x, 2) + Math.pow(va.y-vb.y, 2));
}
