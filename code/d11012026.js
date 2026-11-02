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
  let numOs = 200;
  let numRows = 10;
  let margin = width/10;
  let rowHeight = height/numRows;
  // cellSize = width * 0.75
  cellSize = width * 0.75


  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numOs; j++){
      let oFill = 0;
      if(j % 2 == 0) oFill = 255;
      os.push(new O(map(j, 0, numOs, -cellSize, width + cellSize), i * rowHeight + rowHeight/2, oFill));
    }
  }

  // createCanvas(windowWidth, windowHeight);
  textFont(serif);
  textSize(cellSize);

  let b = serif.textBounds('o', 0, 0, textSize());
  oOffset = createVector(-b.x - b.w / 2, -b.y - b.h / 2);

}

function draw() {
  background(255);

  for(let o of os){
    o.draw();
  }

  nGlobal += 0.002;
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
  constructor(x, y, f) {
    this.x = x;
    this.y = y;
    this.theta = noise(this.x/1000, this.y/1000, nGlobal) * TWO_PI;
    // this.theta = random(TWO_PI);
    this.dir = random() > 0.5 ? -1 : 1;
    this.fill = f;
    // this.fill = color(random(255), random(255), random(255));
  }

  draw() {
    this.theta = noise(this.x/1000, this.y/1000, nGlobal) * TWO_PI;
    // this.theta += 0.005 * this.dir;


    if(DEBUG) {
      noFill();
      rect(this.x, this.y, cellSize, cellSize);
    }

    push();
    translate(this.x, this.y + sin(this.theta) * 100);
    rotate(this.theta);

    if(DEBUG) {
      fill("red");
      ellipse(0, 0, 10, 10);
    }

    fill(this.fill)
    text('o', oOffset.x, oOffset.y);
    pop();
  }
}

