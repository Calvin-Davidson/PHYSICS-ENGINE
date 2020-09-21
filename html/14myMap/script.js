//2400  -  960
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let BigMap, SmallMap, mouseX, mouseY, scale;
BigMap = new Image(width, height);
BigMap.src = "images/map_highres.jpg"
SmallMap = new Image();
SmallMap.src = "images/map_lowres.jpg"

let scaleX = BigMap.width/SmallMap.width;
let scaleY = BigMap.height/SmallMap.height;

function animate() {
    context.clearRect(0, 0, width, height);

    context.drawImage(BigMap, 0, 0, width, height);

    let sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight;
    sx = mouseX / scaleX - 25; // De x cord van de image vanaf waar je wil selecteren
    sy = mouseY / scaleY - 25; // De y cord van de image vanaf waar je wil selecteren
    sWidth = 50; // Hoe breed het knippen is
    sHeight = 50; // Hoe hoog het knippen is
    dx = mouseX-50; // De positie waar de image getekend moet worden
    dy = mouseY-50; // De image waar de image getekend moet worden
    dWidth = 100;  // Hoe breed die image is die we teken in de canvas
    dHeight = 100; // De heigt van de image die we in de canvas tekenen

    context.drawImage(SmallMap, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

setInterval(animate, 10)


document.addEventListener("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});
