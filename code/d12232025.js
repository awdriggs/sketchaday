let shades = [];

function setup() {
  createCanvas(800, 800);
  maxSquareSize = width / sqrt(2) * 0.95; //≈ boundingBox * 0.7071
  // createCanvas(windowWidth, windowHeight);
  let numShades = 4;
  for(let i = 0; i < numShades; i++){
    let w = random(maxSquareSize/4, maxSquareSize);
    let h = random(maxSquareSize/4, maxSquareSize);
    shades.push(new RotatedBlock(width/2, height/2, w, h, 0, random(QUARTER_PI/4, QUARTER_PI)));
  }
  rectMode(CENTER)
}

function draw() {
  background(255);
  for(let s of shades){
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

class RotatedBlock {
  constructor(cx, cy, w, h, angle, sweep){
    this.cx = cx;
    this.cy = cy;
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.fill = color(4, 55, 242)
    this.sweep = sweep;
    this.dir = random() > 0.5 ? -1 : 1;
    this.speed = 0.01;
  }

  draw(){
    this.updateAngle();

    push();
    translate(this.cx,this.cy);
    rotate(this.angle);
    fill(this.fill);

    //rect(0, 0, this.w, this.h);
    for(let i = 0; i < this.h; i+=5){
      line(-this.w/2, -this.h/2 + i, this.w/2, -this.h/2 + i);
    }

    pop();
  }

  updateAngle(){
    this.angle += this.speed * this.dir;

    if(this.angle < -this.sweep){
      this.angle = -this.sweep
      this.dir *= -1;
    } else if(this.angle > this.sweep){
      this.angle = this.sweep;
      this.dir *= -1;
    }

  }
}

