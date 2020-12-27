class SpriteSheetRenderer {
	constructor(image, image_rows, image_columns, totalImages) {
		this.Image = image;
		this.imageRows = image_rows;
		this.Image_columns = image_columns;
		this.TotalImages = totalImages;

		this.SpriteWidth = this.Image.width / image_rows;
		this.SpriteHeight = this.Image.height / image_columns;
	}

	DrawSprite(context, x, y, spriteNumber) {
		if (this.TotalImages < spriteNumber) {
			console.log("Sprite number is de groot, er zijn maar " + this.TotalImages);
			return;
		}

		let spriteRow, spriteColumn;

		spriteRow = spriteNumber % this.imageRows;
		spriteColumn = Math.floor(spriteNumber / this.imageRows);

		let sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight;
		sx = 0 + (spriteRow * this.SpriteWidth);
		sy = 0 + (spriteColumn * this.SpriteHeight);
		sWidth = this.SpriteWidth;
		sHeight = this.SpriteHeight;
		dx = x;
		dy = y;
		dWidth = this.SpriteWidth;
		dHeight = this.SpriteHeight;
		return context.drawImage(this.Image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	}

	GetDrawSpriteData(spriteNumber) {
		let spriteRow = spriteNumber % this.imageRows;
		let spriteColumn = Math.floor(spriteNumber / this.imageRows);

		return new Data(0 + (spriteRow * this.SpriteWidth), 0 + (spriteColumn * this.SpriteHeight), this.SpriteWidth, this.SpriteHeight, this.SpriteWidth, this.SpriteHeight);
	}
}

class Data{
	constructor(sx,sy,sWidth,sHeight,dWidth,dHeight)
	{
		this.sx = sx;
		this.sy = sy;
		this.sWidth = sWidth;
		this.sHeight = sHeight;
		this.dWidth = dWidth;
		this.dHeight = dHeight;
	}
}
