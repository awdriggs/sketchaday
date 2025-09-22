let points = [];
let clickedPoint;
let isChanging = false;
let baseRadius = 200;
let center;

function setup() {
  createCanvas(800, 800);

  setPoints();
}

function setPoints(){
  points = [];
  center = createVector(width/2, height/2);

  //resolution
  let degrees = 5;
  let res = degrees * PI/180
  let everyOther = 0;
  let radius;
  let flip = 1;

  for(let i = 0; i < TWO_PI; i+=res){
    let type;

    if(everyOther % 2 == 0){
      type = "anchor";
      radius = baseRadius;
    } else {
      type = "bezier";

      if(flip > 0){
        radius = baseRadius * 1.25;
      } else {
        radius = baseRadius * 0.75;
      }
      print("flip", flip);
      flip *= -1;
    }


    points.push(new Point(createVector(cos(i)*radius + center.x, sin(i)*radius + center.y), type));

    everyOther++;
  }
}

function draw() {
  background(255);
  text("fail", 100, 100)
  beginShape();

  fill("red");

  // vertex(points[0].loc.x, points[0].loc.y);
  for(let i = 0; i < points.length; i+=4){
    print(i);
    let p = points[i];
    if(points[i+4]){

    // if(i == 0){
    //   // print("first point", p.loc);
    //   vertex(p.loc.x, p.loc.y);
    // } else if(p.type == "bezier" && i != points.length-1){
    //   // print(i);
    //   // vertex(p.loc.x, p.loc.y);
    //   // debugger;
    //   let control = points[i-1];
    //   quadraticVertex(control.loc.x, control.loc.y, p.loc.x, p.loc.y);
    // }

    // Add the first control point.
    curveVertex(points[i].loc.x, points[i].loc.y);

    // Add the anchor points to draw between.
    curveVertex(points[i+1].loc.x, points[i+1].loc.y);
    curveVertex(points[i+2].loc.x, points[i+2].loc.y);

    // Add the second control point.
    curveVertex(points[i+3].loc.x, points[i+3].loc.y);
    // curveVertex(p.loc.x, p.loc.y);
    }
    //ellipse(p.loc.x, p.loc.y, 20, 20);
    //let p1 = points[i];
    //let p2;
    //if(i == 0){
    //  p2 = points[points.length-1];
    //  vertex(p1.x,p1.y);
    //} else {
    //  p2 = points[i - 1];
    //}

    //// vertex(p1.x,p1.y);

    //fill("black")
    //ellipse(p1.x,p1.y, 10,10);

    //let anchor = p5.Vector.lerp(p1, p2, 0.5);
    ////direction
    //let direction = p5.Vector.sub(anchor, center);

    //// Normalize and scale the direction to a specific offset amount
    //let offsetAmount = 100;
    //direction.setMag(offsetAmount);
    //let offsetPosition = anchor.copy().add(direction);

    //// quadraticVertex(p1.x, p1.y, offsetPosition.x, offsetPosition.y);
    //bezierVertex(p1.x, p1.y, offsetPosition.x, offsetPosition.y, p2.x, p2.y);
    //// anchor.mult(1.5);
    //fill("blue");
    //ellipse(anchor.x, anchor.y, 10, 10);
    //ellipse(offsetPosition.x, offsetPosition.y, 10, 10);
  }

  // vertex(points[0].x, points[0].y);
  fill("red");
  endShape(CLOSE);

  //for(let i = 0; i < points.length; i++){
  //  let p1 = points[i];

  //  let p2;
  //  if(i == 0){
  //    p2 = points[points.length-1];
  //  } else {
  //    p2 = points[i - 1];
  //  }

  //  let anchor = p5.Vector.lerp(p1, p2, 0.5);
  //  //direction
  //  let direction = p5.Vector.sub(anchor, center);

  //  // Normalize and scale the direction to a specific offset amount
  //  let offsetAmount = 100;
  //  direction.setMag(offsetAmount);
  //  let offsetPosition = anchor.copy().add(direction);
  //  // anchor.mult(1.5);
  //  fill("blue");
  //  ellipse(anchor.x, anchor.y, 10, 10);
  //  ellipse(offsetPosition.x, offsetPosition.y, 10, 10);
  //}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setPoints();
}

// Declaration
class Point {
  constructor(v, type) {
    this.loc = v;
    this.type = type;
  }

  distance(){

  }
}

//rewrite for pvecotr
// Start changing the first control point if the user clicks near it.
function mousePressed() {
  let closestDistance = 100000; //impossible large
  //find the clicked point
  for(let i = 0; i < points.length; i++){
    let thisDistance = dist(points[i].loc.x, points[i].loc.y, mouseX, mouseY)

    print(thisDistance);

    if(thisDistance < closestDistance){
      closestDistance = thisDistance;
      closestPoint = points[i];
      print(i, closestPoint);
    }
    //calculate distance between mouse and point, see if it is less than the current closest distance
  }

  if (dist(closestPoint.loc.x, closestPoint.loc.y, mouseX, mouseY) < 20) {

    clickedPoint = closestPoint;
    print(clickedPoint);
    isChanging = true;
  }
}

//Stop changing the first control point when the user releases the mouse.
function mouseReleased() {
  // clickedPoint = null;
  isChanging = false;
}

//Update the first control point while the user drags the mouse.
function mouseDragged() {
  print(clickedPoint);
  if (isChanging === true) {
    clickedPoint.loc.x = mouseX;
    clickedPoint.loc.y = mouseY;
  }
}