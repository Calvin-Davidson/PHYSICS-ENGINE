const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let p = [];

for (let i = 0; i < 5; i++) {
    p.push(new Point(new Vector2d(getRandomInt(0, width), getRandomInt(0, height)), 10, "red", true));
}


let pol = new polygon(p);
pol.draw(context);

setInterval(pUpdate, 1);

function pUpdate() {
    context.clearRect(0,0,width,height);

    for (let i = 0; i < points.length; i++) {
        points[i].draw(context);
        points[i].update();
    }
    pol.draw(context);
}