class Player {
    constructor() {
        this.targetPos = new Vector2d(0, 0);
        this.arrayPos = new Vector2d(10, 10);
        this.currentPos = new Vector2d(50, 50);

        this.radius = 25;
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = 10;
        context.fillStyle = "#222831";
        context.strokeStyle = "#00adb5";
        context.arc(this.currentPos.dx, this.currentPos.dy, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.fillStyle = "#393e46";
        context.closePath();
    }
}