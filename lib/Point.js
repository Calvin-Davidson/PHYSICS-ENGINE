/*
	23-2-2020
	klasse om punten op de 2d context van een canvas te tekenen

	eigenschappen
	* pos (positie van het middelpunt m.b.v. een Vector2d)
	* radius (grootte van de cirkel in pixels)
	* color (kleur van het punt, als String)
*/
// ALs er een nieuwe punt word aangemaakt, word hij in deze array opgeslagen.
let points = [];

class Point {

    constructor(pos, radius, color, VelS = 20, draggable = false) {
        this.pos = pos;
        this.radius = radius;
        this.color = color;
        this.draggable = draggable


        let r = Math.floor(Math.random() * (4 - 0 + 1)); // 0 - 1 - 2 - 3
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


        points.push(this);
    }

    draw(context) {
        //hier komt de code om een cirkel te tekenen
        context.beginPath();

        context.fillStyle = this.color;
        context.strokeStyle = this.color;

        context.arc(this.pos.dx, this.pos.dy, this.radius, 0, 2 * Math.PI);
        context.stroke();


        context.closePath();
    }

    clicked() {
        if (MouseDown) {
            if (this.draggable) {
                let move = setInterval(function () {
                    if (MouseDown == false) {
                        clearInterval(this);
                        return false;
                    } else {
                        return true;
                    }
                }, 1);

                if (move) {
                    this.pos = new Vector2d(MouseX, MouseY);
                }
            }
        }
    }


    wallCollision(width, height) {
        if (this.pos.dx - this.radius <= 0) {
            this.VelX = Math.abs(this.VelX);
        }
        if (this.pos.dx + this.radius >= width) {
            this.VelX = -Math.abs(this.VelX);
        }
        if (this.pos.dy - this.radius <= 0) {
            this.VelY = Math.abs(this.VelY);
        }
        if (this.pos.dy + this.radius >= height) {
            this.VelY = -Math.abs(this.VelY);
        }
    }

    CircleBorder(xCenter, yCenter, radius, points, offset = 0, fuckery = false) {

        let colors = ["Blue ", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow "];
        let colorCount = 0;
        let Positions = [];

        let slice = 2 * Math.PI / points;
        for (let i = 0; i < points; i++) {
            let angle;
            if (fuckery) {
                angle = slice * i * offset;
            } else {
                angle = slice * i + offset;
            }

            let newX = (xCenter + radius * Math.cos(angle));
            let newY = (yCenter + radius * Math.sin(angle));

            context.beginPath();
            context.fillStyle = colors[colorCount];
            context.fillRect(newX - 2, newY - 2, 4, 4);
            context.closePath();

            if (colorCount == colors.length - 1) {
                colorCount = 0;
            } else {
                colorCount++;
            }
            Positions.push(new Vector2d(newX, newY));
        }

        return Positions;
    }

}
