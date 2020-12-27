const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const static_canvas = document.createElement("canvas")
const static_context = static_canvas.getContext("2d");
const navbarOffset = document.getElementsByClassName("navbar")[0].offsetHeight;
let width = window.innerWidth;
let height = window.innerHeight - navbarOffset;

canvas.width = width;
canvas.height = height;
static_canvas.width = width;
static_canvas.height = height;

const cells = [];
const circles = [];

function initCircles() {
    circles.push(new Point(new Vector2d(width / 2, height / 2), 10));
    circles.push(new Point(new Vector2d(width / 3, height / 3), 10));
    circles.push(new Point(new Vector2d(width / 4, height / 4), 10));
    CirclesUpdateEvent();
}

function initCells() {
    let a = new Date();

    for (let y = 0; y < height; y++) {
        let array = new Array(width);
        for (let x = 0; x < width; x++) {
            let data = new CellData(x, y, getRandomColor());
            data.inCircle = data.IsInCircle(circles);
            array[x] = data;
        }
        cells[y] = array;
    }

    context.drawImage(static_canvas, 0, 0, width, height);
    let b = new Date();
    console.log(b - a);


    Animation();
}


function Animation() {
    let a = new Date();
    context.clearRect(0, 0, width, height);

    context.beginPath()
    context.fillStyle = "#393e46";
    context.fillRect(0,0,width,height);
    context.fill();
    context.closePath()

    context.drawImage(static_canvas, 0, 0, width, height);
    for (let i = 0; i < circles.length; i++) {
        circles[i].draw(context);
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (cells[y][x].inCircle) {

            }
        }
    }
    let b = new Date();

    let time = b-a;
    document.title = ""+time;
    requestAnimationFrame(Animation);
}


/**
 * this function will be triggerd everytime a circle moves ( not the player circle )
 *
 */
function CirclesUpdateEvent() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            cells[y][x].inCircle = cells[y][x].IsInCircle(circles);
        }
    }
}


initCells();
initCircles();
