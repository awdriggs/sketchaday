//quick version of conways game of life, with some remixes
let universe = [];
let cellSize = 10;
let looping = true;
let population;

function setup() {
  // createCanvas(300, 300);
  createCanvas(windowWidth, windowHeight);
  noStroke();


  //ui
  let uiStartY = 40;
  population = createSlider(0, 50, 5);
  population.size(100);
  population.position(10, uiStartY);
  // Create a button and place it beneath the canvas.
  let bigbang = createButton('randomly seed');
  bigbang.position(10, uiStartY + 30);
  bigbang.mousePressed(buildUniverse);

  let run = createButton('start/stop');
  run.position(10, uiStartY +  60);
  //toggle universe updates on/off
  run.mousePressed(() => {
    if(looping){
      looping = false;
    } else {
      looping = true;
    }
  });

  let clear = createButton('clear');
  clear.position(10, uiStartY + 90);
  clear.mousePressed(clearUniverse);
  frameRate(10);

    //create the universe
  buildUniverse();
}

function draw() {
  background(0);

  noStroke();
  showUniverse(); //show the current universe

  if(looping){
    universe = updateUniverse(); //update the universe for the next generation
  }
  //if it is the first gen, start the gif
  // if(frameCount == 1){
  //   saveGif('conway', 5);
  // }
  stroke(255);
  fill(255);
  text("population size", 10, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buildUniverse();
}

function mousePressed() {
  //calculate what cell the mouse loction is in
  //toggle that cell on off
  toggleCell();
}

function mouseDragged() {
  toggleCell();
}

//custom functions
function toggleCell() {
  let cellX, cellY;
  cellX = floor(mouseX/cellSize);
  cellY = floor(mouseY/cellSize);

  let cellValue = universe[cellX][cellY];

  if(cellValue == 1){
    cellValue = 0;
  } else {
    cellValue = 1;
  }

  universe[cellX][cellY] = cellValue; //save the new value


}

function clearUniverse() {
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

}

function buildUniverse() {
  clearUniverse();
  
  //seed
  let percent = population.value() / 100;
  let numCols = universe.length;
  let numRows = universe[0].length;
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
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
      // ellipse(i * cellSize + cellSize/2, j * cellSize + cellSize/2, cellSize, cellSize);
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

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3,7)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}