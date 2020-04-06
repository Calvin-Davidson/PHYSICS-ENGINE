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

let mouseDown;
let mouseX;
let mouseY;

class Point {

    constructor(pos, radius, color = "black", draggable = false) {
        this.pos = pos;
        this.radius = radius;
        this.color = color;
        this.draggable = draggable
        this.VelSpeed = 0;
        this.isDragged = false;

        points.push(this);
    }

    destory() {
        for (let i = 0; i < points.length; i++) {
            if (points[i] === this) {
                console.log("removed");
                points.slice(i, 1);
            }
        }
    }

    update() {
        if (this.VelSpeed != 0) {
            for (let i = 0; i < this.VelSpeed; i++) {
                let X = this.pos.dx + this.VelX;
                let Y = this.pos.dy + this.VelY;

                this.pos = new Vector2d(X, Y);
            }
        }

        if (this.isDragged) {
            this.pos = new Vector2d(mouseX, mouseY);
        }
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

    clicked() {
        // deze functie word uitgevoerd wanneer een speler in deze circle drukt.
        if (mouseDown) {
            if (this.draggable) {
                this.isDragged = true;
            }
        }
    }


    wallCollision(width, height) {
        // als hij buiten de muur zit.
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

    CircleBorder(xCenter, yCenter, radius, points, offset = 0) {
        let Positions = [];

        let slice = 2 * Math.PI / points;
        for (let i = 0; i < points; i++) {
            let angle;
            angle = slice * i + offset;

            let newX = (xCenter + radius * Math.cos(angle));
            let newY = (yCenter + radius * Math.sin(angle));

            Positions.push(new Vector2d(newX, newY));
        }

        return Positions;
    }


}


// events
document.addEventListener("mouseup", function (e) {
    mouseDown = false
    for(let i = 0; i < points.length; i++) {
        points[i].isDragged = false;
    }
});

document.addEventListener("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

document.addEventListener("mousedown", function (e) {
    mouseDown = true;
    console.log("mouse down");
    for (let i = 0; i < points.length; i++) {
        if (new Vector2d(mouseX, mouseY).distanceTo(points[i].pos) <= points[i].radius) {
            points[i].clicked();
            console.log("found");
            break;
        }
    }
});
