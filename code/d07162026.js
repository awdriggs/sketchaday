let cells = [];
let numCols, numRows;
let cellWidth, cellHeight;
let lineTypes = [[0, 1], [0,2], [0, 3], [1,0], [1, 2], [1, 3], [2, 0], [2, 1], [2, 3], [3, 0], [3, 1], [3, 2]] 

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

      let index = floor(random(lineTypes.length));
      let lineType = lineTypes[index];
      
      // if ((i + j) % 2 === 0) {
      //   type = 0;;
      // } else {
      //   type = 1;;
      // }
      cells.push({x: x, y: y, t: type, lt: lineType});
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
  // rect(c.x, c.y, cellWidth, cellHeight);
  if(c.t == 0){ //left 
    fill("yellow");
    rect(c.x, c.y, cellWidth/3, cellHeight);
    fill("red");
    rect(c.x + cellWidth/3, c.y, cellWidth * (2/3), cellHeight);
  } else if(c.t == 1){ //top
    fill("purple");
    rect(c.x, c.y, cellWidth, cellHeight/3)
    fill("orange");
    rect(c.x, c.y + cellHeight/3, cellWidth, cellHeight * (2/3));
  } else if(c.t == 2){ //right
    fill("green");
    rect(c.x + cellWidth*(2/3), c.y, cellWidth/3, cellHeight);
    fill("blue");
    rect(c.x, c.y, cellWidth * (2/3), cellHeight);
  } else { //bottom
    fill("pink");
    rect(c.x, c.y + cellHeight*(2/3), cellWidth, cellHeight/3);
    fill("lightgrey");
    rect(c.x, c.y, cellWidth, cellHeight * (2/3));
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

//line types
function drawLines(w, h, t){
  let numLines = floor(width / 10);
  let spacing = w / numLines;
  let amplitude = w / numLines;

  let cycles = 3;

  // stroke("red");
  if(t == 0){ //horiziontal sin
    for(let i = -1; i < numLines + 2; i++){
      beginShape();
      for (let x = 0; x < w; x++) {
        let y = i * amplitude + sin(map(x, 0, w, 0, TWO_PI * cycles)) * amplitude;
        vertex(x, y);
      }
      endShape(OPEN);
    }
  } else if(t == 1){ //vertical sine
    for(let i = -1; i < numLines + 2; i++){
      beginShape();
      for(let y = 0; y < h; y++){
        let x = i * amplitude + sin(map(y, 0, h, 0, TWO_PI * cycles)) * amplitude;
        vertex(x, y);
      }
      endShape(OPEN);
    }
  } else if(t == 2){ //horiziontal lines
    for(let i = 0; i < numLines + 1; i++){
      line(0, i * spacing, w, i * spacing);
    }
  } else { //vertical lines
    for(let i = 0; i < numLines + 1; i++){
      line(i * spacing, 0, i * spacing, h);
    }
  }
}


