let grid = [];

let numCols, numRows


function setup(){
  createCanvas(800, 800);

  numCols = 10;
  numRows = 10;

  let cellSize = width/numCols;

  for(let i = 0; i < numRows; i++){
    let row = [];
    for(let j = 0; j < numCols; j++){
      let x = j * cellSize;
      let y = i * cellSize;
      row.push(new Cell(x, y, cellSize));
    }
    grid.push(row);
  }

}

function draw(){
  background(255);

  for(let row of grid){
    for(let cell of row){
      if(frameCount % 60 == 0){
        cell.type = floor(random(0, 2));
      }
      cell.draw();
    }
  }
}

class Cell {
  constructor(x,y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.filled = false;
    this.type = floor(random(0, 2));
  }

  draw(){
    // rect(this.x, this.y, this.size, this.size);
    strokeWeight(3);

    if(this.type == 0){
      //
      line(this.x, this.y + this.size/2, this.x + this.size/2, this.y + this.size/2); //horiziontal
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size/2, this.y + this.size); //horiziontal
    } else if(this.type == 1){
      line(this.x + this.size/2, this.y, this.x + this.size/2, this.y + this.size/2); //horiziontal
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size, this.y + this.size/2); //horiziontal
    }
  }

}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Agent {
  constructor(startX, startY, startType){
    this.x = startX;
    this.y = startY;
    this.type = startType;
  }

  //check validity etc.

  //update
  update(){
    //move in dpad direction
    //check if the cell
  }
}
