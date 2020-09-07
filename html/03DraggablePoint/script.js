const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;



new Point(new Vector2d(getRandomInt(50, width-50), getRandomInt(50, height-50)), 50,"red", true);
new Point(new Vector2d(getRandomInt(50, width-50), getRandomInt(50, height-50)), 50,"blue", true);
new Point(new Vector2d(getRandomInt(50, width-50), getRandomInt(50, height-50)), 50,"green", true);

function update() {
    context.clearRect(0,0,width,height);

    for (let i = 0; i < points.length; i++) {
        points[i].update();
        points[i].draw(context);
    }
}

document.addEventListener("mousemove", function (e) {
   update();
})
