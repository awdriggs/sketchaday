//inspired by https://americanart.si.edu/artwork/ocean-waves-variation-119505

// let base;
// let flip = 1;
// let numTris = 10;
// let bgColor, fillColor;

let cells = [];

let test;
function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  // b = width/numTris; //make it exact
  // h = b/2;

  let numCells = 4;
  let cellSize = width/numCells;

  //row
  let c = 0; //a counter for the alternating

  for(let i = 0; i < numCells; i++){
    for(let j = 0; j < numCells; j++){
      let state = (c % 2 == 0) ? 1 : -1;
      // print(i * cellSize, j * cellSize);
      cells.push(new WavePattern(i * cellSize, j * cellSize, cellSize, cellSize, 3, state));
      c++;
      // print(c);
    }
    c++; //offset by 1 since numCells is even to alterate the color
  }

  // noLoop();
}

function draw() {
  background(0, 255, 0);
  //if(flip > 0){
  //  bgColor = 255;
  //  fillColor = 0;
  //} else {
  //  bgColor = 0;
  //  fillColor = 255;
  //}

  //background(bgColor);
  //fill(fillColor)

  if(frameCount % 100 == 0){
    for(let c of cells){
      c.flip *= -1;
    }
    console.log("flip");
  }

  for(let c of cells){
    c.draw();
  }
}

// Declaration
class WavePattern {
  constructor(ox, oy, w, h, numTris, flip) {
    this.ox = ox;
    this.oy = oy;
    this.width = w;
    this.height = h;
    this.numTris = numTris;
    this.flip = flip;

    print(this);
  }

  draw() {
    print(this.ox, this.oy);

    this.setColor();

    fill(this.bgColor);
    rect(this.ox, this.oy, this.width, this.height);

    fill(this.fillColor);
    // ellipse(this.ox + this.width/2, this.oy + this.height/2, this.width/2, this.height/2);

    let b = this.width/this.numTris; //make it exact
    let h = b/2;

    for(let c = this.numTris; c > 0; c--){
      // print(this.
      print(c);

      let offset = (this.numTris - c) * b/2;
      // print("offset1", offset);

      let y = offset + this.oy;
      let y1 = offset - this.oy;
      // let y = 0;

      //horziontals
      for(let i = 0; i < c; i++){
        // print("horizontal", i);
        let x = b*i - b/2 + this.ox;

        if(i!=0){
          print("horizontal", i);
          triangle(x + offset, y + h, x + b/2 + offset, y, x + b + offset, y+h);
          print("top", x, y);
          // print(
          triangle(x + offset, this.height - y1 - h, x + b/2 + offset, this.height - y1, x + b + offset, this.height - y1 - h);
          print("bottom", x + offset, this.height - y1 - h);
        }

      }

      //vertical
      let x = offset + this.ox;
      let x1 = offset - this.ox;
      // print("offset2", offset);
      // let x = 0;
      for(let i = 0; i < c; i++){
        // print("vertical", i);
        let y = b*i + this.oy;
        triangle(x, y + offset, x + h, y + b/2 + offset, x, y + b + offset);
        triangle(this.width - x1, y + offset, this.width - x1 - h, y + b/2 + offset, this.width - x1, y + b + offset);
      }
    }

  }

  setColor() {
    if(this.flip > 0){
      this.bgColor = 255;
      this.fillColor = 0;
    } else {
      this.bgColor = 0;
      this.fillColor = 255;
    }
  }
}
