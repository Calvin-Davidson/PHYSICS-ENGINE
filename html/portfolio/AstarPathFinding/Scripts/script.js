const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const navbarOffset = document.getElementsByClassName("navbar")[0].offsetHeight;

let width = window.innerWidth;
let height = window.innerHeight - navbarOffset;

canvas.width = width;
canvas.height = height;


const Objects = [];
const Cells = [];
const Player = new Circle(50, 50, 25);
const PlayerTargetPos = new Vector2d(50, 50);

Player.strokeStyle = "#00adb5";
Player.fillStyle = "#222831";


function init() {

    for (let y = 0; y < height; y++) {
        let array = new Array(width);
        for (let x = 0; x < width; x++) {
            array[x] = new CellData(x, y, getRandomColor());
        }
        Cells[y] = array;
    }

    addCircle()


    reCheckCellCollision();
    animate();
}

function animate() {
    clearCanvas();
    drawObjects();
    Player.draw(context);
    drawPath();

    requestAnimationFrame(animate);
}

function clearCanvas() {
    context.beginPath();
    context.clearRect(0, 0, width, height);
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#393e46";
    context.fill();
    context.closePath()
}

function drawObjects() {
    for (let i = 0; i < Objects.length; i++) {
        Objects[i].draw(context);
    }
}

function drawPath() {
    if (openSet.length === 0) return;
    console.log("Drawing path")

    for (let i = 0; i < path.length; i++) {
        let value = path[i];

        context.beginPath();

        context.fillStyle = "green"
        if (i < path.length/2) context.fillStyle = "blue"

        context.arc(value.x, value.y, 5, 0, 2 * Math.PI);
        context.fill()
        context.closePath();
    }


    context.fillStyle = "#393e46";
}

function addCircle() {
    Objects.push(new Circle(width / 2, height / 2, height / 20));
}

function addRect() {
    console.log("Rect objects are not yet implemented");
}

init();