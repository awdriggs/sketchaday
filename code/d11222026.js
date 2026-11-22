// currentScript is only set while this file first runs, so grab it at load time
const SKETCH_NAME = document.currentScript.src.split('/').pop().replace('.js', '');
let stack = [];
let cellSize;
let bgColor;
let nextReset = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  reset();

  // strokeWeight(10 * width/800);
  // strokeCap(SQUARE);
}

function reset(){
  nextReset = frameCount + 30 + floor(random() * 60);
  bgColor = color(random(255), random(255), random(255));

  stack.forEach(g => g.remove())

  stack = [];

  let numCols = 15;
  let numRows = 15;
  cellSize = width/numCols;

  let numGrids = 2;

  for(let g = 0; g < numGrids; g++){

    let graphics = createGraphics(width, height);
    graphics.strokeWeight(cellSize * 0.4);
    graphics.stroke(random(255), random(255), random(255));
    graphics.strokeCap(PROJECT);

    let offset = g * cellSize/2;

    for(let i = 0; i < numRows; i++){
      for(let j = 0; j < numCols; j++){
        if((i + j) % 2 != 0){
          let x = j * cellSize + cellSize/2 + offset; //middle
          let y = i * cellSize + cellSize/2 + offset; //middle

          if(random() > 0.5){
            graphics.line(x, y - cellSize, x, y + cellSize)
          } else {

            graphics.line(x - cellSize, y, x + cellSize, y)
          }
        }
      }
    }

    stack.push(graphics);
  }

}


function draw() {
  background(bgColor);

  for(let g of stack){
    tint(255, 200);
    image(g, 0, 0);
  }

  if(frameCount >= nextReset){
    reset();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif(SKETCH_NAME, floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas(SKETCH_NAME, "jpg");
  }
}

