let noiseFill = []
let cellSize

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numCols = floor(20 * width/800);
  let numRows = floor(20 * width/800);
  cellSize = width / (numCols + 2);

  let startX = (width - (numCols - 1) * cellSize) / 2;
  let startY = (height - (numRows - 1) * cellSize) / 2;

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let y = i * cellSize + startY + random(cellSize * 0.1, cellSize * 0.3);
      let x = j * cellSize + startX + random(cellSize * 0.1, cellSize * 0.3);

      noiseFill.push({x: x, y: y});
      // polys.push(new Poly(x, y, cellSize * 0.3, floor(random(5, 10))));
    }
  }
  // strokeWeight(12 * width/800);

  // noFill();
  fill(0);
}

function draw() {
  background(255);
  for(let a of noiseFill){
    // a.draw();
    ellipse(a.x, a.y, cellSize * 0.5, cellSize * 0.5);
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

class Area {
  constructor(){

  }

  draw(){

  }

}


