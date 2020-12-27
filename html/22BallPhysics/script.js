const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let dPoints = [];

let A, B, distance;
A = new dPoint(new Vector2d(100, 100), new Vector2d(2, 2), new Vector2d(0, 0), width / 7, "rgba(255, 0,0,0.3)", "A");
B = new dPoint(new Vector2d(width / 2, height / 2), new Vector2d(-2, -2), new Vector2d(0, 0), height / 7, "rgba(0, 0,255,0.3)", "B");
dPoints.push(A);
dPoints.push(B);

A.rad = new Vector2d(1, 1);
A.tan = new Vector2d(1, 1);
B.rad = new Vector2d(1, 1);
B.tan = new Vector2d(1, 1);

function update() {
    requestAnimationFrame(update);

    context.clearRect(0, 0, width, height);

    let used = [];

    for (let i = 0; i < dPoints.length; i++) {
        let a = dPoints[i];
        for (let j = 0; j < dPoints.length; j++) {
            if (i === j) continue;
            let b = dPoints[j];


            // zodat dezelfde 2 objecten niet weer over elkaar gaan.
            let usedObj = {};
            usedObj.i = i;
            usedObj.j = j;
            let found = false;
            used.forEach(value => {
                if (value.i === j && value.j === i) found = true;
            });

            if (found) continue;

            used.push(usedObj);

            a.rad.differenceVector(b.pos, a.pos);
            b.rad.differenceVector(a.pos, b.pos);
            distance = a.rad.magnitude;


            a.rad.draw(context, a.pos.dx, a.pos.dy, a.pos.angle);
            b.rad.draw(context, b.pos.dx, b.pos.dy, b.pos.angle);
            a.tan.draw(context, a.pos.dx, a.pos.dy, a.pos.angle);
            b.tan.draw(context, b.pos.dx, b.pos.dy, b.pos.angle);


            a.rad.magnitude = 1;
            b.rad.magnitude = 1;

            a.tan.perpendicular(A.rad);
            b.tan.perpendicular(B.rad);

            a.tan.magnitude = 1;
            b.tan.magnitude = 1;


            if (distance < a.radius + b.radius) {
                console.log("COLLISON");

                a.rad.magnitude = a.vel.dot(a.rad)
                a.tan.magnitude = a.vel.dot(a.tan);

                b.tan.magnitude = b.vel.dot(b.tan);
                b.rad.magnitude = b.vel.dot(b.rad);

                let temp = new Vector2d(a.rad.dx, a.rad.dy);
                a.rad.dx = b.rad.dx;
                a.rad.dy = b.rad.dy;

                b.rad.dx = temp.dx;
                b.rad.dy = temp.dy;

                a.vel.sumVector(a.rad, a.tan);
                b.vel.sumVector(b.rad, b.tan);
            }
        }
    }


    for (let i = 0; i < dPoints.length; i++) {
        let p = dPoints[i];
        p.update();
        p.draw(context);
        p.vel.draw(context, p.pos.dx, p.pos.dy, p.vel.angle);
    }

}

update();

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 32) {
        // space
        let spawnPos = null;
        for (let i = 0; i < 25; i++) {
            if (spawnPos != null) break;
            spawnPos = new Vector2d(Mathf.random(0, width), Mathf.random(0, height));

            for (let j = 0; j < dPoints.length; j++) {
                dPoints[i].rad.differenceVector(spawnPos, dPoints[i].pos);
                let distance = dPoints[i].rad;
                if (distance < width / 10 + dPoints[i].radius + 1) {
                    // collision
                    spawnPos = null;
                    break;
                }
            }
        }
        if (spawnPos == null) {
            console.log("kon geen spawn positie vinden.")
            return;
        }
        console.log(spawnPos)
        let dp = new dPoint(spawnPos, new Vector2d(Mathf.random(-2, 2), Mathf.random(-2, 2)), new Vector2d(0, 0), width / 7, "rgba(0, 0,255,0.3)", "C");
        dp.rad = new Vector2d(1, 1);
        dp.tan = new Vector2d(1, 1);
        dPoints.push(dp);
    }
})