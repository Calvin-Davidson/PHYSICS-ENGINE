class satCube {
    constructor(x, y, w, h, angle) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = angle;
        this.points = [];
        this.color = 'rgb(0,0,255)';
    }

    draw(context) {
        context.beginPath();
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.fillStyle = this.color;
        context.fillRect(0 - this.w/2, 0 - this.h/2, this.w, this.h);
        context.fill();
        context.restore();
        context.closePath();
    }


    drawCorners(context) {
        this.points.forEach(value => {
            context.beginPath();
            context.arc(value.x, value.y, 5, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
        });
    }



    calculateCorners() {
        const corners = [];

        let Cx, Cy // the coordinates of your center point in world coordinates
        let W = this.w;     // the width of your rectangle
        let H = this.h;     // the height of your rectangle
        let θ = this.angle; // the angle you wish to rotate

        Cx = this.x;
        Cy = this.y;

        //The offset of a corner in local coordinates (i.e. relative to the pivot point)
        //(which corner will depend on the coordinate reference system used in your environment)

        let Oy = H / 2;
        let Ox = W / 2;

        //The rotated position of this corner in world coordinates

        let Rx = Cx - (Ox * Math.cos(θ)) + (Oy * Math.sin(θ));
        let Ry = Cy - (Ox * Math.sin(θ)) - (Oy * Math.cos(θ));
        addCorner(Rx, Ry);

        Rx = Cx - (Ox * Math.cos(θ)) - (Oy * Math.sin(θ));
        Ry = Cy - (Ox * Math.sin(θ)) + (Oy * Math.cos(θ));
        addCorner(Rx, Ry);

        Rx = Cx + (Ox * Math.cos(θ)) + (Oy * Math.sin(θ));
        Ry = Cy + (Ox * Math.sin(θ)) - (Oy * Math.cos(θ));
        addCorner(Rx, Ry);

        Rx = Cx + (Ox * Math.cos(θ)) - (Oy * Math.sin(θ));
        Ry = Cy + (Ox * Math.sin(θ)) + (Oy * Math.cos(θ));
        addCorner(Rx, Ry);

        function addCorner(x, y) {
            let corner = {};
            corner.x = x;
            corner.y = y;

            corners.push(corner);
        }

        this.points = corners;
    }
}