//day 1 draw one one gradient
let gradients = [];

function setup() {
  createCanvas(800, 800);


  noStroke();
}

function draw() {
  background(0);
  blendMode(BLEND);
  background(255);
  // gradient.draw("black");
  // background(0, 255, 100);
  // blendMode(BLEND);
  // blendMode(ADD);
  // blendMode(DARKEST);
  // blendMode(LIGHTEST);
  // blendMode(DIFFERENCE);     //ok
  // blendMode(EXCLUSION);
  // blendMode(MULTIPLY);    //ok
  // blendMode(SCREEN);
  // blendMode(REPLACE);
  // blendMode(OVERLAY);
  blendMode(HARD_LIGHT);  //0k
  // blendMode(SOFT_LIGHT);
  // blendMode(DODGE);
  // blendMode(BURN);
  // blendMode(SUBTRACT);  //ok
  for(let gradient of gradients){
    gradient.update();
    gradient.draw();
  }
}

function reset() {
  gradients = [];

  let numGradients = 3;

  let yOffset = height/numGradients

  for(let i = 0; i < numGradients; i++){
    let chooseColor = color(random(0,255), random(0,255), random(0,255), 10);
    gradient = new Gradient(i * yOffset, height, 100, chooseColor);
    gradients.push(gradient);
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

function mousePressed(){
  reset();
}

class Gradient {
  constructor(y, h, numBars, c){
    this.build(y, h, numBars);
    this.speed = random(0.01, 0.5);
    this.dir = random() > 0.5 ? -1 : 1;
    this.gradient = 255/numBars;
    this.color = c;
    this.max = height/4;
    this.min = height/8;
  }

  build(y, h, numBars){
    this.bars = [];

    let hOffset = h/numBars;

    for(let i = numBars; i > 0; i--){
      let h = i * hOffset;
      this.bars.push({y: y, h: h, min: hOffset, max: h*2});
    }
  }

  draw(c){
    for(let b of this.bars){
      if(c){
        fill(c);
      } else {
        // fill(0, 0, 255, 10);
        fill(this.color);
      }
      rect(0, b.y - b.h/2, width, b.h);
    }
  }

  update(){
    for(let b of this.bars){
      b.h += this.speed * this.dir;
    }

    if(this.bars[0].h > this.max ){
      this.bars[0].h = this.max;
      this.dir *= -1;
    } else if(this.bars[0].h < this.min){
      this.bars[0].h = this.min;
      this.dir *= -1;
    }
  }

}

class Bar {
  constructor(){

  }


}
