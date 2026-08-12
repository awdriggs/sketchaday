let blobs = [];
let numBlobs = 10;

function setup() {
  createCanvas(800, 800);
  noFill();
  reset();   
}

function draw() {
  background(255);

  for(let b of blobs){
    b.update();
    b.draw();
  }
}

function reset() {
  blobs = []
  for(let i = 0; i < numBlobs; i++){
    let x = random(width/10, width - width/10);
    let y = random(height/10, height - height/10);
    blobs.push(new Blobby(x, y, 10, width * random(0.2, 0.8)));
  }
}

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

class Blobby {
  constructor(cx, cy, r, d){
    this.points = [];
    let angleStep = TWO_PI / r;
    for(let i = 0; i < r; i++){
      let x = cx + cos(angleStep * i) * d/2;
      let y = cy + sin(angleStep * i) * d/2;
      this.points.push(new Point(x, y, x, y));
    }
  }

  update(){
    for(let p of this.points){
      p.applyForce();
    }
  }

  draw(){
    let pts = this.points;
    beginShape();
    curveVertex(pts[pts.length - 1].loc.x, pts[pts.length - 1].loc.y);
    for(let p of pts){
      curveVertex(p.loc.x, p.loc.y);
    }
    curveVertex(pts[0].loc.x, pts[0].loc.y);
    curveVertex(pts[1].loc.x, pts[1].loc.y);
    endShape();
  }
}

class Point {
  constructor(x, y, ax, ay){
    this.loc = createVector(x, y);
    this.anchor = createVector(ax, ay);

    this.k = 0.001;
    this.force = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.damping = 0.9;
  }

  applyForce() {
    this.force = p5.Vector.sub(this.anchor, this.loc).mult(this.k);

    let n = p5.Vector.fromAngle(map(noise(this.loc.x * 0.01, this.loc.y * 0.01, frameCount * 0.005), 0, 1, -1, 1) * TWO_PI);
    n.mult(0.01 * (width/800));

    this.force.add(n);
    this.vel.add(this.force);
    this.vel.mult(this.damping);
    this.loc.add(this.vel);
  }
}
