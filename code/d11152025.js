//inspired by Richard Paul Lohse, four equal groups
//seen in Basel Switzerland in October 2025

let grid = [];
let numCols, numRows;
let cellSize;

let colColors, rowColors;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols = width/2;
  numRows = height/2;
  cellSize = width/numCols;

  colColors =  [color("#134611"), color("#3e8914")]
  rowColors =  [color("#3da35d"),color("#96e072")]
  // rowColors = [color("black"), color("white")];


  grid = buildGrid();

  noStroke();
  // noLoop();
   
   
}

function draw() {
  background(255);

  for(let c of grid){
    fill(c.fill);
    rect(c.x, c.y, c.w, c.h);
  }

  if(frameCount % 30 == 0){
    console.log(frameCount);
    if(random() > 0.8){ //flip all
      grid = buildGrid();
    } else { //choose a random cell to change

      for(let i = 0; i < 100; i++){
        let c = grid[floor(random(grid.length))];
        c.dir = flipDir(c.dir); //flip it
        c.fill = selectColor(c.rIndex, c.cIndex, c.dir);
      }
    }
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

function mousePressed(){
  //see which cell was cclicked
  for(let c of grid){
    if(mouseX > c.x && mouseX < c.x + c.w && mouseY > c.y && mouseY < c.y + c.h){
      console.log("cell pressed");

      c.dir = flipDir(c.dir); //flip it
      c.fill = selectColor(c.rIndex, c.cIndex, c.dir);
      break
    }
  }

  console.log("done checking");
}

function flipDir(dir){
  if(dir == "col"){
    return "row";
  } else {
    return "col";
  }
}

function buildGrid(){
  let grid = [];

  for(let i = 0; i < numRows; i++){
    let y = i * cellSize;
    for(let j = 0; j < numCols; j++){
      let x = j * cellSize;

      let cell = {
        x: x,
        y: y,
        w: cellSize,
        h: cellSize,
        dir: setDir(i, j),
        fill: selectColor(i, j, this.dir),
        rIndex: i,
        cIndex: j
      }

      grid.push(cell);

    }
  }

  return grid;
}


function setDir(rowIndex, columnInex){

  //randomly choose between the rowColor and the columnColor
  if(random() > rowIndex/numRows){ //gets closer and colser to 1
    dir = "row"
  } else {
    dir = "col"
  }

  return dir;

}

function selectColor(rowIndex, columnIndex, dir){
  //dir will either be "col" or "row"

  let colorToReturn;

  let colColor, rowColor;

  if(columnIndex % 2 == 0){
    colColor = colColors[0];
  } else {
    colColor = colColors[1];
  }

  if(rowIndex % 2 == 0){
    rowColor = rowColors[0];
  } else {
    rowColor = rowColors[1];
  }

  // colorToReturn = colColor;
  // colorToReturn = rowColor;

  if(dir == "row"){
    colorToReturn = rowColor;
  } else {
    colorToReturn = colColor;
  }

  return colorToReturn;
}
