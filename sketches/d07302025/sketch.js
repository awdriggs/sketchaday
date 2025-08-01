//smaller inner square with a grid of squares

let margin;
let numCols, numRows;
let innerWidth, innerHeight;
let cellSize, borderSize;
let nValue = 0;

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
}

function draw() {
  background(255);

  fill(0);
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let x = j * borderSize + margin + cellSize/2;
      let y = i * borderSize + margin + cellSize/2;
      
      push();
      translate(x,y);
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

