let grid = []; //start grid, perfect square
let numRows, numCols, cellSize
let brokenGrid = []; //1d array

function setup() {
  createCanvas(800, 800);

  numRows = 10;
  numCols = numRows; //square grid
  cellSize = width/numRows;
  
  reset(); //builds the square grid and calls arragne

  noFill();
  strokeWeight(5 * width/800);

}

function draw() {
  background(255);

  //test the grid
  // stroke("red");
  // for(let i = 0; i < grid.length; i++){
  //   for(let j = 0; j < grid[i].length; j++){
  //     let cell = grid[i][j];
  //     rect(cell.x, cell.y, cellSize, cellSize);
  //   }
  // }

  stroke("blue");
  for(let c of brokenGrid){
    rect(c.x, c.y, c.w, c.h);
  }

  // if(frameCount % 60 == 0){
  //   reset();
  // }
}

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

function arrange(){
  for(let i = 0; i < grid.length; i++){
    for(let j = 0; j < grid[i].length; j++){
      let cell = grid[i][j];
      if(!cell.free) continue;

      let canRight = j < numCols - 1 && grid[i][j+1].free;
      let canDown  = i < numRows - 1 && grid[i+1][j].free;

      if(canRight && canDown){
        let dir = random() < 0.5 ? "right" : "down";
        if(dir == "right"){
          brokenGrid.push({x: cell.x, y: cell.y, w: cellSize * 2, h: cellSize});
          cell.free = false; grid[i][j+1].free = false;
        } else {
          brokenGrid.push({x: cell.x, y: cell.y, w: cellSize, h: cellSize * 2});
          cell.free = false; grid[i+1][j].free = false;
        }
      } else if(canRight){
        brokenGrid.push({x: cell.x, y: cell.y, w: cellSize * 2, h: cellSize});
        cell.free = false; grid[i][j+1].free = false;
      } else if(canDown){
        brokenGrid.push({x: cell.x, y: cell.y, w: cellSize, h: cellSize * 2});
        cell.free = false; grid[i+1][j].free = false;
      } else {
        brokenGrid.push({x: cell.x, y: cell.y, w: cellSize, h: cellSize});
        cell.free = false;
      }
    }
  }
}

function reset(){
  grid = [];

  for(let i = 0; i < numRows; i++){
    let row = [];
    let y = cellSize * i;
    for(let j = 0; j < numCols; j++){
      let x = cellSize * j
      row.push({x: x, y: y, free: true});
    }
    grid.push(row);
  }

  brokenGrid = [];
  arrange();
}

