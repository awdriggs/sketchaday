let waves = [];
let space;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numCols = 10;
  let numRows = 50;

  let rowHeight = height/numRows
  let colWidth = width/numCols

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      waves.push(new straightWave(j * colWidth, i * rowHeight + rowHeight/2, colWidth, rowHeight))
    }
  }
  let lineThickness = width/80;
  strokeWeight(lineThickness);
  space =  lineThickness/2 + 2;
}

function draw() {
  background(255);

  for(let w of waves){
    w.draw()
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

class straightWave {
  constructor(cx, cy, w, h){
    this.cx = cx;
    this.cy = cy;
    this.angle = random(0, TWO_PI);
    this.h = h;
    this.w = w;
    //this is a mistake, but you are keeping it for today! later change the height cy - this.h/2 and cy + this.h/2
    this.p1 = createVector(this.cx + sin(this.angle) * this.w/2 + this.w/2 - space, this.cy);
    this.p2 = createVector(this.cx + cos(this.angle) * this.w/2 + this.w/2 - space, this.cy);
    this.speed = random(0.01 , 0.04)
  }

  draw(){
    this.angle += this.speed;
    this.p1.x = this.cx + sin(this.angle) * (this.w/2-space) + this.w/2;
    this.p2.x = this.cx + cos(this.angle) * (this.w/2-space) + this.w/2;
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);

    if(random() < 0.0001){
      console.log('changing speed');
      this.speed = random(0.01 , 0.04)
    }
  }
}

