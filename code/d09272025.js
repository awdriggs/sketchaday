//inspired by 3 vertikale steifen Gehard von Graevenitz

let lines = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numLines = 3;
  let limit = PI/9.3
  
  for(let i = 0; i < numLines; i++){
    let x = i* width/numLines + width/(numLines * 2); 
    let startAngle = random(-limit, limit);
    let speed = random(0.002, 0.005);
    let line = new TurningLine(x, height/2, height, -limit, limit, speed, startAngle);
    lines.push(line); 
  }
  strokeWeight(8);
}

function draw() {
  background(255);

  for(let l of lines){
    l.rotate();
    l.draw();
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

class TurningLine {
  constructor(x, y, length, minAngle, maxAngle, speed, angle){
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.minAngle = minAngle;
    this.maxAngle = maxAngle;
    this.speed = speed;
    this.dir = random() > 0.5 ? -1 : 1;
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


