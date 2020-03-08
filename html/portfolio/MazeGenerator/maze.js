const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth / 1.2;
const height = window.innerHeight / 1.2;

canvas.width = width;
canvas.height = height;


let grid = [];
let steps = [];
let current;

let size = 50;
let ClearArraysWhenDone = false;

let mazeTimer = 10;
let MazeTimerFast = true;

setup();
MazeGen();


function setup() {
    let cols = Math.floor(width / size);
    let rows = Math.floor(height / size);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let c = new cell(i * size, j * size);
            grid.push(c);
        }
    }

    current = grid[0];
}


function MazeGen() {

    current.visited = true;

    let next = current.checkNeighbors();
    if (next) {
        removeWalls(current, next);

        steps.push(current);
        current = next;

        if (optionsLeft()) {
            MazeGenTimer();
        }
    } else {
        if (steps.length > 0) {
            current = steps.pop();
            if (optionsLeft()) {
                MazeGenTimer();
            }
        }
    }
    draw();
}


function MazeGenTimer() {
    if (MazeTimerFast) {
        setTimeout(function () {
            if (optionsLeft()) {
                MazeGen();
                draw();
            }
        }, size / mazeTimer);
    } else {
        setTimeout(function () {
            if (optionsLeft()) {
                MazeGen();
                draw();
            }
        }, size * mazeTimer);
    }
}

function draw() {
    context.clearRect(0, 0, width, height);

    if (optionsLeft()) {
        showCurrent();
    }

    for (let i = 0; i < grid.length; i++) {
        let x = grid[i].x;
        let y = grid[i].y;
        if (grid[i].walls[0] == true) {
            line(x, y, x + size, y);
        }
        if (grid[i].walls[1] == true) {
            line(x + size, y, x + size, y + size);
        }
        if (grid[i].walls[2] == true) {
            line(x + size, y + size, x, y + size);
        }
        if (grid[i].walls[3] == true) {
            line(x, y + size, x, y);
        }
    }
}

function showCurrent() {
    let x = current.x;
    let y = current.y;

    line(x, y, x + size, y, "blue");
    line(x + size, y, x + size, y + size, "blue");
    line(x + size, y + size, x, y + size, "blue");
    line(x, y + size, x, y, "blue");
}

function line(x1, y1, x2, y2, color = "black") {
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function index(i, j) {
    let cols = Math.floor(width / size);
    let rows = Math.floor(height / size);

    let x = i / size;
    let y = j / size;

    if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
        return -1;
    }
    return Math.floor(x + y * cols);
}

function removeWalls(a, b) {
    let x = a.x - b.x;

    if (x === size) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -size) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    let y = a.y - b.y;
    if (y === size) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -size) {
        a.walls[2] = false;
        b.walls[0] = false;
    }

}


function optionsLeft() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].visited == false) {
            return true;
        }
    }
    return false;
}

if (ClearArraysWhenDone) {
    Timer();

    function Timer() {
        if (!(optionsLeft())) {
            clear();
        } else {
            setInterval(function () {
                Timer();
            }, 5000);
        }
    }

    function clear() {
        for (let i = 0; i < grid.length; i++) {
            grid.shift();
        }
    }
}