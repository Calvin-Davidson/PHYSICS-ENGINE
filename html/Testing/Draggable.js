const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let MouseX;
let MouseY;

let p = new Point(new Vector2d(width / 2, height / 2), 20, 0, 0, true)
let p2 = new Point(new Vector2d(width / 3, height / 3), 20, 0, 0, true)
p.draw(context);
p2.draw(context);


document.addEventListener("mousedown", function (e) {
    for(let i = 0; i < points.length; i++) {
            if (new Vector2d(MouseX, MouseY).distanceTo(points[i].pos) <= points[i].radius) {
                // als je in de circle drukt
                points[i].clicked();
            }
        }
    });


function Update() {
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < points.length; i++) {
        points[i].draw(context);
    }
}

setInterval(Update, 0);






document.addEventListener("mousemove", function (e) {
    MouseX = e.pageX;
    MouseY = e.pageY;
});
