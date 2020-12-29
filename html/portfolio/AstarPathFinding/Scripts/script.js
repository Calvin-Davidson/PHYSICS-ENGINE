const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const CellsCanvas = document.createElement("canvas")
const CellsContext = CellsCanvas.getContext("2d");

const navbarOffset = document.getElementsByClassName("navbar")[0].offsetHeight;

let width = window.innerWidth;
let height = window.innerHeight - navbarOffset;

canvas.width = CellsCanvas.width = width;
canvas.height = CellsCanvas.height = height;

const Objects = [];
const Cells = [];
const Player = new Circle(10, 10, 25);
const PlayerArrayPos = new Vector2d(10, 10);
const PlayerTargetPos = new Vector2d(50, 50);

let ShowCellsGrid = false;

Player.strokeStyle = "#00adb5";
Player.fillStyle = "#222831";


function init() {
    for (let y = 0; y < Math.ceil(height / Player.radius); y++) {
        let array = new Array(Math.ceil(width / Player.radius));
        for (let x = 0; x < Math.ceil(width / Player.radius); x++) {
            array[x] = new CellData(x * (Player.radius), y * (Player.radius), x, y);
            array[x].show(CellsContext);
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

    if (ShowCellsGrid) context.drawImage(CellsCanvas, 0, 0, width, height);

    // als er een path is.
    if (path.length > 0) {
        PlayerMovement();
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


let moveTimer = 0;
let moveDelay = 3;
function PlayerMovement() {
    if (moveTimer < moveDelay) {
        moveTimer+=1;
        return;
    }
    PlayerArrayPos.dx = path[path.length - 1].arrayX;
    PlayerArrayPos.dy = path[path.length - 1].arrayY;

    path.pop();
    moveTimer = 0;
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


function updateGridCanvas() {
    for (let y = 0; y < Math.ceil(height / Player.radius); y++) {
        for (let x = 0; x < Math.ceil(width / Player.radius); x++) {
            let cell = Cells[y][x];

            cell.show(CellsContext);

            for (let i = 0; i < cell.neightbors.length; i++) {
                CellsContext.beginPath()
                CellsContext.moveTo(cell.x, cell.y);
                CellsContext.lineTo(cell.neightbors[i].x, cell.neightbors[i].y);
                CellsContext.stroke();
                CellsContext.closePath();
            }
        }
    }
}


function addCircle(radius) {
    Objects.push(new Circle(width / 2, height / 2, radius));

    reCheckCellCollision();
    updateGridCanvas();
}


init();