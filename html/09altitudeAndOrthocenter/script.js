const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A, B, C;
let LineA, LineB, LineC;
let ab, bc, ca;

A = new Point(new Vector2d(100, 100), 25, "rgb(255,0,0)", "A", true);
B = new Point(new Vector2d(400, 100), 25, "rgb(0,255,0)", "B", true);
C = new Point(new Vector2d(101, 400), 25, "rgb(0,0,255)", "C", true);

LineA = new LinearFunction(0, 0, "orange");
LineB = new LinearFunction(0, 0, "orange");
LineC = new LinearFunction(0, 0, "orange");

ab = new LinearFunction(0, 0, "purple");
bc = new LinearFunction(0, 0, "purple");
ca = new LinearFunction(0, 0, "purple");

let Points = [A, B, C];

function update() {
    context.clearRect(0, 0, width, height);
    Points.forEach(value => value.draw(context));
    Points.forEach(value => value.update());

    // Triangle
    context.beginPath();
    context.fillStyle = "rgb(25,25,25, 0.2)"
    context.moveTo(A.pos.dx, A.pos.dy);
    context.lineTo(B.pos.dx, B.pos.dy);
    context.lineTo(C.pos.dx, C.pos.dy);
    context.lineTo(A.pos.dx, A.pos.dy);
    context.stroke();
    context.fill();
    context.closePath();

    LineA.slope = getSlope(A.pos, B.pos);
    LineA.intercept = A.pos.dy - (LineA.slope * A.pos.dx);

    LineB.slope = getSlope(B.pos, C.pos);
    LineB.intercept = B.pos.dy - (LineB.slope * B.pos.dx);

    LineC.slope = getSlope(C.pos, A.pos);
    LineC.intercept = C.pos.dy - (LineC.slope * C.pos.dx);

    LineA.draw(context);
    LineB.draw(context);
    LineC.draw(context);


    // de loodrechten lijnen.
    ab.slope = -1/LineA.slope;
    ab.intercept = C.pos.dy - C.pos.dx * ab.slope;

    bc.slope = -1/LineB.slope;
    bc.intercept = A.pos.dy - A.pos.dx * bc.slope;

    ca.slope = -1/LineC.slope;
    ca.intercept = B.pos.dy - B.pos.dx * ca.slope;

    ab.draw(context);
    bc.draw(context);
    ca.draw(context);
}


setInterval(update, 1);