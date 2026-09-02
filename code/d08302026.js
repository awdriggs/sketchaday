let grid = [];
let numCols = 20;
let numRows = 20;
let cellHeight, cellWidth;

function setup() {
  createCanvas(800, 800);

  cellHeight = height / numRows;
  cellWidth = width / numCols;

  let r = min(width, height) / 2;
  let cx = width / 2;
  let cy = height / 2;

  for (let i = 0; i < numRows; i++) {
    let y = i * cellHeight + cellHeight / 2;
    let dy = y - cy;

    if (abs(dy) >= r) continue; // outside circle

    let dx = sqrt(r * r - dy * dy);
    let numColsInThisRow = floor((dx * 2) / cellWidth);
    // let leftPad = cx - dx;
    let leftPad = cx - (numColsInThisRow * cellWidth) / 2;

    for (let j = 0; j < numColsInThisRow; j++) {
      let x = j * cellWidth + cellWidth / 2 + leftPad;

      let w, h

      let theta = random(0, TWO_PI);
      if(random() > 0.5){
        w = cellWidth * 0.8;
        h = cellHeight/5;
        grid.push({ x, y, w, h, r: theta });

        if(random() > 0.8){
          w = cellWidth/5
          h = cellHeight * 0.8;
          let offset = random(-cellWidth/2, cellWidth/2)
          grid.push({ x: x + offset, y, w, h, r: theta });
        }
      } else {
        w = cellWidth/5
        h = cellHeight * 0.8;
        grid.push({ x, y, w, h, r: theta });

        if(random() > 0.8){
          w = cellWidth * 0.8;
          h = cellHeight/5;
          let offset = random(-cellHeight/2, cellHeight/2)
          grid.push({x, y: y + offset, w, h, r: theta });
        }
      }

    }
  }

}

function draw() {
  background(255);

  for(let g of grid){
    push();
    translate(g.x, g.y);
    rotate(g.r);
    fill(0);
    rect(0 - g.w/2, 0 - g.h/2, g.w, g.h);
    // fill("red");
    // ellipse(g.x, g.y, 5, 5);
    pop();

    g.r += 0.01;
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

