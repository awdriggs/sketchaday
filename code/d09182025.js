let grid = [];
let numCols, numRows;
let spores = [];
let nextGeneration = [];
let cellSize;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols = 100;
  numRows = 100;

  cellSize = width/numCols; //squares


  for(let i = 0; i < numRows; i++){
    let aRow = [];
    for(let j = 0; j < numCols; j++){
      let x = cellSize * j;
      let y = cellSize * i;
      aRow.push(new Cell(x, y, cellSize));
    }
    grid.push(aRow);
  }

  noStroke();

  //start with one spore
  spores.push(new Spore(50, 50, color(0, 255, 0)));
}

function draw() {

  console.log(spores.length);
  background(255);

  // if(frameCount == 1){
  //   saveGif('thumb', 3);
  // }

  for(let r of grid){
    for(let c of r){
      c.draw();
    }
  }

  let update = false
  for(let s of spores){
    //add some random variability here
    if(random() < 0.6){ //move this into spawn! 
      nextGeneration.push(...s.spawn());
      update = true;
    }
  }

  if(update){
    spores = nextGeneration;
    nextGeneration = [];
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

class Cell {
  constructor(x, y, s){
    this.x = x;
    this.y = y;
    this.size = s;
    this.fill = null;
  }

  draw() {
    if(this.fill){
      fill(this.fill);
    } else {
      fill(255);
    }


    rect(this.x, this.y, this.size, this.size);
  }
}

class Spore {
  constructor(hIndex, vIndex, hue) {
    this.hLoc = hIndex;
    this.vLoc = vIndex;
    this.color = hue;
    this.world = grid; //global grid object, maybe you want to pass this in or have more than one in the future
    this.alive = true;
    this.setCelltoFilled(); //immediately claim your cell, now no repeats occpuy the same cell in the same genration
  }

  setCelltoFilled(){
    this.world[this.vLoc][this.hLoc].fill = this.color;
  }

  spawn(){
    //d pad spread
    console.log(this.vLoc, this.hLoc)
    let children = [];
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
    console.log(this.color);

    if(this.hLoc - 1 >= 0 && !this.world[this.vLoc][this.hLoc - 1].fill){
      children.push(new Spore(this.hLoc - 1, this.vLoc, this.color));
    }

    if(this.hLoc + 1 < this.world[this.vLoc].length && !this.world[this.vLoc][this.hLoc + 1].fill){
      children.push(new Spore(this.hLoc + 1, this.vLoc, this.color));
    }

    if(this.vLoc - 1 >= 0 && !this.world[this.vLoc - 1][this.hLoc].fill){
      children.push(new Spore(this.hLoc, this.vLoc - 1, this.color));
    }

    if(this.vLoc + 1 < this.world.length && !this.world[this.vLoc + 1][this.hLoc].fill){
      children.push(new Spore(this.hLoc, this.vLoc + 1, this.color));
    }

    return children;
  }
}