const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let CarImg = new Image();
CarImg.src = "img/car.png"

let WheelImg = new Image();
WheelImg.src = "img/Wheel.png";

let car = new Car(CarImg, WheelImg);


let AisPressed = false;
let DisPressed = false;

let movementSpeed = 0;

setTimeout(start, 10);


function start() {
    console.log(true)
    context.drawImage(CarImg, 50, height - 270);
    context.drawImage(WheelImg, 185, height - 150);
    context.drawImage(WheelImg, 725, height - 150);
}


function updateScreen() {
    context.clearRect(0, 0, width, height);

    car.draw(context);
}

let slowDown = 1;
function movement() {
    let AccelerationSpeed = 0.01;
    if (AisPressed) movementSpeed -= AccelerationSpeed;
    if (DisPressed) movementSpeed += AccelerationSpeed;


    if (!AisPressed && !DisPressed && movementSpeed != 0) {
        slowDown = 0.1;
        if (movementSpeed > 0) movementSpeed -= slowDown;

        if (movementSpeed < 0) movementSpeed += slowDown;

        if (movementSpeed < 0.1 && movementSpeed > -0.1) movementSpeed = 0;

        if (slowDown < 5) slowDown += 0.001;
    }

    car.Move(movementSpeed);
    updateScreen();
}

document.addEventListener("keydown", function (e) {
    if (e.key == 'a') {
        AisPressed = true;
    }
    if (e.key == 'd') {
        DisPressed = true;
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key == 'a') {
        AisPressed = false;
    }
    if (e.key == 'd') {
        DisPressed = false;
    }
});


setInterval(movement, 1);

