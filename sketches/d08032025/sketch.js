//smaller inner square with a grid of squares

let margin;
let numCols, numRows;
let innerWidth, innerHeight;
let cellSize, borderSize;
let nValue = 0;
let startX, startY

let noiseSeed1;
let noiseSeed2;
let noiseSeed3;

function setup() {
  createCanvas(800, 800);
  margin = width/6;
  // createCanvas(windowWidth, windowHeight);

  numRows = 10;
  numCols = 10;

  innerWidth = width - 2 * margin;
  innerHeight = height - 2 * margin;

  borderSize = innerWidth / numCols;
  cellSize = borderSize * 0.5;

  noiseSeed1 = random(0, 1000);
  noiseSeed2 = random(0, 1000);
  noiseSeed3 = random(0, 1000);

  startX = width/2 - (numCols * borderSize) / 2;
  startY = height/2 - (numRows * borderSize) / 2;
}

function draw() {
  // background(255);
  background("pink");

  fill(0);
  for(let i = 0; i < numRows; i++){

    noiseSeed(noiseSeed1);
    let yDrift = map(noise(i/10, nValue), 0, 1, -cellSize, cellSize);

    for(let j = 0; j < numCols; j++){

      noiseSeed(noiseSeed2);
      let xDrift = map(noise(j/10, nValue), 0, 1, -cellSize, cellSize);
      // let x = j * borderSize + margin + cellSize/2 + xDrift;
      // let x = (width/2 - borderSize/2) - (j * borderSize+ cellSize/2) + xDrift;
      // let y = i * borderSize + margin + cellSize/2 + yDrift;
      let x = startX + j * borderSize + cellSize / 2 + xDrift;
    let y = startY + i * borderSize + cellSize / 2 + yDrift;

      push();
      translate(x,y);
      noiseSeed(noiseSeed3);
      rotate(map(noise(j/10, i/10, nValue), 0, 1, -TWO_PI, TWO_PI));
      rect(0 - cellSize/2, - cellSize/2, cellSize, cellSize);
      pop();
    }
  }

  nValue += 0.01;
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

