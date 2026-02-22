//squiggly lineo
let sline;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  sline = new Sline(width/2, height/2, 300, 2, 1);
  sline2 = new Sline(width/2, height/2, 300, 2, 0);
}

function draw() {
  background(255);

  sline.draw();
  sline2.draw();
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
  constructor(x,y, numSegments, segmentLength, type){
    this.cx = x;
    this.cy = y;
    this.numSegments = numSegments;
    this.segmentLength = segmentLength;
    this.nValue = random(0, 1000);
    this.length = this.numSegments * this.segmentLength
    this.type = type; //0 is horizontal, v is vertical
  }

  draw(){

    beginShape();
    stroke(0);
    noFill();
    // line(0, height/2, width, height/2);
    // line(width/2, 0, width/2, height);
    if(this.type == 0){
      for(let i = 0; i < sline.numSegments; i++){
        let xOffset = i * this.segmentLength - this.length/2;
        // let yOffset = noise(i/100, sline.nValue)
        let yOffset = map(noise(i/100, this.nValue, this.cx), 0, 1, -10, 10);
        vertex(this.cx + xOffset, this.cy + yOffset)
      }
    } else if(this.type == 1){
      for(let i = 0; i < sline.numSegments; i++){
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
