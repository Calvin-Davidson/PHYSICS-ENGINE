const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

// begin hier met jouw code voor deze opdracht

let circles = [];


function newCircle() {
    if (circles.length <= 100) {
        let p = new Point(new Vector2d(getRandomInt(0, width), getRandomInt(0, height)), getRandomInt(10, 50), getRandomColor(), getRandomInt(4, 8));
        p.draw(context);

        circles.push(p);
    }
}

setInterval(newCircle, 10);






function Update() {
context.clearRect(0, 0, width , height);

    for(let i = 0; i < circles.length; i++) {
        let newX = circles[i].pos.dx + circles[i].VelX;
        let newY = circles[i].pos.dy + circles[i].VelY;

        circles[i].pos = new Vector2d(newX, newY);
        circles[i].draw(context);
        circles[i].wallCollision(width, height);
    
        // collision with walls
    }
}

setInterval(Update, 10);