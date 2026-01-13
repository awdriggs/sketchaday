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
  background(255);
  gradient.update();
  // gradient.draw("black");
  background(0, 255, 100);
  blendMode(ADD);
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
    this.speed = 0.1;
    this.dir = 1;
    this.gradient = 255/numBars;
  }

  build(y, h, numBars){
    this.bars = [];

    let hOffset = h/numBars;

    for(let i = numBars; i > 0; i--){
      let h = i * hOffset;
      this.bars.push({y: y, h: h, min:h/2, max: h*2});
    }
  }

  draw(c){
    for(let b of this.bars){
      if(c){
        fill(c);
      } else {
        fill(0, 0, 255, 10);
      }
      rect(0, b.y - b.h/2, width, b.h);
    }
  }

  update(){
    for(let b of this.bars){
      b.h += this.speed * this.dir;

      if(b.h > b.max){
        b.h = b.max;
        this.dir *= -1;
      } else if(b.h < b.min){
        b.h = b.min;
        this.dir *= -1;
      }
    }
  }

}

class Bar {
  constructor(){

  }
  
   
}
