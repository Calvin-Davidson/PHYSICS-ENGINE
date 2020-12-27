/*
function returning a random number between a min and a maximum value
*/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function makePositive(input) {
    return Math.abs(input);
}

function sinusWave(index) {
  return ((2* Math.sin(index / 50)) + (2* Math.cos(index / 50))) / 50;
}

function Evaluate(x = this.x, formula = this.formula){
  let search = 'x';
  let formula2 = formula.toString();
  let result = eval(formula2.split(search).join(x.toString()));
  return result;
}
function GetDistance(pos1, pos2){
  let result = Math.sqrt((pos2.y - pos1.y)*(pos2.y - pos1.y) + (pos2.x - pos1.x)*(pos2.x - pos1.x));
  return result;
}
function GetSlope(pos1, pos2){
  let result = (pos2.y - pos1.y)/(pos2.x - pos1.x);
  return result;
}
function CalcIntercept(a1, a2, b1, b2){
  let intersectionResult = new LineIntersectionResult(false, new Vector2d(0,0));
  intersectionResult.intersects = InterceptReturnBoolean(a1, a2, b1, b2);
  if(intersectionResult.intersects){
    intersectionResult.atPoint.x = InterceptReturnX(a1, a2, b1, b2);
    intersectionResult.atPoint.y = InterceptReturnY(intersectionResult.atPoint.x, a1, b1);
  }
  return intersectionResult;
}
function IntersectionWithinBounds(intersectionPoint, bound1, bound2) {
  let intersectX = intersectionPoint.x < Math.max(bound1.x, bound2.x) && intersectionPoint.x > Math.min(bound1.x, bound2.x);
  if(Math.abs(bound1.x-bound2.x)<10){intersectX = true;}
  let intersectY = intersectionPoint.y < Math.max(bound1.y, bound2.y) && intersectionPoint.y > Math.min(bound1.y, bound2.y);
  if(Math.abs(bound1.y-bound2.y)<10){intersectY = true;}
  if(intersectX && intersectY)
  {
    return true;
  }
  else {
    return false;
  }
}
function InterceptReturnBoolean(a1, a2, b1, b2){
  if(a1 == a2) return false;
  let x = (b2-b1)/(a1-a2);
  if(x<0||x>width) return false;
  return true;
}
function InterceptReturnX(a1, a2, b1, b2){
  let x = (b2-b1)/(a1-a2);
  return x;
}
function InterceptReturnY(x, a, b){
  let y = a*x+b;
  return y;
}

/* function cartesian() {
    var r = [], arg = arguments, max = arg.length-1;
    function helper(arr, i) {
        for (var j=0, l=arg[i].length; j<l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(arg[i][j]);
            if (i==max)
                r.push(a);
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}
*/
