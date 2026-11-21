// currentScript is only set while this file first runs, so grab it at load time
const SKETCH_NAME = document.currentScript.src.split('/').pop().replace('.js', '');
let grids = [];
let cellSize;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  reset();

  strokeWeight(10 * width/800);
  strokeCap(PROJECT);
}

function reset(){
  grids = [];

  let numCols = 30;
  let numRows = 30;
  cellSize = width/numCols;

  let numGrids = 3;

  for(let g = 0; g < numGrids; g++){
    let container = {};
    let grid = [];

    for(let i = 0; i < numRows; i++){
      for(let j = 0; j < numCols; j++){
        if((i + j) % 2 != 0){
          let x = j * cellSize + cellSize/2; //middle
          let y = i * cellSize + cellSize/2; //middle
          let t = random() > 0.5 ? "h" : "v";
          grid.push({x, y, t});
        }
      }
    }

    container.grid = grid;
    container.color = color(random(255), random(255), random(255), 200);

    grids.push(container);
  }
}

function draw() {
  background(255);


  for(let g of grids){
    stroke(g.color); 
    for(let c of g.grid){
      if(c.t == "v"){
        line(c.x, c.y - cellSize, c.x, c.y + cellSize)
      } else {
        line(c.x - cellSize, c.y, c.x + cellSize, c.y)
      }
    }
  }


  if(frameCount % 60 == 0){
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

