let cells = [];
let numCols, numRows;
let cellWidth, cellHeight;
// let lineTypes = [[0, 1], [0,2], [0, 3], [1,0], [1, 2], [1, 3], [2, 0], [2, 1], [2, 3], [3, 0], [3, 1], [3, 2]] 
let lineTypes = [[2, 3], [3, 2]] 
let colors = ["#454ade","#1b1f3b","#b14aed","#c874d9","#e1bbc9"]


function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols = 10;
  numRows = 10;
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
      let shuffledColors = shuffle(colors);
      let c1 = shuffledColors.pop();
      let c2 = shuffledColors.pop();
      
      // if ((i + j) % 2 === 0) {
      //   type = 0;;
      // } else {
      //   type = 1;;
      // }
      cells.push({x: x, y: y, t: type, lt: lineType, ct: [c1, c2]});
    }
  }

  noFill();

  // strokeWeight(10 * width/800);
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
  // fill(255);
  // noFill();
  
  if(c.t == 0){ //left 
    fill(c.ct[0]);
    rect(c.x, c.y, cellWidth/3, cellHeight);
    drawLines(c.x, c.y, cellWidth/3, cellHeight, c.lt[0]);
    fill(c.ct[1]);
    rect(c.x + cellWidth/3, c.y, cellWidth * (2/3), cellHeight);
    drawLines(c.x + cellWidth/3, c.y, cellWidth * (2/3), cellHeight, c.lt[1]);
  } else if(c.t == 1){ //top
    fill(c.ct[0]);
    rect(c.x, c.y, cellWidth, cellHeight/3)
    drawLines(c.x, c.y, cellWidth, cellHeight/3, c.lt[0])
    fill(c.ct[1]);
    rect(c.x, c.y + cellHeight/3, cellWidth, cellHeight * (2/3));
    drawLines(c.x, c.y + cellHeight/3, cellWidth, cellHeight * (2/3), c.lt[1]);
  } else if(c.t == 2){ //right
    fill(c.ct[0]);
    rect(c.x + cellWidth*(2/3), c.y, cellWidth/3, cellHeight);
    drawLines(c.x + cellWidth*(2/3), c.y, cellWidth/3, cellHeight, c.lt[0]);
    fill(c.ct[1]);
    rect(c.x, c.y, cellWidth * (2/3), cellHeight);
    drawLines(c.x, c.y, cellWidth * (2/3), cellHeight, c.lt[1]);
  } else { //bottom
    fill(c.ct[0]);
    rect(c.x, c.y + cellHeight*(2/3), cellWidth, cellHeight/3);
    drawLines(c.x, c.y + cellHeight*(2/3), cellWidth, cellHeight/3, c.lt[0]);
    fill(c.ct[1]);
    rect(c.x, c.y, cellWidth, cellHeight * (2/3));
    drawLines(c.x, c.y, cellWidth, cellHeight * (2/3), c.lt[1]);
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
function drawLines(sx, sy, w, h, t){
  let cycles = 3;

  if(t == 0){ //horizontal sin
    let numLines = floor(h / 10);
    let amplitude = h / numLines;
    for(let i = -1; i < numLines + 2; i++){
      beginShape();
      for (let x = sx; x < sx + w; x++) {
        let y = sy + i * amplitude + sin(map(x, sx, sx + w, 0, TWO_PI * cycles)) * amplitude;
        vertex(x, y);
      }
      endShape(OPEN);
    }
  } else if(t == 1){ //vertical sine
    let numLines = floor(w / 10);
    let amplitude = w / numLines;
    for(let i = -1; i < numLines + 2; i++){
      beginShape();
      for(let y = sy; y < sy + h; y++){
        let x = sx + i * amplitude + sin(map(y, sy, sy + h, 0, TWO_PI * cycles)) * amplitude;
        vertex(x, y);
      }
      endShape(OPEN);
    }
  } else if(t == 2){ //horizontal lines
    let numLines = floor(h / 10);
    let spacing = h / numLines;
    for(let i = 0; i < numLines + 1; i++){
      line(sx, sy + i * spacing, sx + w, sy + i * spacing);
    }
  } else { //vertical lines
    let numLines = floor(w / 10);
    let spacing = w / numLines;
    for(let i = 0; i < numLines + 1; i++){
      line(sx + i * spacing, sy, sx + i * spacing, sy + h);
    }
  }
}


