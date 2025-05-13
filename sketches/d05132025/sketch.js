let surface1, surface2;
let numCols, numRows;
let cellSize;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  generateGraphics();

  numCols = 25;
  numRows = 25;
  cellWidth = width/numCols;
  cellHeight = height/numRows;
}

function draw() {
  background(255);

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let img;
      let x = j * cellWidth;
      let y = i * cellWidth;
      if ((i + j) % 2 === 0) {
        // fill(0);
        img = surface1
      } else {
        img = surface2
      }
      let subimg = img.get(x, y, cellWidth, cellHeight);
      image(subimg, x, y);
      // rect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
    }
  }

  fill(0);
  ellipse(mouseX, mouseY, 20, 20);

  // image(surface2, 0, 0);
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


function generateGraphics(){
  //simple graphics for now
  surface1 = createGraphics(width, height);
  surface2 = createGraphics(width, height);

  // Draw to the graphics buffer.
  surface1.background(255, 0, 0);
  surface1.noStroke();
  // surface1.fill(200, 100, 0);
  surface1.fill(200, 100, 0);
  surface1.circle(surface1.width / 2, surface1.height / 2, surface1.width);

  surface2.background(0, 0, 255);
  surface2.noStroke();
  surface2.fill(0, 100, 2);
  surface2.circle(surface2.width / 2, surface2.height / 2, surface2.width);
}
