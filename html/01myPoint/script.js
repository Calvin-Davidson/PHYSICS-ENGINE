const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

// begin hier met jouw code voor deze opdracht

function newCircle() {
let p = new Point(new Vector2d(getRandomInt(0, width), getRandomInt(0, height)), getRandomInt(2, 50), getRandomColor());
p.draw(context);
}

setInterval(newCircle, 10);