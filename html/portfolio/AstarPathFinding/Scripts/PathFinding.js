const openSet = [];
const closedSet = [];
let path = [];

function checkForPath() {
    path = []

    openSet.push(Cells[PlayerArrayPos.dy][PlayerArrayPos.dx]);

    let current;
    let foundPath = false;
    let end = Cells[PlayerTargetPos.dy][PlayerTargetPos.dx];


    console.log("Starting pathfinding");
    while (openSet.length > 0) {
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) winner = i;
        }

        current = openSet[winner];


        if (current === end) {
            foundPath = true;
            break;
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        let neighbors = current.neightbors;
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            if (!closedSet.includes(neighbor) && neighbor.hasCollsion === false) {
                let tempG = current.g + heuristic(neighbor, current);
                let newPath = false;

                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }

                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }

            current.neightbors[i] = neighbor;
        }
    }
    console.log("did i find a path?" + foundPath);
    openSet.splice(0,openSet.length)
    closedSet.splice(0,closedSet.length)

    if (!foundPath) {
        return;
    }

    let temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        let t = temp;
        temp = temp.previous;
        t.previous = null;
    }

}

function heuristic(e, t) {
        let n, i;
        let diagonals = 0;
        let size = width
        return n = Math.abs(e.x - t.x);
}

function pythagorean(e, t) {
    return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2))
}


function removeFromArray(array, obj) {
    for (let i = array.length - 1; i >= 0; i--) array[i] === obj && array.splice(i, 1)
}
