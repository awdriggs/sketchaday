// toxilibs
let { Vec2D, Rect } = toxi.geom; //destructure from the toxi library
// The necessary geometry classes: vectors, rectangles
// Alias the important classes from toxi.physics2d.
let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
// For the world’s gravity
let { GravityBehavior } = toxi.physics2d.behaviors;
let { AttractionBehavior } = toxi.physics2d.behaviors;


//sketch vars
let points = [];
let origin;
let physics;

let springs = [];
let length;

let clickedPoint;
let isChanging = false;

let pusher;
// let center;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  physics = new VerletPhysics2D(); //init toxilibs physics world
  physics.setWorldBounds(new Rect(0, 0, width, height)); //set a boudnry around the canvas

  pusher = new Attractor(0, 0, 100); //mouse
  // center = new Attractor(width / 2, height / 2, 100);

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

  //calculate the distance between two points, used for springs and repulsion
  let p1 = createVector(cos(0) * radius + origin.x, sin(0) * radius + origin.y);
  let p2 = createVector(cos(res) * radius + origin.x, sin(res) * radius + origin.y);
  length = p1.dist(p2); 
  print("length", length);

  for(let a = res; a < TWO_PI; a += res){
    // let vector = createVector(cos(a) * radius, sin(a) * radius);
    let vector = new Point(cos(a) * radius + origin.x, sin(a) * radius + origin.y,2);
    // vector.add(origin);
    // vector.addSelf(origin);
    // physics.addParticle(vector);
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

    // let length = dist(p1.x, p1.y, p2.x, p2.y);
    let strength = 0.5;
    spring = new VerletSpring2D(p1, p2, length, strength);
    physics.addSpring(spring);
    // springs.push(spring);
  }


}

function draw() {
  pusher.x = mouseX;
  pusher.y = mouseY;
  physics.update();
  background(255);

  beginShape();
  for(let p of points){
    // p.show();
    vertex(p.x, p.y);
  }
  vertex(points[0].x, points[0].y);

  endShape();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setPoints();
}

// function mousePressed() {
//   for(let p of points){
//     if(p.clicked()){
//       clickedPoint = p;
//       clickedPoint.lock();
//     }
//   }
// }

// function mouseReleased() {
//   if(clickedPoint){
//     clickedPoint.unlock();
//     clickedPoint = null;
//   }
// }

// function mouseDragged() {
//   if(clickedPoint){
//     clickedPoint.x = mouseX;
//     clickedPoint.y = mouseY;
//   }
// }

//move to a new file?
class Point extends VerletParticle2D {
  constructor(x, y, r){
    super(x, y);
    this.r = r;
    // physics.addBehavior(new AttractionBehavior(this, r * 4, -1));
        // physics.addBehavior(new AttractionBehavior(this, width, 0.1));
    print(length);
    physics.addBehavior(new AttractionBehavior(this, length, -1));
    // Repel particles that come within its radius.
    physics.addParticle(this);
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

class Attractor extends VerletParticle2D {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
    // physics.addBehavior(new AttractionBehavior(this, width, 0.1));
    physics.addBehavior(new AttractionBehavior(this, this.r + 4, -0.01));
    physics.addParticle(this);
  }

  show() {
    fill(0);
    circle(this.x, this.y, this.r * 2);
  }
}
