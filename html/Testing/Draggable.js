const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let MouseX;
let MouseY;
let MouseDown = false;

new Point(new Vector2d(width / 2, height / 2), 20, 0, 0, true)
new Point(new Vector2d(width / 3, height / 3), 20, 0, 0, true)
new Point(new Vector2d(width / 1.5, height / 1.5), 20, 0, 0, false).draw(context);

document.addEventListener("mousedown", function (e) {
    MouseDown = true

    if (MouseDown === true) {
        setInterval(function (e) {
                for (let i = 0; i < points.length; i++) {
                    if (new Vector2d(MouseX, MouseY).distanceTo(points[i].pos) <= points[i].radius) {
                        points[i].clicked();
                    }
                }
            if (MouseDown === false) {
                clearInterval(this);
            }
            }
        );
    }
});


function Update() {
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < points.length; i++) {
        points[i].draw(context);
    }
}

setInterval(Update, 0);

document.addEventListener("mouseup", function (e) {
    MouseDown = false
});

document.addEventListener("mousemove", function (e) {
    MouseX = e.pageX;
    MouseY = e.pageY;
});
