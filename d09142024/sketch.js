
//quick version of conways game of life, with some remixes
let universe = [];
let cellSize = 10;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //creat the universe
  buildUniverse();

   // Create a button and place it beneath the canvas.
  let button = createButton('big bang');
  button.position(10, 10);

  // Call repaint() when the button is pressed.
  button.mousePressed(buildUniverse);

  frameRate(10);

}

function draw() {
  background(0);

  showUniverse(); //show the current universe
  universe = updateUniverse(); //update the universe for the next generation

  //if it is the first gen, start the gif
  // if(frameCount == 1){
  //   saveGif('conway', 5);
  // }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buildUniverse();
}


function buildUniverse() {
  universe = [];

  let numCols = floor(windowWidth / cellSize);
  let numRows = floor(windowHeight / cellSize);
  for(let i = 0; i < numCols; i++){
    let row = [];
    for(let j = 0; j < numRows; j++){
      row.push(0);
    }
    universe.push(row);
  }

  //seed
  let percent = 0.05;
  let numSeeds = floor(numCols * numRows * percent);
  print(numSeeds);
  for(let i = 0; i < numSeeds; i++){
    let c = floor(random(0, numCols));
    let r = floor(random(0, numRows));

    universe[c][r] = 1;
  }
}

function showUniverse() {
  for(let i = 0; i < universe.length; i++){
    for(let j = 0; j < universe[i].length; j++){
      fill(universe[i][j] * 255);
      // rect(i * cellSize, j * cellSize, cellSize, cellSize);
      ellipse(i * cellSize + cellSize/2, j * cellSize + cellSize/2, cellSize, cellSize);
    }
  }
}

function updateUniverse() {
  // let nextUniverse = universe.slice(); //creates a shallow copy of the universe, creates the invasion pattern
  let nextUniverse = universe.map(arr => [...arr]); //deep copy, classic conway

  //go to every cell
  for(let i = 0; i < universe.length; i++){
    for(let j = 0; j < universe[i].length; j++){
      nextUniverse[i][j] = getNextGenOfCell(i, j);
    }
  }

  return nextUniverse;

  //go every cell
  //count the neighbors
  //if cell is alive, and has 2 or 3 neigbors, it lives

  //if neighbors < 2, cell dies
  //if neightbors > 3, the cell dies
  //if
  //dead cell, if nieghbors == 3, the cell is alive

}

function getNeighbors(x, y){
  let count = 0;
  //for edge casing, only look at cells bounds
  for(let i = max(0, x - 1); i <= min(x + 1, universe.length - 1);  i++) {
    for(let j = max(0, y -1); j <= min(y + 1, universe[i].length - 1); j++){
      if(! (i == x && j == y)){ //don't count yourself
        count += universe[i][j]; //add the cell to the population
      }
    }
  }
  return count;
}

function getNextGenOfCell(x, y) {
  let thisCell = universe[x][y]; //current value at cell;
  let count = getNeighbors(x,y); //count the neighbors

  if(thisCell == 1){ //curent cell is alive
    if(count < 2 || count > 3){ //to lonely or too crowded
      thisCell = 0;
    }
  } else { //curent cell is dead
    if(count == 3){
      thisCell = 1; //dead cell with three live neighbors is regenerated
    }
  }

  return thisCell;
}

