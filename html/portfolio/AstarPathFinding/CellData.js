class CellData {
    constructor(x,y, color) {
        this.x = x;
        this.y = y;
        this.inCircle = false;
        this.color = "black";
    }


    IsInCircle(Circles) {
        let position = new Vector2d(this.x, this.y);
        for (let i = 0; i < Circles.length; i++) {
            if (position.distanceTo(new Vector2d(Circles[i].pos.dx, Circles[i].pos.dy)) <= Circles[i].radius) {
                return true;
            }
        }
        return false;
    }
}