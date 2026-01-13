//day 1 draw one one gradient
let gradient;

function setup() {
  createCanvas(800, 800);

  gradient = new Gradient(width/2, height/4, 4);

  noStroke();
}

function draw() {
  background(0);
  blendMode(BLEND);
  background("pink");
  blendMode(ADD);
  // background(255);

  
  gradient.draw();
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

class Gradient {
  constructor(y, h, numBars){
    this.build(y, h, numBars);
  }

  build(y, h, numBars){
    this.bars = [];

    let hOffset = h/numBars;

    for(let i = numBars; i > 0; i--){
      let h = i * hOffset;
      this.bars.push({y: y, h: h, min:h, max: h * 4});
    }
  }

  draw(){
    for(let b of this.bars){
      fill(0, 0, 255, 10);
      rect(0, b.y - b.h/2, width, b.h);
    }
  }

}

class Bar {
  constructor(){

  }
  
   
}
