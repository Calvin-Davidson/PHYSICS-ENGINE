const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

// begin hier met jouw code voor deze opdracht


        let p = new Point(new Vector2d(getRandomInt(0, width), getRandomInt(0, height)), getRandomInt(10, 50), getRandomColor(), getRandomInt(4, 8), true);
        p.draw(context);







function update() {
context.clearRect(0, 0, width , height);

    for(let i = 0; i < points.length; i++) {
        circles[i].draw(context);
        circles[i].update();
    
        // collision with walls
    }
}

setInterval(Update, 10);