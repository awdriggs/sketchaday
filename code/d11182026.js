//a happy accident
// currentScript is only set while this file first runs, so grab it at load time
const SKETCH_NAME = document.currentScript.src.split('/').pop().replace('.js', '');

let sliders = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  let centerX = width/2;
  let centerY = height/2;

  let numCols = 3;
  let numRows = 3;

  let margin = width/10;

  let cellWidth = (width - margin*2)/numCols;
  let cellHeight = (height - margin*2)/numRows;

  let radius = cellWidth/2 * 0.8;

  for(let i = 0; i < numRows; i++){
    let y = i * cellHeight + cellHeight/2 + margin;
    for(let j = 0; j < numCols; j++){
      let x = j * cellWidth + cellWidth/2 + margin;
      let speed = random(0.001, 0.005);

      sliders.push(new Slider(x, y, speed, radius));
    }
  }

  strokeWeight(10 * width/800)
  strokeCap(PROJECT)
}

function draw() {
  background(255);

  for(let s of sliders){
    s.mouseIn(mouseX, mouseY);
    s.draw();
  }

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif(SKETCH_NAME, floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas(SKETCH_NAME, "jpg");
  }
}

class Slider {
  constructor(cx, cy, speed, radius){
    this.cX = cx;
    this.cY = cy;
    this.speed = speed;
    this.radius = radius;
    // this.angle = random(TWO_PI);
    this.angle = HALF_PI;
  }

  draw(){
    let x1 = this.cX + cos(this.angle) * this.radius * -1
    let y1 = this.cY + sin(this.angle) * this.radius * -1
    let x2 = this.cX + cos(this.angle) * this.radius
    let y2 = this.cY + sin(this.angle) * this.radius

    // debugger;
    line(x1, y1, x2, y2);

  }

  mouseIn(mx, my){
    if(dist(mx, my, this.cX, this.cY) > this.radius){
      this.angle += this.speed;
    }
  }
}

