const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const static_canvas = document.createElement("canvas")
const static_context = static_canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;
static_canvas.width = width;
static_canvas.height = height;

let objects = [];

function init() {
    for (let i = 0; i < 100000; i++) {
        objects.push(new Point(new Vector2d(getRandomInt(0, width), getRandomInt(0, height)), getRandomInt(5, 10), getRandomColor(), false));
        objects[i].draw(static_context);
    }

    draw();
}

function draw(){
    let a = new Date();
    context.drawImage(static_canvas, 0,0,width,height)
    let b = new Date();
    console.log(b-a);
    requestAnimationFrame(draw);
}

init();