let test;
function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  test = new Poly(width/2, height/2, 4, width/2, 0);
}

function draw() {
  background(255);

  test.update();
  test.draw();

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
    fill(this.fill);
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


