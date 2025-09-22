// toxilibs
let { Vec2D, Rect } = toxi.geom; //destructure from the toxi library
// The necessary geometry classes: vectors, rectangles
// Alias the important classes from toxi.physics2d.
let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
// For the world’s gravity
let { GravityBehavior } = toxi.physics2d.behaviors;

//sketch vars
let points = [];
let origin;
let physics;

let springs = [];

let clickedPoint;
let isChanging = false;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  physics = new VerletPhysics2D(); //init toxilibs physics world
  physics.setWorldBounds(new Rect(0, 0, width, height)); //set a boudnry around the canvas

  setPoints();
}

function setPoints() {
  points = [];
  springs = [];
  // origin = createVector(width/2, height/2);
  let origin = new Vec2D(width/2, height/2);

  let degrees = 1;
  let res = degrees * PI/180;
  let radius = 200;

  for(let a = res; a < TWO_PI; a += res){
    // let vector = createVector(cos(a) * radius, sin(a) * radius);
    let vector = new Point(cos(a) * radius + origin.x, sin(a) * radius + origin.y,2);
    // vector.add(origin);
    // vector.addSelf(origin);
    physics.addParticle(vector);
    points.push(vector);
  }


  //test a spring
  //{!1} What is the rest length of the spring?
  for(let i = 0; i < points.length; i++){
    let p1, p2;
    p1 = points[i];
    if(i < points.length - 1){
      p2 = points[i+1]; //last point? connect to the first
    } else {
      p2 = points[0];
    }

    let length = dist(p1.x, p1.y, p2.x, p2.y);
    let strength = 1;
    spring = new VerletSpring2D(p1, p2, length, strength);
    physics.addSpring(spring);
    // springs.push(spring);
  }


}

function draw() {
  physics.update();
  background(255);

  beginShape();
  for(let p of points){
    p.show();
    vertex(p.x, p.y);
  }
  vertex(points[0].x, points[0].y);

  endShape();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setPoints();
}

function mousePressed() {
  for(let p of points){
    if(p.clicked()){
      clickedPoint = p;
      clickedPoint.lock();
    }
  }
}

function mouseReleased() {
  if(clickedPoint){
    clickedPoint.unlock();
    clickedPoint = null;
  }
}

function mouseDragged() {
  if(clickedPoint){
    clickedPoint.x = mouseX;
    clickedPoint.y = mouseY;
  }
}

//move to a new file?
class Point extends VerletParticle2D {
  constructor(x, y, r){
    super(x, y);
    this.r = r;
  }

  show(){
    circle(this.x, this.y, this.r * 2);
  }

  clicked(){
    if(dist(this.x, this.y, mouseX, mouseY) < this.r){
      print("clicked", this);
      return true;
    } else {
      return false;
    }
  }
}