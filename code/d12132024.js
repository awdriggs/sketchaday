//inspired by https://americanart.si.edu/artwork/ocean-waves-variation-119505
//horizontal stripe

let cells = []; //a quilt
let color1, color2;

function setup() {
  createCanvas(800, 800);

  let numCells = 6;
  let cellSize = width/numCells;

  let color1 = color("#cda4b8");
  let color2 = color("#558572");
  // let color3 = color(

  //row
  let c = 0; //a counter for the alternating

  for(let i = 0; i < numCells; i++){
    for(let j = 0; j < numCells; j++){
      let state = (c % 2 == 0) ? 1 : -1;

      let cellColor;
      if(state > 0){
        cellColor = color1;
      } else {
        cellColor = color2;
      }

      // print(i * cellSize, j * cellSize);
      // cells.push(new WavePattern(i * cellSize, j * cellSize, cellSize, cellSize, 3, state, cellColor));
      if(state > 0){
        cells.push(new horizontalStripe(i * cellSize, j * cellSize, cellSize, cellSize, 5, 1, ["red", "purple"]));
      } else {
        cells.push(new Stripe(i * cellSize, j * cellSize, cellSize, cellSize, 5, 1, ["red", "purple"]));
      }
      c++;
    }

    if(numCells % 2 == 0){
      c++; //offset by 1 since numCells is even to alterate the color
    }
  }

  noStroke();
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


// function mousePressed() {
//   saveCanvas('d11132024', 'jpg');
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

// Declaration
class WavePattern {
  constructor(ox, oy, w, h, numTris, flip, baseColor) {
    this.ox = ox;
    this.oy = oy;
    this.width = w;
    this.height = h;
    this.numTris = numTris;
    this.flip = flip;
    this.baseColor = baseColor
  }

  draw() {
    this.setColor(); //change the color depending on the state

    fill(this.bgColor);
    rect(this.ox, this.oy, this.width, this.height);

    fill(this.fillColor);

    let b = this.width/this.numTris; //make it exact
    let h = b/2;

    for(let c = this.numTris; c > 0; c--){

      let offset = (this.numTris - c) * b/2;

      let y = offset + this.oy;
      let y1 = offset - this.oy; //for the bottom rows

      //horziontals
      for(let i = 0; i < c; i++){
        let x = b*i - b/2 + this.ox;

        if(i!=0){
          triangle(x + offset, y + h, x + b/2 + offset, y, x + b + offset, y+h);
          triangle(x + offset, this.height - y1 - h, x + b/2 + offset, this.height - y1, x + b + offset, this.height - y1 - h);
        }

      }

      //vertical
      let x = offset + this.ox;
      let x1 = offset - this.ox; //for the right columns

      for(let i = 0; i < c; i++){
        let y = b*i + this.oy;
        triangle(x, y + offset, x + h, y + b/2 + offset, x, y + b + offset);
        triangle(this.width - x1, y + offset, this.width - x1 - h, y + b/2 + offset, this.width - x1, y + b + offset);
      }
    }
  }

  setColor() {
    if(this.flip > 0){
      this.bgColor = this.baseColor;
      this.fillColor = 0;
    } else {
      this.bgColor = 0;
      this.fillColor = this.baseColor;
    }
  }
}

class Stripe {
  constructor(ox, oy, w, h, numStripes, flip, colors) {
    this.ox = ox;
    this.oy = oy;
    this.width = w;
    this.height = h;
    this.numStripes = numStripes;
    this.flip = flip;
    this.colors = colors; //an array of colors
    this.colorIndex = 0;
  }

  draw() {
    this.colorIndex = 0;
    let w = this.width/this.numStripes;
    for(let i = 0; i < this.numStripes; i++){
      let x = this.ox + w * i;
      fill(this.colors[this.colorIndex]);
      rect(x, this.oy, w, this.height);

      this.incrementColor();
    }
      
  }

  incrementColor(){
    this.colorIndex++;
    if(this.colorIndex >= this.colors.length){
      this.colorIndex = 0;
    }
  }
}

class horizontalStripe {
  constructor(ox, oy, w, h, numStripes, flip, colors) {
    this.ox = ox;
    this.oy = oy;
    this.width = w;
    this.height = h;
    this.numStripes = numStripes;
    this.flip = flip;
    this.colors = colors; //an array of colors
    this.colorIndex = 0;
  }

  draw() {
    this.colorIndex = 0;

    let h = this.height/this.numStripes;
    for(let i = 0; i < this.numStripes; i++){
      let y = this.oy + h * i;
      fill(this.colors[this.colorIndex]);
      rect(this.ox, y, this.width, h);

      this.incrementColor();
    }
      
  }

  incrementColor(){
    this.colorIndex++;
    if(this.colorIndex >= this.colors.length){
      this.colorIndex = 0;
    }
  }
}