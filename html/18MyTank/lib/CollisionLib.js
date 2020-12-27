//Automatically determines collision type dependon on collision ID of both objects
class CollisionReturn{
  constructor(collides, overlapVector2d = new Vector2d(0,0), willCollide = false) {
    this.collides = collides;
    this.overlapVector2d = overlapVector2d;
    this.willCollide = willCollide;
  }
}

function CheckCollision(object1,object2,velocity = new Vector2d(0,0),useMathLine=false){
  let collisionReturn = new CollisionReturn(false);
  switch(object1.id){
  case -1:
    console.log("one or more objects has collision disabled");
    return collisionReturn;
  case 0:
    if(object2.id==-1){console.log("one or more objects has collision disabled");return collisionReturn;}
	  if(object2.id==0){return BoxCollision(object1,object2,velocity);}
	  if(object2.id==1){return BoxCircleCollision(object1,object2,velocity);}
	  if(object2.id==2){return BoxSATCollision(object1,object2,velocity);}
	break;
  case 1:
    if(object2.id==-1){console.log("one or more objects has collision disabled");return collisionReturn;}
	  if(object2.id==0){return BoxCollision(object2,object1,velocity);}
	  if(object2.id==1){return CircleCollision(object1,object2,velocity);}
	  if(object2.id==2){return CircleSATCollision(object1,object2,velocity,useMathLine);}
	break;
  case 2:
    if(object2.id==-1){console.log("one or more objects has collision disabled");return collisionReturn;}
	  if(object2.id==0){return BoxSATCollision(object2,object1,velocity);}
	  if(object2.id==1){return CircleSATCollision(object2,object1,velocity,useMathLine);}
	  if(object2.id==2){return SATCollision(object1,object2,velocity,useMathLine);}
	break;
  default:
  console.log("one or more objects is missing collision setup. Please add collsion ID's to your object!");
	return collisionReturn;
  }
}

//simple rectangle/box collision
function BoxCollision(rect1,rect2,velocity = new Vector2d(0,0)){
  let collisionReturn = new CollisionReturn(false);
  if(velocity.Length()>0){
    let x = rect1.x+velocity.x;
    let y = rect1.y+velocity.y;

    if(x < rect2.x + rect2.w &&
      x + rect1.w > rect2.x &&
      y < rect2.y + rect2.h &&
      y + rect1.h > rect2.y)
    {
      let overlapX = Math.min((rect2.x+rect2.w-x),(x + rect1.w-rect2.x));
      let overlapY = Math.min((rect2.y + rect2.h-y),(y + rect1.h-rect2.y));
      collisionReturn.overlapVector2d = new Vector2d(overlapX,overlapY);
      collisionReturn.collides = true;
      collisionReturn.willCollide = true;
      return collisionReturn;
    }
  } else {
    if(rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y)
    {
      let overlapX = Math.min((rect2.x+rect2.w-rect1.x),(rect1.x + rect1.w-rect2.x));
      let overlapY = Math.min((rect2.y + rect2.h-rect1.y),(rect1.y + rect1.h-rect2.y));
      collisionReturn.overlapVector2d = new Vector2d(overlapX,overlapY);
      collisionReturn.collides = true;
      return collisionReturn;
    }
  }
  return collisionReturn;
}

//simple circle/sphere collision
function CircleCollision(circle1, circle2,velocity = new Vector2d(0,0)){
  let collisionReturn = new CollisionReturn(false);
  if(velocity.Length()>0){
    let x = circle1.x+velocity.x;
    let y = circle1.y+velocity.y;
    let dx = x - circle2.x;
    let dy = y - circle2.y;
    let dr = Math.sqrt(dx * dx + dy * dy);
    if(dr < circle1.r + circle2.r) {
      let overlapRatio = (circle1.r+circle2.r)/dr;
      collisionReturn.overlapVector2d = new Vector2d((dx*overlapRatio)-dx,(dy*overlapRatio)-dy);
      collisionReturn.collides = true;
      return collisionReturn;
    }
  } else {
    let dx = circle1.x - circle2.x;
    let dy = circle1.y - circle2.y;
    let dr = Math.sqrt(dx * dx + dy * dy);
    if(dr < circle1.r + circle2.r) {
      let overlapRatio = (circle1.r+circle2.r)/dr;
      collisionReturn.overlapVector2d = new Vector2d((dx*overlapRatio)-dx,(dy*overlapRatio)-dy);
      collisionReturn.collides = true;
      return collisionReturn;
    }
  }
  return collisionReturn;
}

function BoxCircleCollision(rect,circle,velocity = new Vector2d(0,0)){
  let collisionReturn = new CollisionReturn(false);
  let distX = Math.abs(circle.x - rect.x-rect.w/2);
  let distY = Math.abs(circle.y - rect.y-rect.h/2);

  if (distX > (rect.w/2 + circle.r)) { return collisionReturn; }
  if (distY > (rect.h/2 + circle.r)) { return collisionReturn; }

  if (distX <= (rect.w/2)) {
    collisionReturn.overlapVector2d = new Vector2d(rect.w/2,0);
    collisionReturn.collides = true;
    return collisionReturn;
  }
  if (distY <= (rect.h/2)) {
    collisionReturn.overlapVector2d = new Vector2d(0,rect.h/2);
    collisionReturn.collides = true;
    return collisionReturn;
  }

  let dx=distX-rect.w/2;
  let dy=distY-rect.h/2;
  let dr=dx*dx+dy*dy;
  if(dr<=(circle.r*circle.r))
  {
    let overlapRatio = (circle1.r+circle2.r)/dr;
    collisionReturn.overlapVector2d = new Vector2d((dx*overlapRatio)-dx,(dy*overlapRatio)-dy);
    collisionReturn.collides = true;
    return collisionReturn;
  }
  return collisionReturn;
}

