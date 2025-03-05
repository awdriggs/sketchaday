// let test;
let tiles = []
let numCols, numRows;
let size;

function setup() {
  createCanvas(800, 800);
  // createCanvas(300, 300);
  // createCanvas(windowWidth, windowHeight);

  // test = new shiftingPoly(width/2, height/2, width/2);

  numCols = 10;
  numRows = 10;

  size = width/numCols;

  for(let i = 0; i < numCols; i++){
    for(let j = 0; j  < numRows; j++){
      let tile = new shiftingPoly(i * size + size/2, j * size + size/2, size);
      tiles.push(tile);
    }
  }

  // tiles.push(test);

}

function draw() {
  background(255);

  // test.update();
  // test.draw();

  for(let t of tiles){
    t.update();
    t.draw();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class shiftingPoly {
  constructor(cx, cy, size){
    this.center = createVector(cx, cy);
    this.size = size;
    this.points = [];
    this.defineExtents();
    this.setCurrentPoint();
  }

  defineExtents(){
    this.points.push(new Point(this.center.x - this.size/2, this.center.y - this.size/2, this.size, "LT")); //left top corner
    this.points.push(new Point(this.center.x + this.size/2, this.center.y - this.size/2, this.size, "RT")); //right top corner
    this.points.push(new Point(this.center.x + this.size/2, this.center.y + this.size/2, this.size, "RB")); //right bottom corner
    this.points.push(new Point(this.center.x - this.size/2, this.center.y + this.size/2, this.size, "LB")); //left bottom corner
  }

  update() {
    if(this.currentPoint.update() == true){
      console.log("new point")
      this.setCurrentPoint()
    }
  }

  setCurrentPoint(){
    this.currentPoint = this.points[floor(random(this.points.length))];
    // this.currentPoint= this.points[2];
    this.currentPoint.randomizeAxis();
  }

  draw(){

    fill(0);
    beginShape();
    for(let p of this.points){
      // ellipse(p.ox, p.oy, 10, 10);
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
  }
}

class Point {
  constructor(x, y, md, t){
    this.ox  = x;
    this.oy = y;
    this.x = x;
    this.y = y;
    this.md = md; //max distance
    this.travelDist = random(0.4, 0.2); //a percent
    this.type =  t;
    // this.step = 1;
    this.step = random(0.5, 1);

    this.randomizeAxis();
    this.setDirection();
  }

  randomizeAxis(){
    this.axis = Math.random() >= 0.5 ? "x" : "y"; // Store key as a string
    // this.axis = "y";
  }

  setDirection(){
    switch (this.type) {
      case "LT": // Left Top
        this.xdir = 1;
        this.ydir = 1;
        break;
      case "RT": // Right Top
        this.xdir = -1;
        this.ydir = 1;
        break;
      case "LB": // Left Bottom
        this.xdir = 1;
        this.ydir = -1;
        break;
      case "RB": // Right Bottom
        this.xdir = -1;
        this.ydir = -1;
        break;
      default:
        console.log("Invalid position.");
    }
  }

  update(){
    let bubble = this.edgeCheck(); //bubble a change up to the parent?
    this.move();
    return bubble; //will be true of false
  }

  move(){
    if(this.axis == "x"){
      this.x += this.step * this.xdir;
    } else if(this.axis == "y"){
      this.y += this.step * this.ydir;
    }
  }

  //edge check, what a shit show
  edgeCheck(){
    if(this.axis  == "x"){ //horizontal movement
      if(this.type == "LT" || this.type == "LB"){
        //if left top or bottom

        //if x is <= this.x
        //edge check
        if(this.x >= this.ox + this.md * this.travelDist){
          this.x = this.ox + this.md * this.travelDist; //set on the outermost edge
          this.xdir *= -1; //move back towards origin x
          return true;
          // return false;
        } else if(this.x <= this.ox){
          this.x = this.ox;
          this.xdir *= -1;
          return true; //back at origin? this will bubble up to parent to switch the point
        }
      } else { //right top or bottom
        if(this.x <= this.ox - this.md * this.travelDist){
          this.x = this.ox - this.md * this.travelDist;
          this.xdir *= -1;
          return true;
        } else if(this.x >= this.ox){
          this.x = this.ox;
          this.xdir *= -1; //switch the direction
          return true; //back at origin
        }
      }
    } else if(this.axis == "y"){ //vertical movement
      if(this.type == "RT" || this.type == "LT"){ //top left or right point
        if(this.y >= this.oy + this.md * this.travelDist){ //farther than the allowed distance?
          this.y = this.oy + this.md * this.travelDist;
          this.ydir *= -1; //switch dir back towards the origin
          return true;
        } else if(this.y <= this.oy){ //less than the origin? above the top?
          this.y = this.oy; //reset to orgin
          this.ydir *= -1; //move dir away from orgin
          return true; //back at home location
        }
      } else { //bottom left or right point
        if(this.y <= this.oy - this.md * this.travelDist){ //moved above the allowe distance?
          this.y = this.oy - this.md * this.travelDist; //
          this.ydir *= -1; //move back towars origin
          return true;
        } else if(this.y >= this.oy){ //past the bottom y value?
          this.y = this.oy; //reset to origin
          this.ydir *= -1; //move up
          return true; //back at home location
        }
      }
    }
  }
}

