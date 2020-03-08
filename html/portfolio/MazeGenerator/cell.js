class cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visited = false;

        this.walls = [true, true, true, true];
    }

    
        checkNeighbors = function() {
            let neighbors = [];

            let topWall = grid[index(this.x, this.y - size)];
            let rightWall = grid[index(this.x + size, this.y)];
            let bottomWall = grid[index(this.x, this.y + size)];
            let leftWall = grid[index(this.x - size, this.y)];



            if (topWall && !topWall.visited) {
                neighbors.push(topWall);
                console.log("added topWall");
            }
            if (rightWall && !rightWall.visited) {
                neighbors.push(rightWall);
                console.log('added rightWall')
            }
            if (bottomWall && !bottomWall.visited) {
                neighbors.push(bottomWall);
                console.log("added bottomWall")
            }
            if (leftWall && !leftWall.visited) {
                neighbors.push(leftWall);
                console.log('added leftWall')
            }

            if (neighbors.length > 0) {
                let r = Math.floor(getRandomInt(0, neighbors.length - 1));
                return neighbors[r];
            } else {
                return undefined;
            }


        }
}