function SATCollision(convex1,convex2,velocity=new Vector2d(0,0),useMathLine){
  let collisionReturn = new CollisionReturn(true, new Vector2d(0,0), true);
	let edgeCountA = convex1.edges.length;
	let edgeCountB = convex2.edges.length;
  let minIntervalDistance = 1000000;
	let translationAxis = new Vector2d(0,0);
	let edge = new Vector2d(0,0);

  for(i=0; i<edgeCountA+edgeCountB; i++){
		if(i<edgeCountA){
			edge = convex1.edges[i];
      //console.log(edge);
		}
		else{
			edge = convex2.edges[i-edgeCountA];
      //console.log(edge);
		}

		let axis = new Vector2d(-edge.y, edge.x);
    //console.log(axis);
    axis.Normalize();
    //console.log(axis);
    let minmaxA = new Vector2d(0,0);
    let minmaxB = new Vector2d(0,0);
		minmaxA = ProjectSAT(axis, convex1);
		minmaxB = ProjectSAT(axis, convex2);
    //console.log(minmaxA.x);

		if(IntervalDistance(minmaxA.x,minmaxA.y,minmaxB.x,minmaxB.y)>0){
			collisionReturn.collides = false;
		}

    let velocityProjection = axis.DotProduct(velocity);
    //console.log(velocityProjection);
    if(velocityProjection<0){
      minmaxA.x += velocityProjection;
    } else {
      minmaxA.y += velocityProjection;
    }

    let intervalDistance = IntervalDistance(minmaxA.x,minmaxA.y,minmaxB.x,minmaxB.y);
    if(intervalDistance>0){
      collisionReturn.willCollide = false;
    }
    if(!collisionReturn.collides&&!collisionReturn.willCollide) {break;};

    intervalDistance = Math.abs(intervalDistance);
    if(intervalDistance<minIntervalDistance){
      minIntervalDistance = intervalDistance;
      translationAxis = axis;

      let d = new Vector2d(convex1.pos-convex2.pos);
      if(d.DotProduct(translationAxis)<0) {translationAxis = -translationAxis;}
    }
	}
  if(collisionReturn.willCollide){collisionReturn.overlapVector2d = Vector2dMultFloat(translationAxis,minIntervalDistance)};
  if(collisionReturn.collides && useMathLine){
    collisionReturn.collides = MathLineCollision(convex1, convex2,velocity,collisionReturn).collides;
    collisionReturn.willCollide = MathLineCollision(convex1, convex2,velocity,collisionReturn).collides;
  }
  return collisionReturn;
}

//turns box into convex for convex on convex collision
function BoxSATCollision(box,convex1,velocity = new Vector2d(0,0)){
	let pointArray = [new Vector2d(box.x, box.y),new Vector2d(box.x+box.w,box.y),new Vector2d(box.x+box.w, box.y+box.h),new Vector2d(box.x,box.y+box.h)];
	let convex2 = new Convex(new Vector2d(box.x+box.w/2,box.y+box.h/2), pointArray, true);
  return SATCollision(convex1, convex2,velocity,false);
}

//turns circle into simplified convex by sampling points every angleToSample, for convex on convex collision
function CircleSATCollision(circle,convex1,velocity = new Vector2d(0,0),useMathLine){
	let angleToSample = 45; //angle interval at which the code samples. Should be 10, 20, 30, 45 or 60.
	let pointArray = [];
	for(i=0; i<Math.round(360/angleToSample); i++){
		let point = new Vector2d(circle.r*Math.sin(Math.PI*2*angle/360),circle.r*Math.cos(Math.PI*2*angle/360));
		pointArray.push(point);
	}
	let convex2 = new Convex(new Vector2d(cirlce.x, circle.y), pointArray, true);
  return SATCollision(convex1,convex2,velocity,useMathLine);
}

function MathLineCollision(convex1, convex2,velocity,collisionReturn) {
  let intersectReturn = collisionReturn;
  intersectReturn.collides=false;
  let pointCountA = convex1.points.length;
	let pointCountB = convex2.points.length;
  let mathLine = new MathLine(1,1,new Vector2d(0,0),new Vector2d(0,0));
  let mathLine2 = new MathLine(1,1,new Vector2d(0,0),new Vector2d(0,0));
  for(let i=0; i<pointCountA; i++){
    let j = i+1;
    if(j>=pointCountA){j=0;}
    mathLine.ReEvaluate(convex1.points[i], convex1.points[j]);
    for(let k=0; k<pointCountB; k++){
      let l = k+1;
      if(l>=pointCountA){l=0;}
      mathLine2.ReEvaluate(convex2.points[k], convex2.points[l]);
      let intersect = CalcIntercept(mathLine.a, mathLine2.a, mathLine.b, mathLine2.b);
      let withinBounds = IntersectionWithinBounds(intersect.atPoint, convex1.points[i], convex1.points[j]);
      let withinBounds2 = IntersectionWithinBounds(intersect.atPoint, convex2.points[k], convex2.points[l]);
      if(intersect.intersects && withinBounds && withinBounds2){
        intersectReturn.collides=true;
        break;
      }
    }
  }
  return intersectReturn;
}

function IntervalDistance(minA,maxA,minB,maxB){
	if(minA<minB){
		return minB-maxA;
	}
	else {
		return minA-maxB;
	}
}

function ProjectSAT(axis, convex){
	let d = axis.DotProduct(convex.points[0]);
	let min = d;
	let max = d;
  convex.points.forEach((point, index) => {
    d = point.DotProduct(axis);
    if(d<min){
			min = d;
		}
		else if(d>max){
			max = d;
		}
  });
  return new Vector2d(min, max);
}
