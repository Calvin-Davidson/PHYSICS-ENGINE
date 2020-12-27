class Cell {
    constructor(i, s) {
        this.x = i
        this.y = s
        this.f = 0
        this.g = 0
        this.h = 0
        this.color = "white"
        this.neightbors = []
        this.previous = void 0
        this.iswall = !1
    }

    showRect() {
        this.iswall && (this.color = "black");
        let i = width / size, s = height / size;
        context.beginPath(), context.fillStyle = this.color, context.fillRect(this.x * (width / size), this.y * (height / size), i, s), context.strokeStyle = "black", context.strokeRect(this.x * (width / size), this.y * (height / size), i, s), context.closePath()
    }

    addNeightbors() {
        this.x < size - 1 && 0 == grid[this.x + 1][this.y].iswall && this.neightbors.push(grid[this.x + 1][this.y]), this.x > 0 && 0 == grid[this.x - 1][this.y].iswall && this.neightbors.push(grid[this.x - 1][this.y]), this.y < size - 1 && 0 == grid[this.x][this.y + 1].iswall && this.neightbors.push(grid[this.x][this.y + 1]), this.y > 0 && 0 == grid[this.x][this.y - 1].iswall && this.neightbors.push(grid[this.x][this.y - 1]), diagonals > 0 && (this.y > 0 && this.x > 0 && 0 == grid[this.x - 1][this.y - 1].iswall && (0 == grid[this.x][this.y - 1].iswall && 0 == grid[this.x - 1][this.y].iswall || diagonals > 1) && this.neightbors.push(grid[this.x - 1][this.y - 1]), this.x < size - 1 && this.y < size - 1 && 0 == grid[this.x + 1][this.y + 1].iswall && (0 == grid[this.x + 1][this.y].iswall && 0 == grid[this.x][this.y + 1].iswall || diagonals > 1) && this.neightbors.push(grid[this.x + 1][this.y + 1]), this.x < size - 1 && this.y > 0 && 0 == grid[this.x + 1][this.y - 1].iswall && (0 == grid[this.x + 1][this.y].iswall && 0 == grid[this.x][this.y - 1].iswall || diagonals > 1) && this.neightbors.push(grid[this.x + 1][this.y - 1]), this.x > 0 && this.y < size - 1 && 0 == grid[this.x - 1][this.y + 1].iswall && (0 == grid[this.x - 1][this.y].iswall && 0 == grid[this.x][this.y + 1].iswall || diagonals > 1) && this.neightbors.push(grid[this.x - 1][this.y + 1]))
    }
}