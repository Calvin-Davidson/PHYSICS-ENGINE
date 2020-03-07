const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let me = new Point(new Vector2d(width / 2, height / 2), 20, 0, true)
new Point(new Vector2d(width / 3, height / 3), 20, 0, true)
let p3 = new Point(new Vector2d(width / 1.5, height / 1.5), 20, 0, false);
p3.VelSpeed = 10;
p3.VelX = getRandomInt(-2, 5);
p3.VelY = getRandomInt(-2, 10);


function Update() {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < points.length; i++) {
        points[i].update();
        points[i].draw(context);
        points[i].wallCollision(width, height);
    }
}

setInterval(Update, 0);
