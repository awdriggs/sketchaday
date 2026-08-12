let points = [];
let numPoints = 100;


function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  reset();

  noFill();
  strokeWeight(5 * width/800);
  strokeCap(SQUARE);

}

function draw() {
  background(255);

  // console.log(p.mouseIn());
  for(let p of points){
    // if(mouseIsPressed){
    //   p.loc.x = mouseX;
    //   p.loc.y = mouseY;
    //   p.vel = createVector(0, 0);
    // } else {

    p.applyForce();
    // }

    p.draw();
  }
}

function reset(){
  points = [];
  let spacing = width/numPoints;

  for(let i = 0; i < numPoints; i++){
    let x = i * spacing + spacing/2;
    let y;
    if(i % 2 == 0){
      y = 0;
    } else {
      y = height;
    }
    let p = new Point(x, y, x, height/2);
    points.push(p);

  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function mousePressed(){
  reset();
}

class Point {
  constructor(x, y, ax, ay){
    this.loc = createVector(x, y);

    this.anchor = createVector(ax, ay);

    this.k = 0.001;
    this.force = createVector(0,0);
    this.vel = createVector(0,0);
    this.damping = random(0.9998, 0.99999);
    // this.damping = 0.;

    this.radius = 20;

  }

  draw(){
    line(this.loc.x, this.loc.y, this.anchor.x, this.anchor.y);
    // ellipse(this.loc.x, this.loc.y, this.radius, this.radius);
  }

  mouseIn() {
    if(dist(mouseX, mouseY, this.loc.x, this.loc.y) < this.radius){
      return true;
    } else {
      return false;
    }
  }

  applyForce() {
    this.force = p5.Vector.sub(this.anchor, this.loc).mult(this.k);
    this.vel.add(this.force);
    this.vel.mult(this.damping);
    this.loc.add(this.vel);
  }

}

