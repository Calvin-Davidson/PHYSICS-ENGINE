class CellData {
    constructor(x, y, arrX, arrY) {
        this.hasCollsion = false;
        this.arrayX = arrX;
        this.arrayY = arrY;
        this.x = x;
        this.y = y;
        this.color = "black";
        this.neightbors = [];

        this.f = 0;
        this.g = 0;
        this.h = 0;
    }

    checkNeightBors() {
        if (this.hasCollsion) return;

        let rows = Math.ceil(width / Player.radius * 2);
        let columns = Math.ceil(height / Player.radius * 2);
        // the cell to the right

        if (this.arrayX + 1 < rows && Cells[this.arrayY][this.arrayX + 1].hasCollsion === false) this.neightbors.push(Cells[this.arrayY][this.arrayX + 1]);

        // the cell to the left
        if (this.x > 0 && Cells[this.arrayY][this.arrayX - 1].hasCollsion === false) this.neightbors.push(Cells[this.arrayY][this.arrayX - 1]);

        // the cell beneath
        if (this.arrayY + 1 < columns && Cells[this.arrayY + 1][this.arrayX].hasCollsion === false) this.neightbors.push(Cells[this.arrayY + 1][this.arrayX]);

        // the cell above
        if (this.arrayY > 0 && Cells[this.arrayY - 1][this.arrayX].hasCollsion === false) this.neightbors.push(Cells[this.arrayY - 1][this.arrayX]);
    }

    static getClosestCellFrom(dx, dy) {
        let closest = Cells[0][0];
        let currentClosestDist = 10000000;

        for (let y = 0; y < Math.ceil(height / Player.radius * 2); y++) {
            for (let x = 0; x < Math.ceil(width / Player.radius * 2); x++) {
                let cell = Cells[y][x];

                let pos1 = dx - cell.x;
                let pos2 = dy - cell.y;

                let distanceTo = Math.sqrt(pos1 * pos1 + pos2 * pos2);

                if (distanceTo < currentClosestDist) {
                    closest = cell;
                    currentClosestDist = distanceTo;
                }
            }
        }
        return closest;
    }
}
