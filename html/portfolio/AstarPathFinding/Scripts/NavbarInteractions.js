document.getElementById("AddCircleObject").addEventListener("mousedown", function (e) {
    addCircle(height/20);
})

document.getElementById("AddBigCircleObject").addEventListener("mousedown", function (e) {
    addCircle(height/10);
})

document.getElementById("AddHugeCircleObject").addEventListener("mousedown", function (e) {
    addCircle(height/3);
})
document.getElementById("ClearObjects").addEventListener("mousedown", function (e) {
    Objects.length = 0;
})

document.getElementById("ResetButton").addEventListener("mousedown", function (e) {
    Objects.length = 0;
})