//Brownian movers
let movers = [];
let w, h;
let numMovers;
let img;

function preload() {
    img = loadImage('assets/images/mona.jpeg');
  }   

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  w = 10;
  h = w;

  img.loadPixels();
  let numRows = img.width;
  let numCols = img.height;
  let cellSize = width/numRows;

  numMovers = 10;
  for(let y = 0; y < numRows; y+=5){
    for(let x = 0; x < numCols; x+=5){
    let pixelFill = img.get(x,y); 
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

  

  // if(frameCount % 30 == 0){
  //   let randomFill = color(random(0, 255), random(0, 255), random(0, 255));
  //   for(let i = 0; i < numMovers; i++){
  //     // let randomFill = color(random(0, 255), random(0, 255), random(0, 255));
  //     movers.push(new BrownMover(width/2, height/2, w, h, randomFill));
  //   }

  //   if(movers.length > numMovers * 10){
  //     movers.splice(0, 10);
  //   }
  // }
}

// function mousePressed(){
//   let numMovers = 100;
//   let randomFill = color(random(0, 255), random(0, 255), random(0, 255));
//   for(let i = 0; i < numMovers; i++){
//     // let randomFill = color(random(0, 255), random(0, 255), random(0, 255));
//     movers.push(new BrownMover(mouseX, mouseY, 10, 10, randomFill));
//   }

// }


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
