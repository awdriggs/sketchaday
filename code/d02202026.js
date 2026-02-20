// small crosses
let stitches = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numCols = 20;
  let numRows = 20;

  let w = width/numCols;
  let h = height/numRows;

  for(let i = 0; i < numCols; i++){
    let y = i * h;
    for(let j = 0; j < numRows; j++){
      let x = j * w;
      stitches.push(new Stitch(x, y, w, h));
    }
  }

}

function draw() {
  background(255);
  for(let s of stitches){
    s.update();
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

class Stitch {
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.drift = 10;
    this.vOffset = 0; // 
    this.maxV = random(0, this.h/this.drift); //this.vOffset
    this.vDir = -1;
    this.hDir = -1;
    this.hOffset = 0; // random(-this.w/this.drift, this.w/this.drift);
    this.maxH = random(0, this.w/this.drift); //this.hOffset
    this.margin = this.w/8;
    // this.length = this.w - this.margin;
  }

  draw(){
    // fill("blue");
    // stroke(0);
    // rect(this.x, this.y, this.w, this.h)
    //h
    stroke(0);
    line(this.x + this.margin, this.y + this.h/2 + this.vOffset, this.x + this.w - this.margin, this.y + this.h/2 - this.vOffset);
    //v
    line(this.x + this.w/2 + this.hOffset, this.y + this.margin, this.x + this.w/2 - this.hOffset, this.y + this.h - this.margin);
  }

  update(){
    this.hOffset += 0.1 * this.hDir;
    this.vOffset += 0.1 * this.vDir;

    if(this.hOffset > this.maxH){
      this.hOffset = this.maxH;
      this.hDir *= -1;
    } else if(this.hOffset < -this.maxH){
      this.hOffset = -this.maxH;
      this.hDir *= -1;
    }

    if(this.vOffset > this.maxV){
      this.vOffset = this.maxV;
      this.vDir *= -1;
    } else if(this.vOffset < -this.maxV){
      this.vOffset = -this.maxV;
      this.vDir *= -1;
    }

    // if(this.hOffset < this.y + this.w/2 - this.maxH){
    //   this.hOffset = this.y + this.h/2 - this.maxH;
    //   this.dir *= -1;
    // } 

    //else if(this.hOffset > this.x + this.w/2 + this.maxH){
    // //   this.hOffset = this.y + this.w/2 + this.maxH;
    //   this.dir *= -1;
    // }

  }
}
