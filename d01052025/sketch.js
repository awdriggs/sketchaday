// let
let blocks = [];
let pW, pH, rows, cols;

function setup() {
  createCanvas(800, 800);

  pW = 50;
  pH = 50;
  let margin = 25;
  let drawingArea = width - 2 * margin - pW * 2;
  rect(margin, 10, drawingArea, 10)
  cols = floor(drawingArea / (pW*2));
  rows = cols * 1.5;
  pW = (drawingArea / cols)/2;//make it exact!
  //why is the spacing not perfect!?
  pH = pW;
  print(drawingArea);
  print(rows, pW);

  for(let i = 0; i < rows; i++){
    if(i % 2 != 0){
      cols--;
    } else {
      cols++;
    }

    for(let j = 0; j < cols; j++){

      let x = j * pW * 2 + margin + pW;
      let y = i * pH * 1.5 + margin * 3;

      if(i % 2 != 0){
        x += pW;
      }

      blocks.push(new Block(x, y, pW, pH, ["#2A2B2E", "#5A5A66", "#A4C2A8"]));
    }
  }
}

function draw() {
  background(255);

  for(let b of blocks){
    b.draw();
  }

  if(random() < 0.05){
    blocks[floor(random(0, blocks.length))].scramble();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Block {
  constructor(x, y, w, h, colors){ //theta, top){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colors = colors; //deep copy bro!
    // this.theta = theta;
    // this.topColor = top;
  }

  draw(){
    //xy is the center
    fill(this.colors[0]);
    stroke(this.colors[0]);
    // triangle(this.x, this.y, this.x - this.w, this.y - this.h/2, this.x, this.y - this.h);
    // triangle(this.x, this.y, this.x + this.w, this.y - this.h/2, this.x, this.y - this.h);
    quad(this.x, this.y, this.x - this.w, this.y - this.h/2, this.x, this.y - this.h, this.x + this.w, this.y - this.h/2);

    fill(this.colors[1]);
    stroke(this.colors[1]);
    // triangle(this.x, this.y, this.x + this.w, this.y - this.h/2, this.x + this.w, this.y + this.h/2);
    // triangle(this.x, this.y, this.x + this.w, this.y + this.h/2, this.x, this.y + this.h);
    quad(this.x, this.y, this.x + this.w, this.y - this.h/2, this.x + this.w, this.y + this.h/2, this.x, this.y + this.h);

    fill(this.colors[2]);
    stroke(this.colors[2]);
    // triangle(this.x, this.y, this.x - this.w, this.y - this.h/2, this.x - this.w, this.y + this.h/2);
    // triangle(this.x, this.y, this.x - this.w, this.y + this.h/2, this.x, this.y + this.h);
    quad(this.x, this.y, this.x - this.w, this.y - this.h/2, this.x - this.w, this.y + this.h/2, this.x, this.y + this.h);
  }

  scramble(){
    this.colors = shuffle(this.colors); 
  }
}
