let colorArray = [];
let cells = [];
let numCols, numRows;
let cellWidth, cellHeight;
let channel;

function setup() {
  createCanvas(800, 800);

  numCols = 10;
  numRows = 10;

  cellWidth = width/numCols;
  cellHeight = height/numRows;

  reset();

  noStroke();
  // createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  let randomCell = floor(random(cells.length));
  cells[randomCell].color.levels[channel] = random(100, 255);

  for(let c of cells){

    fill(c.color);
    rect(c.x, c.y, c.w, c.h);
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
  reset();
}

function reset(){
  colorArray[0] = random(50, 255);
  colorArray[1] = random(50, 255);
  colorArray[2] = random(50, 255);

  //which channel will be random?
  channel = floor(random(3));

  for(let i = 0; i < numRows; i++){
    let y = i * cellHeight;
    for(let j = 0; j < numCols; j++){
      let x = j * cellWidth;
      colorArray[channel] = random(100, 255);
      cells.push({x, y, w: cellWidth, h: cellHeight, color: color(colorArray)});
    }
  }
}
