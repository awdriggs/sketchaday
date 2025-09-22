let nx = 0, ny = 0, nz = 0;
let numCols, numRows;
let sqSize;
let offset = 0.01;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numCols = 100;
  numRows = 100;

  sqSize = width/numCols;
  noStroke();
}

function draw() {
  background(255);

  ny = 0 + offset;
  for(let i = 0; i < numRows; i++){
    nx = 0 - offset; 
    for(let j = 0; j < numCols; j++){
      
      // fill(map(noise(nx,ny, nz), 0, 1, 0, 255));
      if(noise(nx,ny,nz)>0.5){
        fill(255);
      } else {
        fill(0);
      }

      rect(j * sqSize, i * sqSize, sqSize, sqSize);

      nx += 0.01
    }

    ny += 0.01;
  }

  nz += 0.001;
  offset += 0.001;

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 7);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}