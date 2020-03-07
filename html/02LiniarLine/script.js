const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

function allLine() {
    let p4 = new Point(new Vector2d(getRandomInt(20, width), getRandomInt(20, height)), 30, getRandomColor(), true);
    p4.VelY = getRandomInt(-1, 1);
    p4.VelX = getRandomInt(-1, 1);
    p4.VelSpeed = getRandomInt(-10, 10);
    new LiniarLine(0, 0, 0, width, getRandomColor());
}
allLine();
allLine();
allLine();
function Update() {

    context.clearRect(0, 0, width, height);

    for (let i = 0; i < points.length; i++) {
        points[i].draw(context);
        points[i].update();
        points[i].wallCollision(width, height);
    }

    for (let i = 0; i < points.length; i++) {
        for (let i2 = i + 1; i2 < points.length; i2++) {
            lines[i2].update(points[i].pos, points[i2].pos);
            lines[i2].draw(context);
        }
    }
}

setInterval(Update, 1);

