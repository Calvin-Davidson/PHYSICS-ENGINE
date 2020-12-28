document.getElementById("AddCircleObject").addEventListener("mousedown", function (e) {
    addCircle();
})

document.getElementById("ClearObjects").addEventListener("mousedown", function (e) {
    Objects.length = 0;
})

document.getElementById("ResetButton").addEventListener("mousedown", function (e) {
    Objects.length = 0;
})