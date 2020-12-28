let selectedObj = null;

let mouseX;
let mouseY;

let previousMouseX;
let previousMouseY;

// events
document.addEventListener("mouseup", function (e) {
    selectedObj = null;

    reCheckCellCollision();
});

document.addEventListener("mousemove", function (e) {
    previousMouseX = mouseX;
    previousMouseY = mouseY;

    mouseX = e.pageX;
    mouseY = e.pageY - navbarOffset;

    if (selectedObj != null) {
        selectedObj.x += mouseX - previousMouseX;
        selectedObj.y += mouseY - previousMouseY;
    }
});

document.addEventListener("mousedown", function (e) {
    for (let i = 0; i < Objects.length; i++) {
        let obj = Objects[i];
        if (obj instanceof Circle) {

            let pos1 = obj.x - mouseX;
            let pos2 = obj.y - mouseY;

            let distanceTo = Math.sqrt(pos1 * pos1 + pos2 * pos2);
            if (distanceTo < obj.radius) {
                selectedObj = obj;
                return;
            }
        }
    }

    /** Check of de speler daar wel heen kan bewegen. */
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let pos1 = x - mouseX;
            let pos2 = y - mouseY;
            let distanceTo = Math.sqrt(pos1 * pos1 + pos2 * pos2);

            if (distanceTo < Player.radius) {
                if (Cells[y][x].hasCollsion) {
                    prompt("De speler kan daar niet naar toe. er zit een object te dicht bij zijn locatie.")
                    return;
                }
            }
        }
    }

    console.log("De speler heeft een target position gekregen")
    PlayerTargetPos.dx = mouseX;
    PlayerTargetPos.dy = mouseY;


    checkForPath();
});


function reCheckCellCollision() {
    for (let i = 0; i < Objects.length; i++) {
        let obj = Objects[i];
        obj.hasCollsion = false;
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let cellData = Cells[y][x];

            for (let i = 0; i < Objects.length; i++) {
                let obj = Objects[i];

                if (obj instanceof Circle) {

                    let pos1 = obj.x - cellData.x;
                    let pos2 = obj.y - cellData.y;

                    let distanceTo = Math.sqrt(pos1 * pos1 + pos2 * pos2);
                    if (distanceTo < obj.radius) {
                        cellData.hasCollsion = true;
                    }
                }
            }
        }
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let cellData = Cells[y][x];
            cellData.checkNeightBors();
        }
    }

}