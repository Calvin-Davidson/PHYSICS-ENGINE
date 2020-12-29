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

document.getElementById("ShowAndHideGrid").addEventListener("mousedown", function (e) {
   let Button = document.getElementById("ShowAndHideGrid").children[0];
   if (Button.innerHTML === "ShowGrid") {
       Button.innerHTML = "HideGrid";
       ShowCellsGrid = true;
   } else {
       Button.innerHTML = "ShowGrid";
       ShowCellsGrid = false;
   }
});