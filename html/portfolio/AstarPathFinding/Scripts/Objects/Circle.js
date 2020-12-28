class Circle {
    constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.fillStyle = "#00adb5";
    this.strokeStyle = "#222831";
    }


    draw(context) {
        context.beginPath();
        context.fillStyle = this.fillStyle;
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = 10;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.fillStyle = "#393e46";
        context.closePath();
    }
}