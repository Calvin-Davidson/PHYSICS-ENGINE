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

    checkNeighBores() {
        this.neightbors = [];
        if (this.hasCollsion) return;

        let rows = Math.ceil(width / Player.radius);
        let columns = Math.ceil(height / Player.radius);
        // the cell to the right

        if (this.arrayX + 1 < rows && Cells[this.arrayY][this.arrayX + 1].hasCollsion === false) this.neightbors.push(Cells[this.arrayY][this.arrayX + 1]);
        if (this.x > 0 && Cells[this.arrayY][this.arrayX - 1].hasCollsion === false) this.neightbors.push(Cells[this.arrayY][this.arrayX - 1]);
        if (this.arrayY + 1 < columns && Cells[this.arrayY + 1][this.arrayX].hasCollsion === false) this.neightbors.push(Cells[this.arrayY + 1][this.arrayX]);
        if (this.arrayY > 0 && Cells[this.arrayY - 1][this.arrayX].hasCollsion === false) this.neightbors.push(Cells[this.arrayY - 1][this.arrayX]);

        // diagonals
        if (this.arrayX + 1 < rows && this.arrayY + 1 < columns && !Cells[this.arrayY +1][this.arrayX + 1].hasCollsion) this.neightbors.push(Cells[this.arrayY +1][this.arrayX + 1]);
        if (this.arrayX + 1 < rows && this.arrayY > 0 && !Cells[this.arrayY - 1][this.arrayX + 1].hasCollsion) this.neightbors.push(Cells[this.arrayY - 1][this.arrayX + 1]);

        if (this.arrayX > 0 && this.arrayY + 1 < columns && !Cells[this.arrayY + 1][this.arrayX - 1].hasCollsion) this.neightbors.push(Cells[this.arrayY + 1][this.arrayX - 1]);
        if (this.arrayX > 0 && this.arrayY > 0 && !Cells[this.arrayY - 1][this.arrayX - 1].hasCollsion) this.neightbors.push(Cells[this.arrayY - 1][this.arrayX - 1]);
    }

    show(context) {
        context.beginPath();
        context.fillStyle = this.hasCollsion ? "red" : "green";
        context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
        context.closePath();
    }

    static getClosestCellFrom(dx, dy) {
        let closest = Cells[0][0];
        let currentClosestDist = 10000000;

        for (let y = 0; y < Math.ceil(height / Player.radius); y++) {
            for (let x = 0; x < Math.ceil(width / Player.radius); x++) {
                let cell = Cells[y][x];

                let pos1 = dx - cell.x;
                let pos2 = dy - cell.y;

                let distanceTo = Math.sqrt(pos1 * pos1 + pos2 * pos2);
                console.log(distanceTo)

                if (distanceTo < currentClosestDist) {
                    closest = cell;
                    currentClosestDist = distanceTo;
                }
            }
        }
        console.log(closest)
        return closest;
    }

}
