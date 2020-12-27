const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A, B, C, Poly, ab, bc, ca, D, E, F, ha, hb, hc, CenterPoint, OutherCircle;

A = new Point(new Vector2d(100, 101), 15, 'rgb(255,0,0)', "A", true);
B = new Point(new Vector2d(305, 100), 15, 'rgb(0,0,255)', "B", true);
C = new Point(new Vector2d(305, 300), 15, 'rgb(0,255,0)', "C", true);
D = new Point(new Vector2d(300, 300), 5, 'rgb(0,1,0)', "D", false);
E = new Point(new Vector2d(300, 300), 5, 'rgb(0,1,0)', "E", false);
F = new Point(new Vector2d(300, 300), 5, 'rgb(0,1,0)', "F", false);

CenterPoint = new Point(new Vector2d(300, 300), 5, 'rgb(5,5,5)', "CenterPoint", false);
OutherCircle = new Point(new Vector2d(10, 10), 0, 'rgb(255, 255, 0, 0.3)', "Circle", false);

Poly = new polygon([A, B, C], 'rgb(10,10,10,0.2)');

ab = new LinearFunction(0, 0, 'rgb(255, 1, 255)');
bc = new LinearFunction(0, 0, 'rgb(255, 1, 255)');
ca = new LinearFunction(0, 0, 'rgb(255, 1, 255)');

ha = new LinearFunction(0, 0, 'rgb(255, 1, 255)');
hb = new LinearFunction(0, 0, 'rgb(255, 1, 255)');
hc = new LinearFunction(0, 0, 'rgb(255, 1, 255)');

let Circles = [A, B, C, D, E, F, CenterPoint, OutherCircle];
let Lines = [ab, bc, ca];

function update() {
    context.clearRect(0, 0, width, height);

    ab.slope = getSlope(B.pos, A.pos);
    ab.intercept = B.pos.dy - B.pos.dx * ab.slope

    bc.slope = getSlope(C.pos, B.pos);
    bc.intercept = C.pos.dy - C.pos.dx * bc.slope

    ca.slope = getSlope(A.pos, C.pos);
    ca.intercept = A.pos.dy - A.pos.dx * ca.slope


    //Middele points
    D.pos.dx = (A.pos.dx + B.pos.dx) / 2;
    D.pos.dy = (A.pos.dy + B.pos.dy) / 2;
    E.pos.dx = (B.pos.dx + C.pos.dx) / 2;
    E.pos.dy = (B.pos.dy + C.pos.dy) / 2;
    F.pos.dx = (C.pos.dx + A.pos.dx) / 2;
    F.pos.dy = (C.pos.dy + A.pos.dy) / 2;

    ha.slope = -1/ab.slope;
    ha.intercept = D.pos.dy - D.pos.dx*ha.slope;
    ha.draw(context);
    hb.slope = -1/bc.slope;
    hb.intercept = E.pos.dy - E.pos.dx*hb.slope;
    hb.draw(context);
    hc.slope = -1/ca.slope;
    hc.intercept = F.pos.dy - F.pos.dx*hc.slope;
    hc.draw(context);

    CenterPoint.pos.dx = ha.lineIntersection(hb).dx;
    CenterPoint.pos.dy = ha.lineIntersection(hb).dy;

    OutherCircle.pos = CenterPoint.pos;
    OutherCircle.radius = OutherCircle.pos.distanceTo(A.pos);

    // Drawing and updating the draggables
    Circles.forEach(value => value.draw(context));
    Circles.forEach(value => value.update());
    Lines.forEach(value => value.draw(context));
    Poly.draw(context);
}

setInterval(update, 1);