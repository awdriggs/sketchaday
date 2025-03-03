let test;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  test = new shiftingPoly(width/2, height/2, width/2);
}

function draw() {
  background(255);

  test.update();
  test.draw();
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
    //change later to just move one point
    // for(let p of this.points){
    //   p.update();
    //   // vertex(p.x, p.y);
    // }
  }

  setCurrentPoint(){
    this.currentPoint = this.points[floor(random(this.points.length))];
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
    this.type =  t;
    this.step = 1;
    this.axis = random() >= 0.5 ? 0 : 1;

    this.setDirection();
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
    this.move();
    return this.dist();
  }

  //distnace to orgin, by x and y
  dist(){
    if(this.axis == 0){
      let xdist = abs(this.ox - this.x);

      if(xdist >= floor(this.md/2)){
        this.xdir *= -1;
        console.log("x swap")
        return false;
      } else if(xdist == 0){
        console.log("x reset")
        this.axis = random() >= 0.5 ? 0 : 1;
        this.setDirection(); //resets direction
        return true;
      }

    } else if(this.axis == 1){
      let ydist = abs(this.oy - this.y);

      if(ydist >= floor(this.md/2)){
        this.ydir *= -1;
        console.log("swap")
        return false;
      } else if(ydist == 0){
        this.axis = random() >= 0.5 ? 0 : 1;
        this.setDirection(); //resets the direction
        return true;
      }
    } else {
      return false;
    }
    
  }

  move(){
    if(this.axis == 0){
      this.x += this.step * this.xdir;
      this.x = constrain(this.x, this.ox - this.md/2, this.ox + this.md/2);
    } else if(this.axis == 1){
      this.y += this.step * this.ydir;
      this.y = constrain(this.y, this.oy - this.md/2, this.oy + this.md/2);
    }
  }
}

