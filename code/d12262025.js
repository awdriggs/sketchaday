let shades = [];
let moireStep = 5;

function setup() {
  createCanvas(800, 800);
  maxSquareSize = width / sqrt(2) * 0.95; //≈ boundingBox * 0.7071
  // createCanvas(windowWidth, windowHeight);
  let numShades = 10;
  for(let i = 0; i < numShades; i++){
    let w = random(maxSquareSize/4, maxSquareSize);
    let h = random(maxSquareSize/4, maxSquareSize);
    // let w = width * 2;
    // let h = height * 2;
    shades.push(new RotatedBlock(random(width * 0.25, width * 0.75), random(height * 0.25, height * 0.75), w, h, 0, random(QUARTER_PI/4, QUARTER_PI)));
  }
  rectMode(CENTER)
}

function draw() {
  background(255);

  //draw base moire
  stroke(0);
  strokeWeight(2);

  // for(let i = 0; i < height; i += moireStep){
  //   line(0, i, width, i);
  // }

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
    this.speed = random(0.005, 0.01);
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
    this.displacementSpeed = random(0.5, 1.5);
  }

  draw(){
    // this.updateAngle();
    this.updateCenter();
    stroke(this.color);
    strokeWeight(2);

    push();
    translate(this.cx,this.cy);
    rotate(this.angle);
    fill(this.fill);

    //rect(0, 0, this.w, this.h);
    for(let i = 0; i < this.h; i+=moireStep){
      line(-this.w/2, -this.h/2 + i, this.w/2, -this.h/2 + i);
    }

    pop();
  }

  updateAngle(){
    this.angle += this.speed * this.dir;

    if(this.angle < -this.sweep){
      this.speed = random(0.005, 0.01);
      this.angle = -this.sweep
      this.dir *= -1;
    } else if(this.angle > this.sweep){
      this.speed = random(0.005, 0.01);
      this.angle = this.sweep;
      this.dir *= -1;
    }
  }

  updateCenter(){ //vertical osicilation
    this.cy+= this.displacementSpeed * this.dir;

    if(this.cy < 0){
      this.displacementSpeed = random(0.5, 1.5);
      this.cy = 0;
      this.dir *= -1;
    } else if(this.cy > height){
      this.displacementSpeed = random(0.5, 1.5);
      this.cy = height;
      this.dir *= -1;
    }
  }
}

