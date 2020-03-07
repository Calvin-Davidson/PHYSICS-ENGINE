const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let p = new Point(new Vector2d(width / 2, height / 2), 25, "red", 1000);
p.VelY = 1;
p.VelX = 1;
p.VelSpeed = 2.5;

let offsetCounter = 0;

function Update() {
    context.clearRect(0, 0, width, height);


    for (let i = 0; i < p.VelSpeed; i++) {
        p.pos = new Vector2d(p.pos.dx + p.VelX, p.pos.dy + p.VelY);
        p.wallCollision(width, height)
        p.draw(context);
    }

}

setInterval(Update, 1);

let c = new Point(new Vector2d(width / 2, height / 2), 250, "red", 1);
c.CircleBorder(c.pos.dx, c.pos.dy, c.radius, 1008);

function update2() {
    offsetCounter += 0.001
    context.clearRect(0, 0, width, height);
    c.CircleBorder(c.pos.dx, c.pos.dy, c.radius, 100, offsetCounter);
}

//setInterval(update2, 1);


let P3 = new Point(new Vector2d(width / 2, height / 2), 250, "green", 0);
let P3offset = 0;
let P3offsetCalc = 0;
let P3Fuckery = false;

function update3() {
    ClearScreen(true);

    P3offset += P3offsetCalc;

    for (let i = 0; i < 200; i++) {
        if (i % 1 === 0) {
            P3offset = -(P3offset)
        }
        P3.CircleBorder(P3.pos.dx, P3.pos.dy, 10 + i * 15, 4 * 12, P3offset * (i * 2), P3Fuckery);
    }
}

// setInterval(update3, 1);


document.addEventListener("keydown", function (e) {
    console.log("pressed");
    console.log(e.keyCode);
    if (e.keyCode === 39) { // right arrow
        P3offsetCalc += 0.00001;
    } else if (e.keyCode === 37) { // left arrow
        P3offsetCalc -= 0.00001;
    } else if (e.keyCode === 53) { // 5
        if (P3Fuckery) {
            P3Fuckery = false;
        } else {
            P3Fuckery = true;
        }
    }
});

function ClearScreen(Trans) {
    let color;
    if (Trans) {
        color = "rgba(0, 0, 0, 0.1)";
    } else {
        color = "white";
    }
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
}