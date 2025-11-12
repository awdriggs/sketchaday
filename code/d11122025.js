//inspired by Richard Paul Lohse, four equal groups
//seen in Basel Switzerland in October 2025

let grid = [];
let numCols, numRows;
let cellSize;

let colColors, rowColors;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols = 10;
  numRows = 10;
  cellSize = width/numCols;

  colColors = [color('#9C5483'), color('#425116')];
  rowColors = [color('#C1431C'), color('#186675')];


  grid = buildGrid();

  noStroke();
}

function draw() {
  background(255);

  for(let c of grid){
    fill(c.fill);
    rect(c.x, c.y, c.w, c.h);
  }

  if(frameCount % 60 == 0){
    console.log(frameCount);
    if(random() > 0.7){
      grid = buildGrid(); 
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
        fill: selectColor(i, j)
      }

      grid.push(cell);

    }
  }

  return grid;
}


function selectColor(rowIndex, columnIndex){
  //vertical stripes
  let colorToReturn;

  let colColor;

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

  //randomly choose between the rowColor and the columnColor

  if(random() > rowIndex/numRows){ //gets closer and colser to 1
    colorToReturn = rowColor;
  } else {
    colorToReturn = colColor;
  }

  return colorToReturn;
}
