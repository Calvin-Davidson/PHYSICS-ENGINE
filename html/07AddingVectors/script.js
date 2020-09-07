const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let Points1 = [];
let Points2 = [];

let A, B, C;
let D, E, F;

A = new Point(new Vector2d(100, 100), 10, "rgb(255, 0, 0, 0.2)", "A", true);
B = new Point(new Vector2d(200, 100), 10, "rgb(0, 255, 0, 0.2)", "B", true);
C = new Point(new Vector2d(150, 150), 10, "rgb(0, 0, 255, 0.2)", "C", true);

let trans = new Vector2d(300, 200);

D = new Vector2d(0,0);
E = new Vector2d(0,0);
F = new Vector2d(0,0);

function Update() {
    context.clearRect(0, 0, width, height);

    A.draw(context);
    A.update();

    B.draw(context);
    B.update();

    C.draw(context);
    C.update();


    context.beginPath();
    context.moveTo(A.pos.dx, A.pos.dy);
    context.lineTo(B.pos.dx, B.pos.dy);
    context.lineTo(C.pos.dx, C.pos.dy);
    context.lineTo(A.pos.dx, A.pos.dy);
    context.fillStyle = "rgb(255,0,0,0.2)";
    context.fill();
    context.closePath();

    D.vectorSum(A.pos, trans);
    E.vectorSum(B.pos, trans);
    F.vectorSum(C.pos, trans);

    context.beginPath();
    context.moveTo(D.dx, D.dy);
    context.lineTo(E.dx, E.dy);
    context.lineTo(F.dx, F.dy);
    context.lineTo(D.dx, D.dy);
    context.fillStyle = "rgb(255,0,0,0.2)";
    context.fill();
    context.closePath();

}

setInterval(Update, 1);