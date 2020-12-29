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
    reCheckCellCollision();
    updateGridCanvas();
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


document.getElementById("MovementDelay1").addEventListener("mousedown", function (e) {
    moveDelay = 0;
});

document.getElementById("MovementDelay2").addEventListener("mousedown", function (e) {
    moveDelay = 2;
});

document.getElementById("MovementDelay3").addEventListener("mousedown", function (e) {
    moveDelay = 4;
});