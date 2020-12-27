const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;


let v = new Vector2d(width/2, height/2);
let p = new Point(new Vector2d(width/2, height/2), 25, "black", true)

function update() {
    context.clearRect(0,0,width,height);
    p.update();
    p.draw(context);

    let dx = mouseX - v.dx;
    let dy = mouseY - v.dy;

    v.draw(Math.atan2(dx, dy));

    requestAnimationFrame(update)
}

update();