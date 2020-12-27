const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;


let line1Punt1 = new Point(new Vector2d(getRandomInt(0, width - 10), getRandomInt(0, height - 10)), 10, "blue", true);
let line1Punt2 = new Point(new Vector2d(getRandomInt(0, width - 10), getRandomInt(0, height - 10)), 10, "blue", true);

let line2Punt1 = new Point(new Vector2d(getRandomInt(0, width - 10), getRandomInt(0, height - 10)), 10, "red", true);
let line2Punt2 = new Point(new Vector2d(getRandomInt(0, width - 10), getRandomInt(0, height - 10)), 10, "red", true);

let line3Punt1 = new Point(new Vector2d(getRandomInt(0, width - 10), getRandomInt(0, height - 10)), 10, "green", true);
let line3Punt2 = new Point(new Vector2d(getRandomInt(0, width - 10), getRandomInt(0, height - 10)), 10, "green", true);


let line1 = new LinearFunction(getSlope(line1Punt1.pos, line1Punt2.pos), 0);
let line2 = new LinearFunction(getSlope(line2Punt1.pos, line2Punt2.pos), 0);
let line3 = new LinearFunction(getSlope(line3Punt1.pos, line3Punt2.pos), 0);

setInterval(update, 1);
setInterval(update, 1);

function update() {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < points.length; i++) {
        points[i].draw(context);
        points[i].update();
    }

    line1.slope = getSlope(line1Punt1.pos, line1Punt2.pos);
    line2.slope = getSlope(line2Punt1.pos, line2Punt2.pos);
    line3.slope = getSlope(line3Punt1.pos, line3Punt2.pos);
    {
        for (let i = 0; i < lines.length; i++) {
            for (let j = lines.length - 1; j > 0; j--) {
                let x = lines[i].lineIntersection(lines[j]).dx;
                let y = lines[i].lineIntersection(lines[j]).dy;

                context.beginPath();
                context.arc(x, y, 10, 0, 2 * Math.PI);
                context.stroke();
                context.closePath();
            }
        }
    }

        line1.intercept = -(line1.slope * line1Punt1.pos.dx - line1Punt1.pos.dy);
        line2.intercept = -(line2.slope * line2Punt1.pos.dx - line2Punt1.pos.dy);
        line3.intercept = -(line3.slope * line3Punt1.pos.dx - line3Punt1.pos.dy);

        for (let i = 0; i < lines.length; i++) {
            lines[i].draw(context);
        }
    }
