//inspired by 3 vertikale steifen Gehard von Graevenitz

let lines = [];
let boxes = [];
let cellWidth, cellHeight;
let numLines;
let innerWidth

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numLines = 4;
  let limit = PI/30;

  let numCols = 10;
  let numRows = 10;
  cellWidth = width/numCols;
  cellHeight = height/numRows;

  innerWidth = cellWidth/numLines;

  for(let i = 0; i < numRows; i++){
    let y = i * cellHeight + cellHeight/2;
    for(let j = 0; j < numCols; j++){
      let xOffset = j * cellWidth;

      boxes.push({x: j * cellWidth, y: y - cellHeight/2});

      for(let k = 0; k < numLines; k++){
        let x = k * cellWidth/numLines + cellWidth/(numLines * 2) + xOffset;
        let startAngle = random(-limit, limit);
        //let speed = random(0.002, 0.005);
        let speed = 0;
        let line = new TurningLine(x, y, cellHeight, -limit, limit, speed, startAngle);
        lines.push(line);

      }
    }
  }
  strokeWeight(1);
}

function draw() {
  background(255);

  // for(let b of boxes){
  //   rect(b.x, b.y, cellWidth, cellHeight);
  // }
  for(let l of lines){
    l.rotate();
    l.draw();
    l.mouseState();
  }

  noStroke();
  fill(200);
  ellipse(mouseX, mouseY, 10, 10);

  console.log(lines[0]);
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
    // this.offsetSpeed = random(0.01, 2);
    this.offsetSpeed = 0;
    this.offsetDir = random() > 0.5 ? -1 : 1;
    // this.testColor = color(random(0, 255), random(0, 255), random(0, 255));
    this.mouseIn = false; //for chekcing mmouse status
  }

  draw(){
    push();
    translate(this.x, this.y + this.yOffset);
    rotate(this.angle);
    stroke(0);
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

  mouseState(){
    let previousState = this.mouseIn;

    //using globals here
    // if(mouseX > this.
    // stroke(this.testColor);
    // noFill();
    // rect(this.x - innerWidth/2, this.y - this.length/2, innerWidth, cellHeight);
    let left = this.x - innerWidth/2;
    let right = left + innerWidth;
    let top = this.y - this.length/2;
    let bottom = top + cellHeight;
    // debugger;

    if(mouseX > left && mouseX < right && mouseY > top && mouseY < bottom){
      this.mouseIn = true;
    } else {
      this.mouseIn = false;
    }

    // debugger;
    //if(previousState == true && this.mouseIn == false){
    //  //mouse was in and left
    //  // this.speed = random(0.002, 0.005);
    //  // this.offsetSpeed = random(0.01, 2);
    //  this.speed = 0;
    //  this.offsetSpeed = 0;
    //} else

    if(this.mouseIn == true && previousState == false){
      // this.speed = random(0.002, 0.005);
      // this.offsetSpeed = random(0.01, 2);
      // record the frame when the mouse entered
      this.framesInStart = frameCount;
      this.speed = 0;
      this.offsetSpeed = 0;
      
    } else if(this.mouseIn == false && previousState == true){
      //stop counting frames
      let numFrames = frameCount - this.framesInStart;

      //calculate speed
      //this width / num of frames in took to enter and exit. small numbers will be faster, so divide by the small number to make it faster
      // this.speed  = 0.01/numFrames  
      this.speed = 0.01 / Math.pow(numFrames, 0.3)
      // this.offsetSpeed = 2/numFrames
      this.offsetSpeed = 2 / Math.pow(numFrames, 0.3)

    } else if(this.mouseIn == false){ //was in but left

      //sttart slow down
      this.speed -= 0.00005;
      this.offsetSpeed -= 0.005;

      if(this.speed < 0){
        this.speed = 0;
      }

      if(this.offsetSpeed < 0){
        this.offsetSpeed = 0;
      }


    }

    // debugger;
  }
}


