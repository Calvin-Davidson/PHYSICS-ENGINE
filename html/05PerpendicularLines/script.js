const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let dPoints = [];

let A, B, distance;
A = new dPoint(new Vector2d(100, 100), new Vector2d(4, 4), new Vector2d(0, 0), 150, "rgba(255, 0,0,0.3)", "A");
B = new dPoint(new Vector2d(width / 2, height / 2), new Vector2d(-4, -4), new Vector2d(0, 0), 150, "rgba(0, 0,255,0.3)", "B");

A.rad = new Vector2d(1, 1);
A.tan = new Vector2d(1, 1);
B.rad = new Vector2d(1, 1);
B.tan = new Vector2d(1, 1);

function update() {
    requestAnimationFrame(update);

    context.clearRect(0, 0, width, height);

    A.rad.differenceVector(B.pos, A.pos);
    B.rad.differenceVector(A.pos, B.pos);
    distance = A.rad.magnitude;

    A.rad.draw(context, A.pos, 1, "ORANGE");
    A.rad.draw(context, A.pos, 1, "ORANGE");
    A.tan.draw(context, A.pos, 1, "GREEN");
    B.tan.draw(context, B.pos, 1, "GREEN");

    if (distance < B.radius + A.radius) {

        A.rad.magnitude = A.vel.dot(A.rad)
        A.tan.magnitude = A.vel.dot(A.tan);

        B.tan.magnitude = B.vel.dot(B.tan);
        B.rad.magnitude = B.vel.dot(B.rad);

        let temp = new Vector2d(1, 1);
        temp.dx = A.rad.dx;
        temp.dy = A.rad.dy;

        A.rad.dx = B.rad.dx;
        A.rad.dy = B.rad.dy;

        B.rad.dx = temp.dx;
        B.rad.dy = temp.dy;

        A.vel.sumVector(A.rad, A.tan);
        B.vel.sumVector(B.rad, B.tan);

        console.log("There was a collsion between the balls");
    }


    A.update();
    A.draw(context);
    A.vel.draw(context, A.pos, 50, "BLACK");

    B.update();
    B.draw(context);
    B.vel.draw(context, B.pos, 50, "BLACK");

}

update();

