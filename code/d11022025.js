let pallette = [];

for(let i = 0; i < 6; i++){
  let step = 2.5;
  let c = 255 - i * step;
  pallette.push(c);
}

let squares = [];
let numRows, numCols;
let numBars;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numCols = 5;
  let numRows = 5;

  numBars = 7;
  let w = width/numCols;
  let h = height/numRows; //square

  //constructor(x, y, w, h, b, s, c){
  for(let i = 0; i < numRows; i++){
    let y = i * h;
    for(let j = 0; j < numCols; j++){
      let x = j * w;
      
      squares.push(new Square(x, y, w, h, numBars, random(w/1000, w/100), pallette));
    }
  }
  noStroke();
}

function draw() {
  background(255);

  for(s of squares){
    s.draw();
    s.updatePosition();
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

class Square {
  constructor(x, y, w, h, b, s, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.numBars = b;
    this.barSize = this.w / this.numBars;
    this.position = random(0, this.w - this.barSize * 2);
    this.dir = random() > 0.5 ? 1 : -1;
    this.stepSize = s;

    this.setColors(c);
  }

  setColors(c){
    let colors = shuffle(c);
    this.bgColor = colors[0];
    this.barColor = colors[1];
    this.leftColor = colors[2];
    this.horizontalColor = colors[3];
  }

  draw(){
    //draw a background
    fill(this.bgColor);
    rect(this.x, this.y, this.w, this.h);
    //horinzontal bar
    fill(this.barColor);
    rect(this.x + this.position, this.y, this.barSize, this.h);
    //////left hand side
    fill(this.leftColor);
    rect(this.x, this.y, this.position, this.h);
    //////horizontal bars
    fill(this.horizontalColor);

    for(let i = 1; i < this.numBars; i+=2){
      rect(this.x, this.y + i * this.barSize, this.w, this.barSize);
    }


  }

  updatePosition(){
    this.position += this.dir * this.stepSize;

    if(this.position < this.barSize){
      this.position = this.barSize;
      this.dir *= -1;
    } else if(this.position > this.w - this.barSize * 2){
      this.position = this.w - this.barSize * 2;
      this.dir *= -1;
    }
  }
}

