class Car {
    constructor(carImg, WheelImg) {
        this.carImg = carImg;
        this.WheelImg = WheelImg;

        this.CarX = 50;
        this.wheelOneX = 185;
        this.wheelTwoX = 725;

        this.wheelBackAngle = 0;
        this.wheelFrontAngle = 0;
    }

    Move(speed) {
        this.CarX += speed;

        this.wheelOneX += speed;
        this.wheelTwoX += speed;
    }

    draw(context) {
        context.drawImage(this.carImg, this.CarX, height - 270, this.carImg.width, this.carImg.height);


        context.save();
        context.translate(this.wheelOneX + 75, height - this.WheelImg.height + 80);
        context.rotate(this.wheelBackAngle);
        context.drawImage(this.WheelImg, -this.WheelImg.width / 2, -this.WheelImg.height / 2, this.WheelImg.width, this.WheelImg.height);
        context.restore();

        context.save();
        context.translate(this.wheelTwoX + 75, height - this.WheelImg.height + 80)
        context.rotate(this.wheelFrontAngle);
        context.drawImage(this.WheelImg, -this.WheelImg.width / 2, -this.WheelImg.height / 2, this.WheelImg.width, this.WheelImg.height);
        context.restore();

        this.wheelBackAngle += movementSpeed*( 0.5 / this.WheelImg.width );
        this.wheelFrontAngle += movementSpeed*( 0.5 / this.WheelImg.width );

        console.log(movementSpeed / (0.5 * this.WheelImg.width))
    }

}