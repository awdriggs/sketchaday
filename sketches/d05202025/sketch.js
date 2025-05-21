let numRows, numCols, cellWidth, cellHeight;
let nx = 0, ny = 0, nt = 0; //time value for noise


function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numRows = 20;
  numCols = 20;
  cellWidth = width/numCols;
  cellHeight = height/numRows;
   
}

function draw() {
  background(255);

  for (let i = -1; i < numRows + 1; i++) {
    for (let j = -1; j < numCols + 1; j++) {
      let origin = createVector(j * cellWidth + cellWidth/2, i * cellHeight + cellHeight/2);

      let angle = noise(j * 0.1, i * 0.1, nt) * TWO_PI;
      let radius = map(noise(j * 0.1 + 99, i * 0.1 + 99, nt), 0, 1, 0, cellWidth/2); // displacement

      let offset = p5.Vector.fromAngle(angle).mult(radius);
      let displaced = p5.Vector.add(origin, offset);

      ellipse(displaced.x, displaced.y, cellWidth / 2, cellHeight / 2);
    }
  }

  nt += 0.01;
}


// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

