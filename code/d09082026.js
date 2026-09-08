let colorArray = [];
let cells = [];
let numCols, numRows;
let cellWidth, cellHeight;
let channel;
let n = 0;
// let hue, sat, bri;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  noStroke();

  numCols = 10;
  numRows = 10;

  cellWidth = width/numCols;
  cellHeight = height/numRows;

  reset();

  // createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  // let randomCell = floor(random(cells.length));
  // cells[randomCell].color.levels[channel] = random(100, 255);

  for(let i = 0; i < cells.length; i++){
    let cell = cells[i]
    let r = floor(i / numCols)/10;
    let c = i % numCols/10;

    // cell.color.levels[channel] = map(noise(r, c, n), 0, 1, 100, 255);

    cell.s = map(noise(r, n), 0, 1, 20, 100);
    cell.b = map(noise(c, n + 100), 0, 1, 30, 100);

    fill(cell.hue, cell.s, cell.b);
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
  cells = []
  // colorArray[0] = random(360);
  hue = random(360);

  for(let i = 0; i < numRows; i++){
    let y = i * cellHeight;
    for(let j = 0; j < numCols; j++){
      let x = j * cellWidth;
      let sat = map(noise(i/10, n), 0, 1, 20, 100);
      let bri = map(noise(j/10, n + 100), 0, 1, 30, 100);
      // colorArray[1] = random(100);
      // colorArray[2] = random(100)
      cells.push({x, y, w: cellWidth, h: cellHeight, hue, s: sat, b: bri});
    }
  }
}
