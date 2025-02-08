let numRows, numCols, barHeight, cellWidth, flipFlop;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  reset();
}

function draw() {
  background(255);

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let offset = 1 * flipFlop;

      if(i%2==0){
        offset = -1 * flipFlop;
      }

      stroke(0);
      fill(0);
      rect(j * cellWidth + cellWidth/2, i * barHeight, 20 * offset, barHeight);

      // stroke("red");
      // line(j * cellWidth, i * barHeight, j * cellWidth, i * barHeight + barHeight);
    }
  }

  if(frameCount % 30 == 0){

    print("flip");
    flipFlop *= -1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  reset();
}

function reset(){
  numCols = 4;
  barHeight = 160; //starting height,
  cellWidth = 60;

  numRows = floor(height/barHeight);
  numCols = floor(width/cellWidth);
  console.log(numRows);
  barHeight = height/numRows; //make it exact
  cellWidth = width/numCols; //make it exact

  flipFlop = 1;

}
