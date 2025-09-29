//inspired by 3 vertikale steifen Gehard von Graevenitz
let test;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  test = new TurningLine(width/2, height/2, height *2, -PI/6, PI/6, 0.01);
  strokeWeight(5);
}

function draw() {
  background(255);

  test.rotate();
  test.draw();
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

class TurningLine {
  constructor(x, y, length, minAngle, maxAngle, speed){
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = minAngle;
    this.minAngle = minAngle;
    this.maxAngle = maxAngle;
    this.speed = speed;
    this.dir = 1;
  }

  draw(){
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    line(0, - this.length/2, 0, this.length/2);
    pop();
  }

  rotate(){
    if(this.angle > this.maxAngle){
      this.dir *= -1;
      this.angle = this.maxAngle;
    } else if(this.angle < this.minAngle){
      this.dir *= -1;
      this.angle = this.minAngle;
    }
    
    this.angle += this.speed * this.dir; 

  
  }

}


