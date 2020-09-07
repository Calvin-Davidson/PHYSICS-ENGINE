const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let angle = 0.1;


let img = new Image;
img.src = "img/cog.png";

let img2 = new Image;
img2.src = "img/cog2.png";

let img3 = new Image;
img3.src = "img/cog3.png";
images = [img, img2, img3];

img.addEventListener("load", start);

function start() {
    setInterval(update, 1)
}


function update() {
    context.clearRect(0, 0, width, height);

    // Mooie gray background
    context.fillStyle = "gray"
    context.fillRect(0, 0, width, height);


    for (let i = 0; i < images.length; i++) {
        context.save();
        context.translate(300 + (400 * i), 300);
        if (i % 2) {
            context.rotate(angle);
        } else {
            context.rotate(-angle + 0.35)
        }

        context.drawImage(images[i], -210, -210, 420, 420);
        context.restore();

    }
    angle += 0.001;
}

