let numRows, numCols, barHeight, cellWidth, flipFlop;
let bumps, spread;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  noStroke();
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

      // stroke(0);
      fill(0);
      let x = j * cellWidth + cellWidth/2;
      let y = i * barHeight;
      rect(x, y, 20 * offset, barHeight);
      
      fill(255);
      wave(x + 20 * offset * -1, y, offset);

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

  //wave setup
  bumps = 6;
  spread = barHeight/bumps;
}

function wave(x, y, dir) {
  //testing!
  // beginShape()
  // vertex(x,y+20); //corner of of the wave
  // vertex(x -  10 * dir, y+20);
  // endShape();
  fill("red");

  beginShape()
  vertex(x,y); //corner of of the wave
  //left facing
  for(let i = 0; i < bumps; i+=2){
    bezierVertex(
      spread + x,
      y + i * spread + spread,
      spread * -1 + x,
      y + i * spread + spread,
      x,
      y+ spread * i + spread * 2
    );
  }

  vertex(x + 20 * dir, y + barHeight);
  vertex(x + 20 * dir, y);

  endShape();
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}