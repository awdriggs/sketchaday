//quick version of conways game of life, with some remixes
let universe = [];
let cellSize = 10;

function setup() {
  // createCanvas(300, 300);
  createCanvas(windowWidth, windowHeight);

  //creat the universe
  buildUniverse();
    
}

function draw() {
  background(255);

  showUniverse();
  
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
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3,7)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}