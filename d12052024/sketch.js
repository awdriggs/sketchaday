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

  pusher = new Attractor(0, 0, 80); //mouse
  // center = new Attractor(width / 2, height / 2, 100);

  setPoints();
}

function setPoints() {
  points = [];
  springs = [];
  // origin = createVector(width/2, height/2);

  let cellWidth = 100;
  let numCols = floor(width/cellWidth);
  cellWidth = width/numCols;

  let cellHeight = 100;
  let numRows = floor(width/cellHeight);
  cellHeight = height/numRows;

  for(let i = 0; i < numCols; i++){
    let col = [];
    for(let j = 0; j < numRows; j++){
      let vector = new Point(i * cellWidth + cellWidth/2, j * cellHeight + cellHeight/2, cellWidth);
      if(j == 0 || j == numRows - 1 || i == 0 || i == numCols - 1){
        vector.lock();
      }
      col.push(vector);
    }
    points.push(col);
  }


  //lock the corners
  points[0][0].lock();
  points[0][numRows-1].lock();
  points[numCols-1][0].lock();
  points[numCols-1][numRows-1].lock();

  let strength = 0.001;
  for(let i = 0; i < points.length; i++){
    let col = points[i];
    for(let j = 0; j < col.length; j++){
      let p = col[j];

      if(i > 0){
        let left = points[i-1][j];

        let spring = new VerletSpring2D(p, left, cellWidth, strength);
        physics.addSpring(spring);
      }

      if(j > 0){
        let above = points[i][j-1];
        let spring = new VerletSpring2D(p, above, cellHeight, strength);
        physics.addSpring(spring);
      }
    }
  }
}

function draw() {
  pusher.x = mouseX;
  pusher.y = mouseY;
  physics.update();
  background(255);

   
print(frameRate());

  for(let i = 0; i < points.length; i++){
    let col = points[i];
    for(let j = 0; j < col.length; j++){
      let p = col[j];
      // p.show();

      if(i > 0){
        let left = points[i-1][j];
        line(p.x, p.y, left.x, left.y);
      }

      if(j > 0){
        let above = points[i][j-1];
        line(p.x, p.y, above.x, above.y);
      }
    }
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
    this.r = 2; //for drawing
    this.boundry = l/4
    // physics.addBehavior(new AttractionBehavior(this, r * 4, -1));
    // physics.addBehavior(new AttractionBehavior(this, width, 0.1));
    // print(length); //spring length
    // physics.addBehavior(new AttractionBehavior(this, this.boundry, -1));
    // Repel particles that come within its radius.
    physics.addParticle(this);
  }

  show(){
    stroke(255, 0, 0);
    circle(this.x, this.y, this.boundry);
    stroke(0);
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
    physics.addBehavior(new AttractionBehavior(this, this.r + 4, 0.5));
    physics.addParticle(this);
  }

  show() {
    fill(0);
    circle(this.x, this.y, this.r * 2);
  }
}
