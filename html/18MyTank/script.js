const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let controlGroup = [false,false,false,false];
let controlGroup2 = [false,false,false,false];
const bullets = [];
const walls = [];

let img = new Image();
img.src = "tanksheet.png";
let spriteRenderer;
let tank, tank2;
let position = new Vector2d(width/2, height/2);
let position2 = new Vector2d(width/2+100, height/2);
let tankHeight = 37;
let tankWidth = 32;
let drawCollision = true;
let collision, collision2;

img.addEventListener('load',()=>{
  spriteRenderer = new SpriteSheetRenderer(img, 8, 4, 32);
  tank = new Player(0.001,8,position,position,controlGroup,1,8);
  tank.SetupCollision(tankHeight,tankWidth);
  tank2 = new Player(0.001,16,position2,position2,controlGroup2,9,16);
  tank2.SetupCollision(tankHeight,tankWidth);
  createWalls();
  setInterval(animate, 1);
})

function createWalls() {
    for (let x = 0; x < width / (img.width / 8); x++) {
        createWall(x * img.width/8, 0, img.width/8, img.height/4);
        createWall(x * img.width/8, height-img.height/4, img.width/8, img.height/4);
    }

    for (let y = 1; y < height / (img.height / 4); y++) {
        createWall(0, y * img.height/4, img.width/8, img.height/4);
        createWall(width-img.width/8, y * img.height/4, img.width/8, img.height/4);
    }

    function createWall(x,y,width,height) {
        let wall = {};
        wall.x = x;
        wall.y = y;
        wall.w = width;
        wall.h = height;
        wall.collision = new Box(new Vector2d(x, y),new Vector2d(width,height));
        walls.push(wall);
    }
}

class Player{
  constructor(angle,animationCount,pos,prevPos,inputGroup, min, max, collision=new Box(new Vector2d(0,0),new Vector2d(width,height),-1), direction = "forward")
  {
    this.id = 1;
    this.r = 50;
    this.angle = angle;
    this.animationCount = animationCount;
    this.x = pos.x;
    this.y = pos.y;
    this.pos = pos;
    this.min = min;
    this.max = max;
    this.inputGroup = inputGroup;
    this.prevPos = prevPos;
    this.direction = direction;
    this.collision = collision;
  }

  SetupCollision(thisHeight,thisWidth) {
    this.collision = new Convex(this.pos,[new Vector2d(this.x-thisWidth, this.y-thisHeight),new Vector2d(this.x+thisWidth, this.y-thisHeight),new Vector2d(this.x+thisWidth, this.y+thisHeight),new Vector2d(this.x-thisWidth, this.y+thisHeight)],true);
    this.collision.Rotate(57.25*this.angle,this.pos);
  }

  Draw(delta) {
    if(drawCollision){this.collision.Draw(context);}
    let animation = Math.floor(this.animationCount);
    //console.log(delta);
    //console.log(this.pos.DistanceTo(this.prevPos));
    if (delta.Length() > 0.001) {
        if (this.direction == "forward") {
            animation = Math.floor(this.animationCount -= 0.05);
            //console.log(this.animationCount);
        } else {
            animation = Math.floor(this.animationCount += 0.05);
        }
    }
    if (animation < this.min) {
        animation = this.min;
        this.animationCount = this.max+1;
    }
    if (animation > this.max) {
        animation = this.max;
        this.animationCount = this.min;
    }

    let data = spriteRenderer.GetDrawSpriteData(animation);
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.rotate(this.angle);
    context.drawImage(img, data.sx, data.sy, data.sWidth, data.sHeight, -data.sWidth / 2, -data.sHeight / 2, data.dWidth, data.dHeight);
    context.restore();
  }

