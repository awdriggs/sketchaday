//inspired by 3 vertikale steifen Gehard von Graevenitz

let lines = [];
let boxes = [];
let cellWidth, cellHeight;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numLines = 8;
  let limit = PI/30;

  let numCols = 4;
  let numRows = 4;
  cellWidth = width/numCols;
  cellHeight = height/numRows;

  for(let i = 0; i < numRows; i++){
    let y = i * cellHeight + cellHeight/2;
    for(let j = 0; j < numCols; j++){
      let xOffset = j * cellWidth; 

      boxes.push({x: j * cellWidth, y: y - cellHeight/2});

      for(let k = 0; k < numLines; k++){
        let x = k * cellWidth/numLines + cellWidth/(numLines * 2) + xOffset;
        let startAngle = random(-limit, limit);
        let speed = random(0.002, 0.005);
        let line = new TurningLine(x, y, cellHeight, -limit, limit, speed, startAngle);
        lines.push(line);
      
      }
    }
  }
  strokeWeight(1);
}

function draw() {
  background(255);

  stroke(255, 0, 0);
  // for(let b of boxes){
  //   rect(b.x, b.y, cellWidth, cellHeight);
  // }
  stroke(0);
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
    this.yOffset = this.length * random(-0.5, 0.5);
    this.offsetSpeed = random(0.01, 2);
    this.offsetDir = random() > 0.5 ? -1 : 1;
  }

  draw(){
    push();
    translate(this.x, this.y + this.yOffset);
    rotate(this.angle);
    line(0, - this.length/2 - this.yOffset, 0, this.length/2 - this.yOffset);
    ellipse(0, 0, 2, 2);
     
     
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

    if(this.yOffset > this.length/2){
      this.yOffset = this.length/2;
      this.offsetDir *= -1;
    } else if(this.yOffset < -this.length/2){
      this.yOffset = -this.length/2;
      this.offsetDir *= -1;
    }

    this.yOffset += this.offsetSpeed * this.offsetDir;

    this.angle += this.speed * this.dir;
  }

}


