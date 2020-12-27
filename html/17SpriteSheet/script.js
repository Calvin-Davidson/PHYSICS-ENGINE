const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

let WisPressed = false;
let AisPressed = false;
let SisPressed = false;
let DisPressed = false;

let PlayerPos = new Vector2d(width / 2, height / 2);
canvas.width = width;
canvas.height = height;

let sheet = new Image();
sheet.src = "images/spriteSheet.png"

let spriteRenderer = new SpriteSheetRenderer(sheet, 9, 4, 32);

function init() {
    setInterval(update, 10);
}

let SpriteAnimationCounter = -1;

function update() {
    context.clearRect(0, 0, width, height);

    SpriteAnimationCounter += 0.1;

    if (WisPressed) {
        if (SpriteAnimationCounter > 6) SpriteAnimationCounter = 0;
        spriteRenderer.DrawSprite(context, PlayerPos.dx, PlayerPos.dy, Math.floor(SpriteAnimationCounter));
        PlayerPos.dy -= 2;
    } else if (SisPressed) {
        if (9 + Math.floor(SpriteAnimationCounter) > 15) SpriteAnimationCounter = 0;
        spriteRenderer.DrawSprite(context, PlayerPos.dx, PlayerPos.dy, 9 + Math.floor(SpriteAnimationCounter));
        PlayerPos.dy += 2;
    } else if (DisPressed) {
        if (18 + Math.floor(SpriteAnimationCounter) > 26) SpriteAnimationCounter = 0;
        spriteRenderer.DrawSprite(context, PlayerPos.dx, PlayerPos.dy, 18 + Math.floor(SpriteAnimationCounter));
        PlayerPos.dx += 2;
    } else if (AisPressed) {
        if (27 + Math.floor(SpriteAnimationCounter) > 32) SpriteAnimationCounter = 0;
        spriteRenderer.DrawSprite(context, PlayerPos.dx, PlayerPos.dy, 27 + Math.floor(SpriteAnimationCounter));
        PlayerPos.dx -= 2;
    } else {
        spriteRenderer.DrawSprite(context, PlayerPos.dx, PlayerPos.dy, 9);
    }
}

sheet.addEventListener("load", init);

// get user input
document.addEventListener("keydown", function (e) {
    switch (e.key.toString().toLowerCase()) {
        case "w":
            WisPressed = true;
            break;
        case "a":
            AisPressed = true;
            break;
        case "s":
            SisPressed = true;
            break;
        case "d":
            DisPressed = true;
            break;
    }
});
document.addEventListener("keyup", function (e) {
    switch (e.key.toString().toLowerCase()) {
        case "w":
            WisPressed = false;
            break;
        case "a":
            AisPressed = false;
            break;
        case "s":
            SisPressed = false;
            break;
        case "d":
            DisPressed = false;
            break;
    }
});
