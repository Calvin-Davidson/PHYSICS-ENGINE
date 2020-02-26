/*
	23-2-2020
	klasse om een tweedimensionale vector mee aan te geven

	eigenschappen
	* dx (verschuiving in de x-richting)
	* dy (verschuiving in de y-richting )
*/

class Vector2d{
    constructor(dx,dy){
        this.dx = dx;
        this.dy = dy;
	}
	



	distanceTo(position2) {
		let pos1 = this.dx - position2.dx;
		let pos2 = this.dy - position2.dy;

		return Math.sqrt( pos1*pos1 + pos2*pos2 );
	}


	equals(pos2) {
		if (this.dx == pos2.dx) {
			if (this.dy == pos2.dy) {
				return true;
			}
		}
		return false;
	}
}
