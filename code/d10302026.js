//after bridget riley
const DEBUG = false;

let serif;
let os = [];
let nGlobal = 0;
let cellSize;
let oOffset;

function preload() {
  // serif = loadFont("https://cdn.jsdelivr.net/gh/google/fonts/ofl/youngserif/YoungSerif-Regular.ttf");
  serif = loadFont("https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/youngserif/YoungSerif-Regular.ttf");
}

function setup() {
  createCanvas(800, 800);
  let numCols = 10;
  let numRows = 10;
  let margin = width/10;
  cellSize = (width - margin * 2)/numCols;

  for(let i = 0; i < numRows; i++){
    let y = i * cellSize + margin;
    for(let j = 0; j < numCols; j++){
      let x = j * cellSize + margin;

      os.push(new O(x, y));
    }
  }

  // createCanvas(windowWidth, windowHeight);
  textFont(serif);
  textSize(cellSize * 1.5);

  let b = serif.textBounds('o', 0, 0, textSize());
  oOffset = createVector(-b.x - b.w / 2, -b.y - b.h / 2);

}

function draw() {
  background(255);

  for(let o of os){
    o.draw();
  }

  nGlobal += 0.001;
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

class O {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.theta = noise(this.x/1000, this.y/1000, nGlobal) * TWO_PI;
  }

  draw() {
    this.theta = noise(this.x/1000, this.y/1000, nGlobal) * TWO_PI;


    if(DEBUG) {
      noFill();
      rect(this.x, this.y, cellSize, cellSize);
    }

    push();
    translate(this.x + cellSize/2, this.y + cellSize/2);
    rotate(this.theta);

    if(DEBUG) {
      fill("red");
      ellipse(0, 0, 10, 10);
    }

    fill(0)
    text('o', oOffset.x, oOffset.y);
    pop();
  }
}