  Move(selfRef,otherRef,returnDelta=false) {
    //console.log(this.prevPos);
    //console.log(this.pos);
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
    let delta = new Vector2d(0,0);
    if (this.inputGroup[0]) {
        delta = new Vector2d(0.5 * Math.sin(this.angle),-0.5 * Math.cos(this.angle))
        this.collision.Move(delta);
        this.pos.y -= 0.5 * Math.cos(this.angle);
        this.pos.x += 0.5 * Math.sin(this.angle);
        this.direction = "forward";
    } else if (this.inputGroup[2]) {
        delta = new Vector2d(-0.5 * Math.sin(this.angle),0.5 * Math.cos(this.angle))
        this.collision.Move(delta);
        this.pos.y += 0.5 * Math.cos(this.angle);
        this.pos.x -= 0.5 * Math.sin(this.angle);
        this.direction = "backwards";
    }

    walls.forEach(wall => {
      let collision = CheckCollision(selfRef.collision,wall.collision,delta);
      if (collision.collides){
        let rightOf = selfRef.pos.x > wall.x;
        let aboveOf = selfRef.pos.y < wall.y;
        let overlap = collision.overlapVector2d;
        if(rightOf){
          overlap.x = -overlap.x;
        }
        if(aboveOf){
          overlap.y = -overlap.y;
        }
        //console.log(collision.overlapVector2d);
        this.collision.Move(overlap);
        selfRef.pos.x += overlap.x;
        selfRef.pos.y += overlap.y;
      }
    });

    if (this.inputGroup[1]) {
        this.angle -= 0.01;
        this.collision.Rotate(-0.5725,this.pos);
    } else if (this.inputGroup[3]) {
        this.angle += 0.01;
        this.collision.Rotate(0.5725,this.pos);
    }
    if(returnDelta){
      return delta;
    }
  }
}

function CollisionBetweenPlayers(player1, delta1, player2, delta2){
  let collision1 = CheckCollision(player1.collision,player2.collision, delta1,true);
  let collision2 = CheckCollision(player2.collision,player1.collision, delta2,true);
  let rightOf = player1.pos.x > player2.pos.x;
  let aboveOf = player1.pos.y < player2.pos.y;
  if(collision1.willCollide&&collision2.willCollide){
    if(collision1.overlapVector2d.Length()>=collision2.overlapVector2d.Length()){
      collision1.overlapVector2d.ClampLength(2.5);
      let overlap = collision1.overlapVector2d;
      if(rightOf){
        overlap.x = -overlap.x;
      }
      if(aboveOf){
        overlap.y = -overlap.y;
      }
      player1.collision.Move(overlap);
      player1.pos.x += overlap.x;
      player1.pos.y += overlap.y;
    } else {
      collision2.overlapVector2d.ClampLength(2.5);
      let overlap = collision2.overlapVector2d;
      if(!rightOf){
        overlap.x = -overlap.x;
      }
      if(!aboveOf){
        overlap.y = -overlap.y;
      }
      player2.collision.Move(overlap);
      player2.pos.x += overlap.x;
      player2.pos.y += overlap.y;
    }
  }
}

function DrawBackground() {
    for (let x = 0; x < width / (img.width / 8); x++) {
        for (let y = 0; y < height / (img.height / 4); y++) {
            spriteRenderer.DrawSprite(context, x * img.width / 8, y * img.height / 4, 0);
        }
    }
}

function DrawWalls() {
    for (let i = 0; i < walls.length; i++) {
        spriteRenderer.DrawSprite(context, walls[i].x, walls[i].y, 26);
        if(drawCollision){walls[i].collision.Draw(context);}
    }
}

function animate(){
  context.clearRect(0, 0, height*2, width*2);
  DrawBackground();
  DrawWalls();
  let delta1 = tank.Move(tank,tank2,true);
  let delta2 = tank2.Move(tank2,tank,true);
  CollisionBetweenPlayers(tank,delta1,tank2,delta2);
  tank.Draw(delta1);
  tank2.Draw(delta2);
}

// get user input
document.addEventListener("keydown", (e) => {
    switch (e.key.toString().toLowerCase()) {
        case "w":
            controlGroup[0] = true;
            break;
        case "a":
            controlGroup[1] = true;
            break;
        case "s":
            controlGroup[2] = true;
            break;
        case "d":
            controlGroup[3] = true;
            break;
        case "arrowup":
            controlGroup2[0] = true;
            break;
        case "arrowdown":
            controlGroup2[2] = true;
            break;
        case "arrowleft":
            controlGroup2[1] = true;
            break;
        case "arrowright":
            controlGroup2[3] = true;
            break;
    }
});
document.addEventListener("keyup", (e) => {
    switch (e.key.toString().toLowerCase()) {
        case "w":
            controlGroup[0] = false;
            break;
        case "a":
            controlGroup[1] = false;
            break;
        case "s":
            controlGroup[2] = false;
            break;
        case "d":
            controlGroup[3] = false;
            break;
        case "arrowup":
            controlGroup2[0] = false;
            break;
        case "arrowdown":
            controlGroup2[2] = false;
            break;
        case "arrowleft":
            controlGroup2[1] = false;
            break;
        case "arrowright":
            controlGroup2[3] = false;
            break;
    }
});

document.addEventListener("mousedown", (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    // instantiate bullet.
});

canvas.addEventListener("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    document.title = "X: " + mouseX + "  Y" + mouseY;
});
