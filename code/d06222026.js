let numRows, rowHeight;
let rowWidth;
let rows = [];
let numSegments = 20;
let segmentWidth;
let t = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numRows = 10;
  rowHeight = height/numRows;

  segmentWidth = width/numSegments

  for(let i = 0; i < numRows; i++){
    let y = i * rowHeight;
    rows.push(new DividedRow(y, i, rowHeight));
  }
  stroke(0);
}

function draw() {
  background(255);
  for(let r of rows){
    r.update();
    r.draw();
  }

  t = (t + 0.0007) //% 256; // non-round step, lattice crossings are less regular

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

class DividedRow {
  constructor(y, rowNum, h){
    this.y = y;
    // this.rowOffset = rowNum * 0.0137; // irrational-ish, avoids integer banding
    this.rowOffset = rowNum * 0.5; // or even higher

    this.h =  h;
    this.n = 0;
    //generate the segments
    this.segments = [];
    this.tOffset = rowNum * 0.3;

  }

  update(){
    // this.n += random(-0.01, 0.01);
    // this.n += 0.001;
    this.rowOffset += 0.0005;
    this.segments = [];

    let lastX = 0;
    // for(let i = 0; i < numSegments + 1; i++){
    // let x = noise(i * 0.01, this.rowOffset, t);
    // let x = 0;
    let x = noise(this.rowOffset * 7.3, t) * segmentWidth - segmentWidth;
    this.segments.push(x); // push the start position first

    while(x < width){
      // x = x + noise(this.rowOffset, this.n, t) * segmentWidth ;
      // x = x + noise(x * 0.01, this.rowOffset, t) * segmentWidth;
      x = x + noise(x * 0.01, this.rowOffset, t + this.tOffset) * segmentWidth;

      this.segments.push(x);
      lastX = x;
    }

  }

  draw(){
    // line(0, this.y, width, this.y);
    // stroke(map(this.y, 0, height, 255, 0));

    for(let x of this.segments){
      line(x, this.y, x, this.y + this.h);
    }
  }
}
