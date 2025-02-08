//inspired by https://americanart.si.edu/artwork/ocean-waves-variation-119505

let cells = [];

let test;
function setup() {
  createCanvas(800, 800);

  let numCells = 4; //BUG! should be an even number, or alternating won't quite work
  let cellSize = width/numCells;

  //row
  let c = 0; //a counter for the alternating

  for(let i = 0; i < numCells; i++){
    for(let j = 0; j < numCells; j++){
      let state = (c % 2 == 0) ? 1 : -1;
      // print(i * cellSize, j * cellSize);
      cells.push(new WavePattern(i * cellSize, j * cellSize, cellSize, cellSize, 3, state));
      c++;
    }

    c++; //offset by 1 since numCells is even to alterate the color
  }
}

function draw() {
  background(0, 255, 0);

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

function mousePressed() {
  saveCanvas('d12102024', 'jpg');
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
  }

  draw() {
    this.setColor(); //change the color depending on the state

    fill(this.bgColor);
    rect(this.ox, this.oy, this.width, this.height);

    fill(this.fillColor);

    let b = this.width/this.numTris; //make it exact
    let h = b/2;

    for(let c = this.numTris; c > 0; c--){
      print(c);

      let offset = (this.numTris - c) * b/2;

      let y = offset + this.oy;
      let y1 = offset - this.oy; //for the bottom rows

      //horziontals
      for(let i = 0; i < c; i++){
        let x = b*i - b/2 + this.ox;

        if(i!=0){
          print("horizontal", i);
          triangle(x + offset, y + h, x + b/2 + offset, y, x + b + offset, y+h);
          print("top", x, y);
          triangle(x + offset, this.height - y1 - h, x + b/2 + offset, this.height - y1, x + b + offset, this.height - y1 - h);
          print("bottom", x + offset, this.height - y1 - h);
        }

      }

      //vertical
      let x = offset + this.ox;
      let x1 = offset - this.ox; //for the right columns 

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
