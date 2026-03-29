//Brownian movers
let movers = [];
let w, h;
let numMovers;
let img;

let bg; //var for background image

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  w = 10;
  h = w;

  makeBgImage();

  bg.loadPixels();
  let numRows = bg.width;
  let numCols = bg.height;
  let cellSize = width/numRows;

  numMovers = 10;
  for(let y = 0; y < numRows; y++){
    for(let x = 0; x < numCols; x++){
      let pixelFill = bg.get(x,y);
      for(let i = 0; i < numMovers; i++){
        // let randomFill = color(random(0, 255), random(0, 255), random(0, 255));
        movers.push(new BrownMover(x * cellSize + cellSize/2, y * cellSize + cellSize/2, w, h, pixelFill));
      }
    }
  }

  noStroke();
}

function draw() {
  // background(255);
  for(let mover of movers){
    mover.move();
    mover.draw()
  }
}

function makeBgImage(){
  // Create a p5.Graphics object.
  bg = createGraphics(100, 100);

  // Draw to the p5.Graphics object.
  bg.background(255);
   
  let numCols = 10;
  let numRows = 10;

  let cellSize =  bg.width/numCols;  

  bg.fill(0);
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      bg.ellipse(j * cellSize + cellSize/2, i * cellSize + cellSize/2, cellSize * 0.8, cellSize * 0.8); 
    }
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class BrownMover {
  constructor(x,y,w,h,c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = c;
  }

  move() {
    let dir = floor(random(0, 4));

    if(dir == 0){
      this.x += this.w/10;
      if(this.x >= width) {
        this.x = width - this.w;
      }
    } else if(dir == 1){
      this.y += this.h/10;
      if(this.y >= height){
        this.y = height - this.h;
      }
    } else if(dir == 2){
      this.x -= this.w/10;
      if(this.x <= 0){
        this.x = this.w;
      }
    } else if(dir == 3){
      this.y -= this.h/10;
      if(this.y <= 0){
        this.y = this.h;
      }
    }
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.w, this.h)
  }
}
