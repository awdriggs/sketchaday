let polys = [];
let points;
let radius;

function preload() {
    img = loadImage(BASEURL + '/assets/images/mona.jpeg');
  }   

function setup() {
  createCanvas(800, 800);
  radius = 10 * width/800;
  // createCanvas(windowWidth, windowHeight);
  points = poisson(width, height, radius);
  let opacity = 255;
  let colors = [color(255, 0, 0, opacity), color(0, 255, 0, opacity), color(0, 0, 255, opacity)];
  img.resize(width, height);

  img.loadPixels();

  for(let i = 0; i < points.length; i++){
    let p = points[i];
    polys.push(new Poly(p.x, p.y, floor(random(5, 8)), radius * 2, img.get(p.x, p.y)));
  }

  noStroke();
  // debugger;
}


function draw() {
  blendMode(BLEND);
  background(255);

  // for(let p of polys){
  //   p.update();
  //   fill(0);
  //   p.draw();
  // }
  // blendMode(ADD);
  for(let p of polys){
    p.update();
    fill(p.fill);
    p.draw();
  }

  // if(frameCount % 120 == 0){
  //   test.regenerate();
  // }


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

class Poly{
  constructor(cx, cy, s, r, f){
    this.cx = cx;
    this.cy = cy;
    this.numSides = s;
    this.maxRadius = r;
    this.points = this.makePoints(s, r);
    this.fill = f;
  }

  makePoints(sides, radius){
    let points = [];
    let angleStep = TWO_PI / sides;

    for(let i = 0; i < sides; i++){
      // let a = random(i * angleStep, (i + 1) * angleStep);
      let a = i * angleStep;
      // let r = random(radius/2, radius);
      let r = radius * 0.8
      let x = this.cx + cos(a) * r;
      let y = this.cy + sin(a) * r;
      points.push(new Rotator(x, y, radius * 0.8 /sides));
    }

    return points;
  }

  draw(){
    // fill(this.fill);
    beginShape();

    for(let p of this.points){
      vertex(p.x, p.y);
    }

    endShape(CLOSE);

    // fill("red");
    // ellipse(this.cx, this.cy, 20, 20);
  }

  update(){
    for(let m of this.points){
      m.update();
      // m.draw();
    }
  }

  regenerate(){
    this.points = this.makePoints(this.numSides, this.maxRadius);
  }

}


class Rotator{
  constructor(cx, cy, r){
    this.cx = cx;
    this.cy = cy;
    this.radius = r;
    this.speed = random(0.04, 0.05);
    this.angle = random(0, TWO_PI);
    this.dir = random() > 0.5 ? 1 : -1
    this.x = cos(this.angle) * this.radius + this.cx;
    this.y = sin(this.angle) * this.radius + this.cy;
  }

  draw(){
    fill("red");
    ellipse(this.cx, this.cy, 10, 10);
    ellipse(this.x, this.y, 10, 10);
  }

  update(){
    this.angle += this.speed * this.dir;
    this.x = cos(this.angle) * this.radius + this.cx;
    this.y = sin(this.angle) * this.radius + this.cy;
  }

}


