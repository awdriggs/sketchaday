let numRows, numCols, barHeight, cellWidth, flipFlop;
let bumps, spread;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  reset(); //sets the vars for drawing the background

  drawBg(); //draws the background design
  makeMasks(); //creates the mask graphics
  img = bgImage.get(); //set the image to the background image, keeping the original pure
  mask = mask1; //set the mask to start with

  flip = 0; //changes the mask
  noStroke();
  // noLoop();
}

function draw() {
  img = bgImage.get(); //resets the image

  //draw original image
  image(img, 0, 0);

  //mask part of the image
  img.mask(mask);
  //invert the unmasked part of the image
  img.filter(INVERT);
  //draw the inverted portion 
  image(img,0,0);

  if(frameCount % 30 == 0){
    print('flip');
    flipFlop *= -1;
    drawBg(); //will flip the direction of the bg design, reset bgImage
    changeMask(); //will flip to the next map
  } 
}

function changeMask() {
  //cycle between two masks
  if(flip % 2 == 0){
    mask = mask1;
  } else {
    mask = mask2;
  }

  flip++; //change flip for next time
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// creates two images mask
function makeMasks(){
  //using create graphics creates a off screen drawing context
  pg = createGraphics(width, height);
  pg.rect(0, 0, width/2, height/2);
  pg.rect(width/2, height/2, width/2, height/2);
  mask1 = pg.get(); //set the mask to the pixel version of the graphic context

  pg = createGraphics(width, height); //reset graphics
  pg.rect(width/2, 0, width/2, height/2);
  pg.rect(0, height/2, width/2, height/2);
  mask2 = pg.get();
}

function drawBg(){
  //create a new drawing context for the background image
  let bg = createGraphics(width, height);

  bg.background(255);

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let offset = 1 * flipFlop;

      if(i%2==0){ //determines the direction the squiggles are pointing
        offset = -1 * flipFlop;
      }

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

      bgImage = bg.get(); //set bgImage to the pixel value of the drawing conext 
    }
  }
}

function reset(){
  // numCols = 4;
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
  print(numCols);
}
