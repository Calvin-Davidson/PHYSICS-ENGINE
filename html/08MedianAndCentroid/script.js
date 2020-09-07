const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A, B, C;

A = new Point(new Vector2d(100, 100), 10, "rgb(255, 0,0)", "01", true);
B = new Point(new Vector2d(500, 100), 10, "rgb(0,255,0)", "01", true);
C = new Point(new Vector2d(250, 500), 10, "rgb(0,0,255)", "01", true);

let D, E, F;
D = new Point(new Vector2d(250, 500), 10, "rgb(0,255, 255)", "01", false);
E = new Point(new Vector2d(250, 500), 10, "rgb(255,255, 0)", "01", false);
F = new Point(new Vector2d(250, 500), 10, "rgb(255,0, 255)", "01", false);

let LA, LB, LC;

LA = new LinearFunction(2,0, "blue");
LB = new LinearFunction(2,0, "red");
LC = new LinearFunction(2,0, "orange");

let Points = [A, B, C, D, E, F];

function update() {
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < Points.length; i++) {
        Points[i].draw(context);

        if (Points[i].draggable) {
            Points[i].update();
        }
    }
    context.beginPath();

    context.strokeStyle = "orange";
    context.moveTo(A.pos.dx, A.pos.dy);
    context.lineTo(B.pos.dx, B.pos.dy);
    context.lineTo(C.pos.dx, C.pos.dy);
    context.lineTo(A.pos.dx, A.pos.dy);
    context.stroke();
    context.closePath();

    LA.slope = getSlope(A.pos, E.pos);
    LA.intercept = -(LA.slope * A.pos.dx - A.pos.dy);
    LA.draw(context);

    LB.slope = getSlope(B.pos, F.pos);
    LB.intercept = -(LB.slope * B.pos.dx - B.pos.dy);
    LB.draw(context);

    LC.slope = getSlope(C.pos, D.pos);
    LC.intercept = -(LC.slope * C.pos.dx - C.pos.dy);
    LC.draw(context);

    D.pos = new Vector2d((A.pos.dx + B.pos.dx) / 2, (A.pos.dy + B.pos.dy) / 2);
    E.pos = new Vector2d((B.pos.dx + C.pos.dx) / 2, (B.pos.dy + C.pos.dy) / 2);
    F.pos = new Vector2d((A.pos.dx + C.pos.dx) / 2, (A.pos.dy + C.pos.dy) / 2);
}

setInterval(update, 1)

