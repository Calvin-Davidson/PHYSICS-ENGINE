const openSet = [];
const closedSet = [];
const path = [];

function checkForPath() {
    openSet.length = 0;
    closedSet.length = 0;
    path.length = 0;

    let current;

    openSet.push(Cells[Player.y][Player.x]);

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
        }
    }

    let temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    console.log("did i find a path?" + foundPath);
}

function heuristic(e, t) {
        let n, i;
        let diagonals = 0;
        let size = width
        return n = Math.abs(e.x - t.x), i = Math.abs(e.y - t.y), 0 === diagonals ? width / size * (n + i) : width / size * (n + i) + (pythagorean(width / size, height / size) - 2) * Math.min(n, i)
}

function pythagorean(e, t) {
    return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2))
}


function removeFromArray(array, obj) {
    for (let i = array.length - 1; i >= 0; i--) array[i] === obj && array.splice(i, 1)
}
