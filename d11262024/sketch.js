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

let blobs = [];

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  physics = new VerletPhysics2D(); //init toxilibs physics world
  physics.setWorldBounds(new Rect(0, 0, width, height)); //set a boudnry around the canvas

  pusher = new Attractor(0, 0, 100); //mouse
  // center = new Attractor(width / 2, height / 2, 100);

  setBlobs();
}

function setBlobs(){
  let o1 = createVector(width/4, height/2);
  let blob1 = new Blob(o1, 200);
  blobs.push(blob1);
  
  let o2 = createVector(width/4 * 3, height/2);
  let blob2 = new Blob(o2, 200);
  blobs.push(blob2);
}


function draw() {
  pusher.x = mouseX;
  pusher.y = mouseY;
  physics.update();
  background(255);
  
  for(let b of blobs){
    b.show();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setPoints();
}


//move to a new file?
class Point extends VerletParticle2D {
  constructor(x, y, l){
    super(x, y);
    this.length = l;
    physics.addBehavior(new AttractionBehavior(this, this.length, -1));
    // Repel particles that come within its radius.
    physics.addParticle(this);
  }

  show(){
    circle(this.x, this.y, 10);
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

class Blob {
  constructor(o, r){
    this.origin = o;
    this.radius = r;
    this.setPoints();
  }

  setPoints() {
    this.points = [];
    this.springs = [];
    // origin = createVector(width/2, height/2);
    let origin = this.origin;

    let res = PI/180; //one degree
    let radius = this.radius;

    //calculate the distance between two points, used for springs and repulsion
    let p1 = createVector(cos(0) * radius + origin.x, sin(0) * radius + origin.y);
    let p2 = createVector(cos(res) * radius + origin.x, sin(res) * radius + origin.y);
    let length = p1.dist(p2);
    // print("length", length);

    for(let a = res; a < TWO_PI; a += res){
      // let vector = createVector(cos(a) * radius, sin(a) * radius);
      let vector = new Point(cos(a) * radius + origin.x, sin(a) * radius + origin.y, length);
      this.points.push(vector);
    }


    //test a spring
    for(let i = 0; i < this.points.length; i++){
      let p1, p2;
      p1 = this.points[i];
      if(i < this.points.length - 1){
        p2 = this.points[i+1]; //last point? connect to the first
      } else {
        p2 = this.points[0];
      }

      // let length = dist(p1.x, p1.y, p2.x, p2.y);
      let strength = 0.5;
      let spring = new VerletSpring2D(p1, p2, length, strength);
      physics.addSpring(spring);
      // springs.push(spring);
    }
  }

  show() {
    beginShape();
    for(let p of this.points){
      // p.show();
      vertex(p.x, p.y);
    }

    vertex(this.points[0].x, this.points[0].y);
    endShape();
  }
}