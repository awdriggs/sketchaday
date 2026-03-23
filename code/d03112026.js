//Brownian movers
let movers = [];
let w, h;
let numMovers;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  w = 10;
  h = w;

  numMovers = 100;
  let randomFill = color(random(0, 255), random(0, 255), random(0, 255));
  for(let i = 0; i < numMovers; i++){
    // let randomFill = color(random(0, 255), random(0, 255), random(0, 255));
    movers.push(new BrownMover(width/2, height/2, w, h, randomFill));
  }

  noStroke();
}

function draw() {
  background(255);
  for(let mover of movers){
    mover.move();
    mover.draw()
  }

  if(frameCount % 30 == 0){
    let randomFill = color(random(0, 255), random(0, 255), random(0, 255));
    for(let i = 0; i < numMovers; i++){
      // let randomFill = color(random(0, 255), random(0, 255), random(0, 255));
      movers.push(new BrownMover(width/2, height/2, w, h, randomFill));
    }

    if(movers.length > numMovers * 10){
      movers.splice(0, 100); 
    }
  }
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
      this.x += this.w;
      if(this.x >= width) {
        this.x = width - this.w;
      }
    } else if(dir == 1){
      this.y += this.h;
      if(this.y >= height){
        this.y = height - this.h;
      }
    } else if(dir == 2){
      this.x -= this.w;
      if(this.x <= 0){
        this.x = this.w;
      }
    } else if(dir == 3){
      this.y -= this.h;
      if(this.y <= 0){
        this.y = this.h;
      }
    }
  }

  draw() {
    fill(this.color);
    rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h)
  }
}
