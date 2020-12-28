const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const navbarOffset = document.getElementsByClassName("navbar")[0].offsetHeight;

let width = window.innerWidth;
let height = window.innerHeight - navbarOffset;

canvas.width = width;
canvas.height = height;


const Objects = [];
const Cells = [];
const Player = new Circle(10, 10, 25);
const PlayerArrayPos = new Vector2d(10, 10);

const PlayerTargetPos = new Vector2d(50, 50);

Player.strokeStyle = "#00adb5";
Player.fillStyle = "#222831";


function init() {
    for (let y = 0; y < Math.ceil(height / Player.radius * 2); y++) {
        let array = new Array(Math.ceil(width / Player.radius * 2));
        for (let x = 0; x < Math.ceil(width / Player.radius * 2); x++) {
            array[x] = new CellData(x * (Player.radius / 2), y * (Player.radius / 2), x, y);
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
    drawPlayer();

    // als er een path is.
    if (path.length > 0) {
        drawPath();
    }

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

function drawPlayer() {
    Player.x = Cells[PlayerArrayPos.dy][PlayerArrayPos.dx].x;
    Player.y = Cells[PlayerArrayPos.dy][PlayerArrayPos.dx].y;
    Player.draw(context);
}

function drawPath() {
    if (path.length === 0) return;

    for (let i = 0; i < path.length; i++) {
        let value = path[i];

        context.beginPath();

        context.fillStyle = "green"

        context.arc(value.x, value.y, 5, 0, 2 * Math.PI);
        context.fill()
        context.closePath();
    }


    context.fillStyle = "#393e46";
}

function addCircle(radius) {
    Objects.push(new Circle(width / 2, height / 2, radius));
}

function addRect() {
    console.log("Rect objects are not yet implemented");
}

init();