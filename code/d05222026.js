let squares = []
let test;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let margin = width/4;
  squares.push(new Square(margin/2, margin/2, width - margin, height - margin));
  strokeWeight(5);
}

function draw() {
  background(255);
  for(let s of squares){
    s.draw();
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
