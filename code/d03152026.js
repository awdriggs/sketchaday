let test;
function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  test = new Poly(width/2, height/2, 4, width/2, 0);
}

function draw() {
  background(255);

  test.draw();

  if(frameCount % 120 == 0){
    test.regenerate();
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
      let a = random(i * angleStep, (i + 1) * angleStep);
      let r = random(radius/2, radius);
      let x = this.cx + cos(a) * r;
      let y = this.cy + sin(a) * r;
      points.push(createVector(x, y));
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

  regenerate(){
    this.points = this.makePoints(this.numSides, this.maxRadius);
  }

}
