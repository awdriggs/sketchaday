let polys = []
let test;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let margin = width/3;
  polys.push(new Poly(width/2, height/2, (width - margin)/2, 6));
  strokeWeight(15 * width/800);

  noFill();
}

function draw() {
  background(255);
  for(let p of polys){
    p.draw();
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

class Poly {
  constructor(centerX, centerY, radius,  numPoints){
    this.x = centerX;
    this.y = centerY;

    //build the points
    this.points = [];

    let turnAmount = TWO_PI/numPoints;
    let cellSize = 2 * radius * sin(PI / numPoints) * 0.8;
    //march around a circle building points
    for(let i = 0; i < numPoints; i++) {
      let x, y;
      x = this.x + cos(i * turnAmount) * radius;
      y = this.y + sin(i * turnAmount) * radius;
      // this.points.push(new Point(x, y, radius/numPoints, random(TWO_PI), random(0.005, 0.02)));
      this.points.push(new Mover(x, y, x - cellSize/2, y - cellSize/2, cellSize, cellSize));


      // constructor(sx, sy, bx, by, bw, bh){
    }
  }

  draw(){
    for(let p of this.points) {
      // p.spin();
      p.update(); //for mover
      // p.draw();
    }

    let pts = this.points;
    let n = pts.length;

    beginShape();
    curveVertex(pts[n-1].loc.x, pts[n-1].loc.y); // phantom start
    for(let p of pts){
      curveVertex(p.loc.x, p.loc.y);
    }
    curveVertex(pts[0].loc.x, pts[0].loc.y); // phantom end
    curveVertex(pts[1].loc.x, pts[1].loc.y); // close tangent at pts[0]
    endShape();
  }

}

class Square {
  constructor(cornerX, cornerY, w, h){
    this.x = cornerX;
    this.y = cornerY;
    this.w = w;
    this.h = h;

    //build the points
    this.points = [];
    this.points.push(new Point(this.x + 0.25 * w, this.y +  0.25 * h, w/4, random(TWO_PI),0.01));
    this.points.push(new Point(this.x + 0.75 * w, this.y +  0.25 * h, w/4, random(TWO_PI),0.01));
    this.points.push(new Point(this.x + 0.75 * w, this.y +  0.75 * h, w/4, random(TWO_PI),0.01));
    this.points.push(new Point(this.x + 0.25 * w, this.y +  0.75 * h, w/4, random(TWO_PI),0.01));
  }

  draw(){
    for(let p of this.points) {
      p.spin();
      p.draw();
    }

    let pts = this.points;
    let n = pts.length;

    beginShape();
    curveVertex(pts[n-1].loc.x, pts[n-1].loc.y); // phantom start
    for(let p of pts){
      curveVertex(p.loc.x, p.loc.y);
    }
    curveVertex(pts[0].loc.x, pts[0].loc.y); // phantom end
    curveVertex(pts[1].loc.x, pts[1].loc.y); // close tangent at pts[0]
    endShape();
  }
}



class Point {
  constructor(cx, cy, radius, angle, speed){
    this.center = createVector(cx, cy);
    this.radius = radius;
    this.angle = angle;
    this.speed = speed;
    this.dir = random() > 0.5 ? 1 : -1;

    this.loc = createVector(this.center.x + cos(this.angle) * this.radius, this.center.y + sin(this.angle) * this.radius); //location for the end of the point
  }



  draw(){
    ellipse(this.center.x, this.center.y, this.radius * 2, this.radius * 2);
    ellipse(this.center.x + cos(this.angle) * this.radius, this.center.y + sin(this.angle) * this.radius, 10, 10);
  }

  spin(){
    this.angle += this.speed * this.dir;
    this.loc.x = this.center.x + cos(this.angle) * this.radius;
    this.loc.y = this.center.y + sin(this.angle) * this.radius;
  }


}

class Mover {
  constructor(sx, sy, bx, by, bw, bh){
    this.loc = createVector(sx, sy);
    this.boundingBox = {x: bx, y: by, w: bw, h: bh};
    this.heading = -HALF_PI;
    this.speed = random(0.2, 0.5);
    this.maxTurn = 0.5; // max radians per frame — lower = straighter
    this.dia = 10;
      // debugger;
  }

  update(){
    this.speed = random(0.2, 0.5);
    this.heading += random(-this.maxTurn, this.maxTurn);

    let bb = this.boundingBox;
    let r = this.dia / 2;

    let nx = this.loc.x + cos(this.heading) * this.speed;
    let ny = this.loc.y + sin(this.heading) * this.speed;

    if(nx - r < bb.x || nx + r > bb.x + bb.w){
      this.heading = PI - this.heading;
      nx = this.loc.x + cos(this.heading) * this.speed;
    }

    if(ny - r < bb.y || ny + r > bb.y + bb.h){
      this.heading = -this.heading;
      ny = this.loc.y + sin(this.heading) * this.speed;
    }

    this.loc.x = nx;
    this.loc.y = ny;
  }

  draw(){
    this.update();
    rect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.w, this.boundingBox.h);
    // fill(0);
    ellipse(this.loc.x, this.loc.y, this.dia, this.dia);
  }
}


