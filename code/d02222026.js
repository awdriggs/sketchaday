//squiggly lineo
let slines = [];


function setup() {
  createCanvas(800, 800);


  let numCols = 20;
  let numRows = 20;
  let cellW = width/numCols;
  let cellH = height/numRows;
  let hLen = cellW * 0.9;
  let vLen = cellH * 0.9;

  for(let i = 0; i < numRows; i++){
    let cy = i * cellH + cellH/2;
    
    for(let j = 0; j < numCols; j++){
    let cx = j * cellW + cellW/2;
      slines.push(new Sline(cx, cy, hLen, hLen, 1));
      slines.push(new Sline(cx, cy, vLen, hLen, 0));
    }
  }


  rectMode(CENTER);
  // createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  for(let s of slines){
    // rect(s.cx, s.cy, s.length, s.length);
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

class Sline {
  constructor(x,y, len, numSegments, type){
    this.cx = x;
    this.cy = y;
    this.numSegments = numSegments;
    this.length = len;
    this.segmentLength = this.length/this.numSegments;
    this.nValue = random(0, 1000);
    this.type = type; //0 is horizontal, v is vertical
  }

  draw(){

    beginShape();
    stroke(0);
    noFill();
    // line(0, height/2, width, height/2);
    // line(width/2, 0, width/2, height);
    if(this.type == 0){
      for(let i = 0; i < this.numSegments; i++){
        let xOffset = i * this.segmentLength - this.length/2;
        // let yOffset = noise(i/100, sline.nValue)
        let yOffset = map(noise(i/100, this.nValue, this.cx), 0, 1, -10, 10);
        vertex(this.cx + xOffset, this.cy + yOffset)
      }
    } else if(this.type == 1){
      for(let i = 0; i < this.numSegments; i++){
        let yOffset = i * this.segmentLength - this.length/2;
        // let yOffset = noise(i/100, sline.nValue)
        let xOffset = map(noise(this.nValue, i/100, this.cy), 0, 1, -10, 10);
        vertex(this.cx + xOffset, this.cy + yOffset)
      }
    }
    endShape(OPEN);

    this.nValue += 0.001;
  }
}
