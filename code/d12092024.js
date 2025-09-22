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
  // noStroke();
  let numCells = 10;
  let cellSize = width/numCells;

  //row
  let c = 0; //a counter for the alternating
  for(let i = 0; i < numCells; i++){
    for(let j = 0; j < numCells; j++){
      let state = (c%2==0) ? 1 : -1;
      cells.push(new WavePattern(i * cellSize, j * cellSize, cellSize, cellSize, 1, state));
      c++;
      print(c);
    }
    c++; //offset by 1 since numCells is even to alterate the color
  }
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


  //for(let c = numTris; c > 0; c--){
  //  let offset = (numTris - c) * b/2;

  //  let y = offset;
  //  // let y = 0;
  //  //horziontal
  //  for(let i = 0; i < c; i++){
  //    let x = b*i - b/2;

  //    if(i!=0){
  //      triangle(x + offset, y + h, x + b/2 + offset, y, x + b + offset, y+h);
  //      triangle(x + offset,height - y - h, x + b/2 + offset, height - y, x + b + offset, height - y-h);
  //    }

  //  }
  //  //vertical
  //  let x = offset;
  //  // let x = 0;
  //  for(let i = 0; i < c; i++){
  //    let y = b*i;
  //    triangle(x, y + offset, x + h, y + b/2 + offset, x, y + b + offset);
  //    triangle(width - x, y + offset, width - x - h, y + b/2 + offset,width - x, y + b + offset);
  //  }
  //}

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
//   saveCanvas('d12092024', 'jpg');
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
  constructor(ox, oy, w, h, numTris, flip) {
    this.ox = ox;
    this.oy = oy;
    this.width = w;
    this.height = h;
    this.numTris = numTris;
    this.flip = flip;
  }

  draw() {
    this.setColor();
    fill(this.bgColor);
    rect(this.ox, this.oy, this.width, this.height);
    fill(this.fillColor);
    ellipse(this.ox + this.width/2, this.oy + this.height/2, this.width/2, this.height/2);
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