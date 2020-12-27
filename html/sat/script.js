const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

let WisPressed = false;
let AisPressed = false;
let SisPressed = false;
let DisPressed = false;

let ArrowUp = false;
let ArrowDown = false;
let ArrowRight = false;
let ArrowLeft = false;

canvas.width = width;
canvas.height = height;

const rects = [];

let rect1 = new satCube(width / 2, height / 2, 80, 80, 0);
let rect2 = new satCube(width / 2, height / 2 + 100, 80, 80, 0);

function init() {
    rects.push(rect1);
    rects.push(rect2);
    setInterval(update, 1);
}

function update() {
    context.clearRect(0, 0, width, height);

    rects.forEach(rect => {
        rect.draw(context);
        rect.calculateCorners();
        rect.drawCorners(context);
        rect.angle += 0.005;
    });

    for (let i = 0; i < rects.length; i++) {
        for (let j = 0; j < rects.length; j++) {
            if (i === j) return;

        }
    }
}

// get user input
document.addEventListener("keydown", function (event) {
    switch (event.key.toLowerCase()) {
        case "w":
            WisPressed = true;
            break;
        case "a":
            AisPressed = true;
            break;
        case "s":
            SisPressed = true;
            break;
        case "d":
            DisPressed = true;
            break;
        case "arrowup":
            ArrowUp = true;
            break;
        case "arrowdown":
            ArrowDown = true;
            break;
        case "arrowleft":
            ArrowLeft = true;
            break;
        case "arrowright":
            ArrowRight = true;
            break;
    }
});
document.addEventListener("keyup", function (event) {
    switch (event.key.toLowerCase()) {
        case "w":
            WisPressed = false;
            break;
        case "a":
            AisPressed = false;
            break;
        case "s":
            SisPressed = false;
            break;
        case "d":
            DisPressed = false;
            break;
        case "arrowup":
            ArrowUp = false;
            break;
        case "arrowdown":
            ArrowDown = false;
            break;
        case "arrowleft":
            ArrowLeft = false;
            break;
        case "arrowright":
            ArrowRight = false;
            break;
    }
});


canvas.addEventListener("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    document.title = "X: " + mouseX + "  Y" + mouseY;
});


init();