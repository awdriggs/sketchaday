//img mask vars
let mask, mask1, mask2, bgImage, img, flip;

//bg drawing vars
let numRows, numCols, barHeight, cellWidth, flipFlop;
let bumps, spread;


// Load the image.
function preload() {
  // bgImage = loadImage('bg.jpg');
}

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  reset();

  drawBg();
  makeMasks();
  // bg.resize(width, height);
  img = bgImage.get();
  // img.resize(width, height)
  // makeMasks();
  mask = mask1;
  // noLoop();
  flip = 0;
  noStroke();
}

function draw() {
  // drawBg();
  //background(255);
  img = bgImage.get(); //resets the image

  ////draw original image
  image(img, 0, 0);

  //mask half the image
  img.mask(mask);
  ////invert the image
  img.filter(INVERT);
  ////draw the rest of the image
  image(img,0,0);

  if(frameCount % 30 == 0){
    print('flip');
    flipFlop *= -1;
    drawBg();
    changeMask();
  } 
}

function changeMask() {
  if(flip % 2 == 0){
    mask = mask1;
  } else {
    mask = mask2;
  }

  flip++;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// creates two images mask
function makeMasks(){
  //top mask
  pg = createGraphics(width, height);
  pg.beginShape();
  pg.vertex(0,0);
  pg.vertex(0, height);
  pg.vertex(width, height)
  pg.endShape();
  mask1 = pg.get();

  //bottom mask
  pg = createGraphics(width, height); //reset graphics
  pg.beginShape();
  pg.vertex(0, 0);
  pg.vertex(width, 0);
  pg.vertex(width, height);
  pg.endShape();
  mask2 = pg.get();
}

function drawBg(){
  let bg = createGraphics(width, height);

  bg.background(255);

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let offset = 1 * flipFlop;

      if(i%2==0){
        offset = -1 * flipFlop;
      }

      // stroke(0);
      bg.noStroke();
      bg.fill(0);
      let x = j * cellWidth + cellWidth/2;
      let y = i * barHeight;
      bg.rect(x, y, 20 * offset, barHeight);

      bg.fill(255);

      // wave(x + 20 * offset * -1, y, offset);
      x = x + 20 * offset * -1;
      bg.fill("red");

      bg.beginShape()
      bg.vertex(x,y); //corner of of the wave
      //left facing
      for(let i = 0; i < bumps; i+=2){
        bg.bezierVertex(
          spread + x,
          y + i * spread + spread,
          spread * -1 + x,
          y + i * spread + spread,
          x,
          y+ spread * i + spread * 2
        );
      }

      bg.vertex(x + 20 * offset, y + barHeight);
      bg.vertex(x + 20 * offset, y);

      bg.endShape();

      bgImage = bg.get();


      // stroke("red");
      // line(j * cellWidth, i * barHeight, j * cellWidth, i * barHeight + barHeight);
    }
  }
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
}


