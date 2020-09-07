class polygon {
    constructor(points, color = "blue") {
        this.points = points;
        this.color = color;
        this.stokestyle = "black"
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.strokeStyle = this.stokestyle;
        context.moveTo(this.points[0].pos.dx, this.points[0].pos.dy);

        for (let i = 0; i < this.points.length; i++) {
            context.lineTo(this.points[i].pos.dx, this.points[i].pos.dy);
        }
        context.lineTo(this.points[0].pos.dx, this.points[0].pos.dy);

        context.fill();
        context.stroke();
        context.closePath();
    }

    addpoint(point) {
        this.points.push(point);
    }

    removepoint(point) {
        this.points = this.points.filter(el => el !== point);
    }
}