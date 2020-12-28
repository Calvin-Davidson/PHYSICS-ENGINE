class CellData {
    constructor(x,y, color) {
        this.hasCollsion = false;
        this.x = x;
        this.y = y;
        this.color = "black";
        this.neightbors = [];

        this.f = 0;
        this.g = 0;
        this.h = 0;
    }

    checkNeightBors() {

        // the cell to the right
        if (this.x + 1 < width && Cells[this.y][this.x + 1].hasCollsion === false) this.neightbors.push(Cells[this.y][this.x + 1]);

        // the cell to the left
        if (this.x > 0 && Cells[this.y][this.x - 1].hasCollsion === false) this.neightbors.push(Cells[this.y][this.x - 1]);

        // the cell beneath
        if (this.y + 1 < height && Cells[this.y + 1][this.x].hasCollsion === false) this.neightbors.push(Cells[this.y + 1][this.x]);

        // the cell above
        if (this.y > 0 && Cells[this.y - 1][this.x].hasCollsion === false) this.neightbors.push(Cells[this.y - 1][this.x]);



        // diagonals > 0 && (this.y > 0 && this.x > 0 && 0 == grid[this.x - 1][this.y - 1].iswall && (0 == grid[this.x][this.y - 1].iswall && 0 == grid[this.x - 1][this.y].iswall || diagonals > 1) && this.neightbors.push(grid[this.x - 1][this.y - 1]);
        // this.x < size - 1 && this.y < size - 1 && 0 == grid[this.x + 1][this.y + 1].iswall && (0 == grid[this.x + 1][this.y].iswall && 0 == grid[this.x][this.y + 1].iswall || diagonals > 1) && this.neightbors.push(grid[this.x + 1][this.y + 1]);
        // this.x < size - 1 && this.y > 0 && 0 == grid[this.x + 1][this.y - 1].iswall && (0 == grid[this.x + 1][this.y].iswall && 0 == grid[this.x][this.y - 1].iswall || diagonals > 1) && this.neightbors.push(grid[this.x + 1][this.y - 1]);
        // this.x > 0 && this.y < size - 1 && 0 == grid[this.x - 1][this.y + 1].iswall && (0 == grid[this.x - 1][this.y].iswall && 0 == grid[this.x][this.y + 1].iswall || diagonals > 1) && this.neightbors.push(grid[this.x - 1][this.y + 1]));

    }
}
