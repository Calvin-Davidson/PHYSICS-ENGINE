let lines = [];

class LinearFunction {
    constructor(slope, intercept) {
    this.slope = slope;
    this.color = "black";
    this.intercept = intercept;

    lines.push(this);
    }


    y(x) {
        return x * this.slope + this.intercept;
    }

    draw(context) {
        context.beginPath();
        context.moveTo(0, this.y(0));
        context.lineTo(canvas.width, this.y(canvas.width));
        context.strokeStyle = this.color;
        context.stroke();
    }

    lineIntersection(Line){
        let x = (Line.intercept - this.intercept)/(this.slope-Line.slope);
        let y = (x * this.slope) + this.intercept
        return new Vector2d(x,y);
    }
}
