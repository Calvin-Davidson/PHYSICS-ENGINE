const canvas = document.getElementById("canvas"), context = canvas.getContext("2d");
let diagonals = 2, size = window.innerWidth * 2, wallSpawnChange = 20, showProgress = false, CanvasSizing = 2, start_x = 0, start_y = 0,
    end_x = size - 1, end_y = size - 1, width = 0, height = 0;
0 === CanvasSizing ? window.innerWidth < window.innerHeight ? (height = window.innerWidth - 25, width = window.innerWidth - 25) : (height = window.innerHeight - 25, width = window.innerHeight - 25) : window.innerWidth > window.innerHeight ? (height = window.innerWidth - 25, width = window.innerWidth - 25) : (height = window.innerHeight - 25, width = window.innerHeight - 25), canvas.width = width, canvas.height = height;
let start, end, current, path, grid = new Array(size), openSet = [], closedSet = [];

function init_grid() {
    for (let e = 0; e < size; e++) {
        grid[e] = new Array(size);
        for (let t = 0; t < size; t++) {
            grid[e][t] = new Cell(e, t), Math.floor(101 * Math.random()) < wallSpawnChange && (grid[e][t].iswall = !0, grid[e][t].color = "black", grid[e][t].showRect())
        }
    }
    start = grid[start_x][start_y], end = grid[end_x][end_y], start.iswall = !1, start.color = "#00eeff", end.iswall = !1, end.color = "#00eeff";
    for (let e = 0; e < size; e++) for (let t = 0; t < size; t++) grid[e][t].addNeightbors();
    openSet.push(start)
}

let date = void 0;

function update() {
    if (void 0 === date && (date = new Date), openSet.length > 0) {
        let e = 0;
        for (let t = 0; t < openSet.length; t++) openSet[t].f < openSet[e].f && (e = t);
        if ((current = openSet[e]) === end) {
            console.log("Route found!"), clearInterval(UpdateInterval);
            let e = new Date;
            return console.log("miliseconds spend: " + (e.getTime() - date.getTime())), console.log("seconds spend: " + (e.getTime() - date.getTime()) / 1e3), void showPath(current)
        }
        removeFromArray(openSet, current), closedSet.push(current);
        for (let e = 0; e < current.neightbors.length; e++) {
            let t = current.neightbors[e];
            if (!1 === closedSet.includes(t)) {
                let n = current.g + 1, i = !1;
                openSet.includes(t) ? n < t.g && (t.g = n, i = !0) : (t.g = n, i = !0, openSet.push(t)), i && (current.neightbors[e].h = guess(t, end), t.f = t.g + t.h, t.previous = current)
            }
        }
    } else {
        console.log("Er is geen oplossing.");
        let e = new Date;
        console.log("miliseconds spend: " + (e.getTime() - date.getTime())), console.log("seconds spend: " + (e.getTime() - date.getTime()) / 1e3), clearInterval(UpdateInterval)
    }
    if (showProgress) {
        showPath(current);
        for (let e = 0; e < size; e++) for (let t = 0; t < size; t++) grid[e][t].showRect();
        for (let e = 0; e < closedSet.length; e++) !1 === path.includes(closedSet[e]) && (closedSet[e].color = "red", closedSet[e].showRect());
        for (let e = 0; e < openSet.length; e++) !1 === path.includes(openSet[e]) && (openSet[e].color = "green", openSet[e].showRect())
    }
}

function removeFromArray(e, t) {
    for (let n = e.length - 1; n >= 0; n--) e[n] === t && e.splice(n, 1)
}

function guess(e, t) {
    let n, i;
    return n = Math.abs(e.x - t.x), i = Math.abs(e.y - t.y), 0 == diagonals ? width / size * (n + i) : width / size * (n + i) + (pythagorean(width / size, height / size) - 2) * Math.min(n, i)
}

function pythagorean(e, t) {
    return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2))
}

function showPath(e) {
    let t = e;
    for ((path = []).push(t), context.beginPath(), context.lineWidth = width / size / 2 * .9, context.strokeStyle = "blue", context.moveTo(t.x * (width / size) + width / size / 2, t.y * (height / size) + height / size / 2); t.previous;) context.lineTo(t.x * (width / size) + width / size / 2, t.y * (height / size) + height / size / 2), t.color = "orange", path.push(t.previous), t = t.previous;
    context.lineTo(start.x + width / size / 2, start.y + height / size / 2), context.stroke(), context.closePath(), context.lineWidth = 2
}

init_grid();
let UpdateInterval = setInterval(update, 1);