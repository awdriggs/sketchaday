let x1, y1, x2, y2, x3, y3, x4, y4;
// x1, first anchor point
// y1, first anchor point
// x2, x-coordinate of the first control point.
// y2, y-coordinate of the first control point.
// x3, x-coordinate of the second control point.
// y3, y-coordinate of the second control point.
// x4, x-coordinate of the anchor point.
// y4, y-coordinate of the anchor point.

let points = [];
let clickedPoint;
let isChanging = false;

function setup() {
  createCanvas(800, 800);

  points.push(new Point(100,100, "anchor"));
  points.push(new Point(150, 50, "bezier"));
  points.push(new Point(200,100, "anchor"));
  points.push(new Point(250, 150, "bezier"));
  points.push(new Point(200,200, "anchor"));
  points.push(new Point(150, 250, "bezier"));
  points.push(new Point(100,200, "anchor"));
  points.push(new Point(50, 150, "bezier"));
  points.push(new Point(100,100, "anchor"));

}

function draw() {
  background(255);
  beginShape();
  fill("red");

  for(let i = 0; i < points.length; i++){
    let p = points[i];
    // vertex(p.x,p.y);
    if(p.type == "anchor"){
      vertex(p.x,p.y);
    } else {
      quadraticVertex(p.x, p.y, points[i+1].x, points[i+1].y);
    }
    fill("black")
    ellipse(p.x,p.y, 10,10);
  }
  // // bezierVertex(x2.value(), y2.value(), x3.value(), y3.value(), x4, y4);
  // quadraticVertex(x2.value(), y2.value(), x4, y4);
  // quadraticVertex(x3.value(), y3.value(), x1, y1);
  // // vertex(x4, y4);
  fill("red");
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Declaration
class Point {
  constructor(x,y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  distance(){

  }
}

// Start changing the first control point if the user clicks near it.
function mousePressed() {
  let closestDistance = 100000; //impossible large
  //find the clicked point
  for(let i = 0; i < points.length; i++){
    let thisDistance = dist(points[i].x, points[i].y, mouseX, mouseY)

    print(thisDistance);

    if(thisDistance < closestDistance){
      closestDistance = thisDistance;
      closestPoint = points[i]; 
      print(i, closestPoint);
    }
    //calculate distance between mouse and point, see if it is less than the current closest distance 
  }

  if (dist(closestPoint.x, closestPoint.y, mouseX, mouseY) < 20) {
    
    clickedPoint = closestPoint;
    print(clickedPoint);
    isChanging = true;
  }
}

// Stop changing the first control point when the user releases the mouse.
function mouseReleased() {
  // clickedPoint = null; 
  isChanging = false;
}

// Update the first control point while the user drags the mouse.
function mouseDragged() {
  print(clickedPoint);
  if (isChanging === true) {
    clickedPoint.x = mouseX;
    clickedPoint.y = mouseY;
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}