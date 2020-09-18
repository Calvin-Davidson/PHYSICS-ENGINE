const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let clockImg = new Image();
clockImg.src = "images/clockFace.png";
let hoursHand = new Image();
hoursHand.src = "images/hoursHand.png";
let minutesHand = new Image();
minutesHand.src = "images/minutesHand.png";
let secondsHand = new Image();
secondsHand.src = "images/secondHand.png";

let milisecondsHand = new Image();
milisecondsHand.src = "images/milisecondsHand.png";



function UpdateClock() {
    context.clearRect(0, 0, width, height);

    let date = new Date();
    let Milliseconds = date.getMilliseconds();
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    console.log("Minutes: " + minutes);
    console.log("seconds: " + seconds);
    console.log("hours: " + hours);


    context.drawImage(clockImg, 0, 0);

    context.save();
    context.translate(clockImg.width / 2, clockImg.height / 2);
    context.rotate(Milliseconds * (2 * Math.PI) / 1000);
    context.drawImage(milisecondsHand, -70, -milisecondsHand.height);
    context.restore();

    context.save();
    context.translate(clockImg.width / 2, clockImg.height / 2);
    context.rotate(seconds * (2 * Math.PI) / 60 + Milliseconds * 2 * Math.PI / 3600000);
    context.drawImage(secondsHand, -70, -secondsHand.height);
    context.restore();

    context.save();
    context.translate(clockImg.width / 2, clockImg.height / 2);
    context.rotate(minutes * 2 * Math.PI / 60 + seconds * 2 * Math.PI / 3600);
    context.drawImage(minutesHand, -20, -minutesHand.height);
    context.restore();

    context.save();
    context.translate(clockImg.width / 2, clockImg.height / 2);
    context.rotate(hours * 2 * Math.PI / 12 + minutes * 2 * Math.PI / 720);
    context.drawImage(hoursHand, -20, -hoursHand.height);
    context.restore();

    context.stroke();
}


setInterval(UpdateClock, 1);
