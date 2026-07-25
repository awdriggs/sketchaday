let cells = [];
let numCols, numRows;
let cellWidth, cellHeight;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols = 4;
  numRows = 4;
  cellWidth = width/numCols;
  cellHeight = height/numCols;
  // cellHeight = cellWidth * 0.7;
  // numRows = height/cellHeight;
  // debugger;

  for(let i = 0; i < numRows; i++){
    let y = i * cellHeight;
    for(let j = 0; j < numCols; j++){
      let x = j * cellWidth;

      let type = floor(random(0, 4));
      
      // if ((i + j) % 2 === 0) {
      //   type = 0;;
      // } else {
      //   type = 1;;
      // }
      cells.push({x: x, y: y, t: type});
    }
  }

  strokeWeight(10 * width/800);
}

function draw() {
  background(255);
  ellipse(mouseX, mouseY, 20, 20);
  // debugger;
  let shift = frameCount % 60 == 0;
  for(let c of cells){
    drawRect(c);

    // if(c.type){
    //   fill(0);
    //   rect(c.x, c.y, cellWidth, cellHeight);
    // } else {
    //   fill(255);
    //   rect(c.x, c.y, cellWidth, cellHeight);
    // }
    if(shift){
      c.t = floor(random(0, 4));
      print("shift");
    }

    
  }
}

function drawRect(c) {
  rect(c.x, c.y, cellWidth, cellHeight);
  if(c.t == 0){ //left 
    rect(c.x, c.y, cellWidth/3, cellHeight);
  } else if(c.t == 1){ //top
    rect(c.x, c.y, cellWidth, cellHeight/3)
  } else if(c.t == 2){ //right
    rect(c.x + cellWidth*(2/3), c.y, cellWidth/3, cellHeight);
  } else { //bottom
    rect(c.x, c.y + cellHeight*(2/3), cellWidth, cellHeight/3);
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

