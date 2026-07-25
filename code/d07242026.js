let cells = [];
let numCols, numRows;
let cellWidth, cellHeight;
let lineTypes = [[0, 1], [0,2], [0, 3], [1,0], [1, 2], [1, 3], [2, 0], [2, 1], [2, 3], [3, 0], [3, 1], [3, 2]]
// let lineTypes = [[2, 3], [3, 2]]
// let colors = ["#177e89", "#084c61", "#db3a34", "#ffc857", "#323031"];
let masks = [];
let maskIndex = 0;
let buffers = [];

function preload() {
  //builds the different line types full screen
  for(let i = 0; i < 4; i++){
    let buffer = createGraphics(800, 800);
    buffer.background(255);
    drawLines(buffer, buffer.width, buffer.height, i);
    buffers.push(buffer);
  }
}

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols = 10;
  numRows = 10;
  cellWidth = width/numCols;
  cellHeight = height/numCols;
  
  // build masks
  reset();

  noFill();

  // strokeWeight(10 * width/800);
}

function draw() {
  background(255);

  // let cm = masks[maskIndex];

  // fill(0);
  // rect(cm.x, cm.y, cm.w, cm.h);
  for(let cm of masks){
    copy(buffers[cm.lt], cm.x, cm.y, cm.w, cm.h, cm.x, cm.y, cm.w, cm.h);
  }

  if(frameCount % 10 == 0){
    reset();
  //   maskIndex++;

  //   if(maskIndex >= masks.length){
  //     maskIndex = 0;
  //     reset();
  //   }
  }
}

//reset
function reset(){
  masks = [];
  console.log("reset");
  for(let i = 0; i < numRows; i++){
    let y = i * cellHeight;
    for(let j = 0; j < numCols; j++){
      let x = j * cellWidth;

      let type = floor(random(0, 4));

      makeMasks({x: x, y: y, t: type});
    }
  }

  //shuffle the masks
  masks = shuffle(masks);
}


function makeMasks(c) {
  let ltIndex = floor(random(lineTypes.length));
  let lt = lineTypes[ltIndex];

  if(c.t == 0){ //left
    makeMask(c.x, c.y, cellWidth/3, cellHeight, lt[0]);
    makeMask(c.x + cellWidth/3, c.y, cellWidth * (2/3), cellHeight, lt[1]);
  } else if(c.t == 1){ //top
    makeMask(c.x, c.y, cellWidth, cellHeight/3, lt[0])
    makeMask(c.x, c.y + cellHeight/3, cellWidth, cellHeight * (2/3), lt[1]);
  } else if(c.t == 2){ //right
    makeMask(c.x + cellWidth*(2/3), c.y, cellWidth/3, cellHeight, lt[0]);
    makeMask(c.x, c.y, cellWidth * (2/3), cellHeight, lt[1]);
  } else { //bottom
    makeMask(c.x, c.y + cellHeight*(2/3), cellWidth, cellHeight/3, lt[0]);
    makeMask(c.x, c.y, cellWidth, cellHeight * (2/3), lt[1]);
  }
}

function makeMask(x, y, w, h, lt){
  masks.push({x: x, y: y, w: w, h: h, lt: lt});
}

// function drawMasks(){
//   for(let m of masks){
//     fill(0);
//   }
// }




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
function drawLines(pg, w, h, t){
  let cycles = 5;
  pg.noFill();
  pg.stroke(0);

  if(t == 0){ //horizontal sin
    let numLines = floor(h / 10);
    let amplitude = h / numLines;
    for(let i = -1; i < numLines + 2; i++){
      pg.beginShape();
      for (let x = 0; x < w; x++) {
        let y = i * amplitude + sin(map(x, 0, w, 0, TWO_PI * cycles)) * amplitude;
        pg.vertex(x, y);
      }
      pg.endShape(OPEN);
    }
  } else if(t == 1){ //vertical sine
    let numLines = floor(w / 10);
    let amplitude = w / numLines;
    for(let i = -1; i < numLines + 2; i++){
      pg.beginShape();
      for(let y = 0; y < h; y++){
        let x = i * amplitude + sin(map(y, 0, h, 0, TWO_PI * cycles)) * amplitude;
        pg.vertex(x, y);
      }
      pg.endShape(OPEN);
    }
  } else if(t == 2){ //horizontal lines
    let numLines = floor(h / 10);
    let spacing = h / numLines;
    for(let i = 0; i < numLines + 1; i++){
      pg.line(0, i * spacing, w, i * spacing);
    }
  } else { //vertical lines
    let numLines = floor(w / 10);
    let spacing = w / numLines;
    for(let i = 0; i < numLines + 1; i++){
      pg.line(i * spacing, 0, i * spacing, h);
    }
  }
}


