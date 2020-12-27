const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let centerX = width/2;
let centerY = height/2;

let mouseX = width/2;
let mouseY = height/2;

let arrow = {};
arrow.sh = 12.5;
arrow.sw = 500;
arrow.hh = 25;
arrow.hw = 40;
arrow.angle = 0;
arrow.draw = function() {

    arrow.sw = new Vector2d(centerX, centerY).distanceTo(new Vector2d(mouseX, mouseY)) - arrow.hw;
    context.beginPath();
    context.save();
    context.translate(centerX, centerY);
    context.rotate(arrow.angle);

    moveTo(0,0);
    context.lineTo(0, arrow.sh);
    context.lineTo(arrow.sw, arrow.sh);
    context.lineTo(arrow.sw, arrow.hh);
    context.lineTo(arrow.sw + arrow.hw, 0);
    context.lineTo(arrow.sw, -arrow.hh);
    context.lineTo(arrow.sw, -arrow.sh)
    context.lineTo(0, -arrow.sh);
    context.lineTo(0,0);


    context.fillStyle = "rgba(255, 25, 255)";
    context.fill();
    context.stroke();
    context.restore();
    context.closePath()
}

canvas.addEventListener("mousemove", function (e) {
    context.clearRect(0,0,width,height)
    mouseX = e.clientX;
    mouseY = e.clientY;

    let dx = mouseX - centerX;
    let dy = mouseY - centerY;

    arrow.angle = (Math.atan2(dy, dx));

    context.beginPath();
    context.arc(mouseX, mouseY, 5, 0, 2 * Math.PI);
    context.stroke();
    context.closePath()

    context.beginPath();
    context.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    context.stroke();
    context.closePath()

    context.beginPath();
    context.moveTo(mouseX, mouseY);
    context.lineTo(centerX, mouseY);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(mouseX, mouseY);
    context.lineTo(mouseX, centerY);
    context.stroke();
    context.closePath();

    arrow.draw();
});

