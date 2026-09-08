let colorArray = [];
let cells = [];
let numCols, numRows;
let cellWidth, cellHeight;
let channel;
let n = 0;

function setup() {
  createCanvas(800, 800);

  numCols = 100;
  numRows = 1;

  cellWidth = width/numCols;
  cellHeight = height/numRows;

  reset();

  noStroke();
  // createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  // let randomCell = floor(random(cells.length));
  // cells[randomCell].color.levels[channel] = random(100, 255);

  for(let i = 0; i < cells.length; i++){
    let cell = cells[i]
    let r = floor(i / numCols)/100;
    let c = i % numCols/100;

    cell.color.levels[channel] = map(noise(r, c, n), 0, 1, 100, 255);

    fill(cell.color);
    rect(cell.x, cell.y, cell.w, cell.h);
  }

  n += 0.001;
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
