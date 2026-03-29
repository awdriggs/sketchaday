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
      let a = random(i * angleStep, (i + 1) * angleStep);
      let r = random(radius/2, radius);
      let x = this.cx + cos(a) * r;
      let y = this.cy + sin(a) * r;
      points.push(new BrownMover(x, y, 10, 10, "red"));
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
      m.move();
    }
  }

  regenerate(){
    this.points = this.makePoints(this.numSides, this.maxRadius);
  }

}

class BrownMover {
  constructor(x,y,w,h,c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = c;
  }

  move() {
    let dir = floor(random(0, 4));

    if(dir == 0){
      this.x += this.w/10;
      if(this.x >= width) {
        this.x = width - this.w;
      }
    } else if(dir == 1){
      this.y += this.h/10;
      if(this.y >= height){
        this.y = height - this.h;
      }
    } else if(dir == 2){
      this.x -= this.w/10;
      if(this.x <= 0){
        this.x = this.w;
      }
    } else if(dir == 3){
      this.y -= this.h/10;
      if(this.y <= 0){
        this.y = this.h;
      }
    }
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.w, this.h)
  }
}

