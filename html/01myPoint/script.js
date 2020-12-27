const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let limit = 10;
let hasLimit = true;
let circles = [];



function newCircle() {
    if (hasLimit == false || circles.length <= limit) {
        let p = new Point(new Vector2d(getRandomInt(0, width), getRandomInt(0, height)), getRandomInt(10, 50), getRandomColor(), true);
        p.draw(context);

        if (hasLimit) {
            circles.push(p);
        }
    }
}

setInterval(newCircle, 1);


function Update() {
    if (hasLimit) {
        context.clearRect(0, 0, width, height);

        for (let i = 0; i < circles.length; i++) {
            circles[i].draw(context);
            circles[i].update();
            // collision with walls
        }
    }
}

setInterval(Update, 10);

document.addEventListener("keydown", function (e)  {
    if (e.keyCode == 49) {
        if (hasLimit) {
            hasLimit = false;
        } else {
            hasLimit = true;
        }
    }
})