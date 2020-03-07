let lines = [];

class LiniarLine {
    constructor(a, b, x1, x2, color = "black") {
        this.a = a;
        this.b = b;
        this.x1 = x1;
        this.x2 = x2;
        this.color = color;

        lines.push(this);
    }


    draw(context) {
        context.beginPath();
        context.moveTo(this.x1, this.b);
        context.lineTo(this.x2, this.x2 * this.a + this.b);
        context.strokeStyle = this.color;
        context.stroke();
    }

    update(pos1, pos2) {
        let x = pos1.dx;
        let y = pos1.dy;
        let res1 = getSlope(pos1, pos2);
        let res2 = -Evaluate(0, res1 * x - y);
        this.a = Number(res1);
        this.b = Number(res2);
    }
}