let selectedObj = null;

let mouseX;
let mouseY;

let previousMouseX;
let previousMouseY;

// events
canvas.addEventListener("mouseup", function (e) {
    selectedObj = null;

    reCheckCellCollision();
});

canvas.addEventListener("mousemove", function (e) {
    previousMouseX = mouseX;
    previousMouseY = mouseY;

    mouseX = e.pageX;
    mouseY = e.pageY - navbarOffset;

    if (selectedObj != null) {
        selectedObj.x += mouseX - previousMouseX;
        selectedObj.y += mouseY - previousMouseY;
    }
});

canvas.addEventListener("mousedown", function (e) {
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
    for (let y = 0; y < Math.ceil(height / Player.radius); y++) {
        for (let x = 0; x < Math.ceil(width / Player.radius); x++) {
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
    let celldata = CellData.getClosestCellFrom(mouseX, mouseY);
    console.log(celldata)
    PlayerTargetPos.dx = celldata.arrayX;
    PlayerTargetPos.dy = celldata.arrayY;

    checkForPath();
});


function reCheckCellCollision() {
    for (let y = 0; y < Math.ceil(height / Player.radius); y++) {
        for (let x = 0; x < Math.ceil(width / Player.radius); x++) {
            let cellData = Cells[y][x];
            cellData.hasCollsion = false;

            for (let i = 0; i < Objects.length; i++) {
                let obj = Objects[i];

                if (obj instanceof Circle) {

                    let pos1 = obj.x - cellData.x;
                    let pos2 = obj.y - cellData.y;

                    let distanceTo = Math.sqrt(pos1 * pos1 + pos2 * pos2);
                    if (distanceTo - (Player.radius / 2) < obj.radius) {
                        cellData.hasCollsion = true;
                    }
                }
            }
        }
    }

    for (let y = 0; y < Math.ceil(height / Player.radius); y++) {
        for (let x = 0; x < Math.ceil(width / Player.radius); x++) {
            let cellData = Cells[y][x];
            cellData.checkNeighBores();
        }
    }

    updateGridCanvas();
}