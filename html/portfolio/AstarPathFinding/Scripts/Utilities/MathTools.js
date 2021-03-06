/*
function returning a random number between a min and a maximum value
*/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSlope(pos1, pos2) {
    return (pos2.dy - pos1.dy) / (pos2.dx - pos1.dx);
}

function getIntercept(Position, Line) {
    return Position.dy, Position.dx * Line.slope;
}
function avg(a, b) {
    return ((a + b) / 2);
}