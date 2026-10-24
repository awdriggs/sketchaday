let grid = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numCols = 10;
  let numRows = 10;
  let margin = width/10;
  let availableWidth = width - margin * 2;
  let availableHeight = height - margin * 2;
  let cellWidth = availableWidth/numCols;
  let cellHeight = availableHeight/numRows;

  let vOffset, hOffset;

  //grid setup
  for(let i = 0; i < numRows; i++){
    let row = [];

    if(i == 0) vOffset = random(cellHeight/10, cellHeight/5) * (random() > 0.5 ? 1 : -1);

    let y = i * cellHeight + margin + vOffset;

    for(let j = 0; j < numCols; j++){
      if(j == 0) hOffset = random(cellWidth/10, cellHeight/5) * (random() > 0.5 ? 1 : -1);

      let x = j * cellWidth + margin + hOffset;
      row.push(new Point(x, y, cellWidth, cellHeight));
    }
    grid.push(row);
  }

  noFill();
}

function draw() {
  background(255);

  for(let i=0; i < grid.length; i++){
    for(let j = 0; j < grid[i].length; j++){
      let point = grid[i][j];

      // point.x += 1 * (random() > 0.5 ? 1 : -1);
      point.update();
      // point.draw();

      //draw connecting lines
      if(j < grid[i].length - 1){
        let nextPoint = grid[i][j+1];
        line(point.cx, point.cy, nextPoint.cx, nextPoint.cy);
      }

      if(i < grid.length - 1){
        let nextPoint = grid[i+1][j];
        line(point.cx, point.cy, nextPoint.cx, nextPoint.cy);
      }
    }
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

class Point {
  constructor(x, y, w, h){
    // this.startX = x + size/2;
    // this.startY = y + size/2;
    // this.x = x + size/2;
    // this.y = y + size/2;
    this.x = x
    this.y = y;
    this.cx = x + w/2;
    this.cy = y + h/2;
    this.width = w;
    this.height = h;
    this.diameter = w/2;
  }

  update(){
    this.cx += 1 * (random() > 0.5 ? -1 : 1); 
    this.cy += 1 * (random() > 0.5 ? -1 : 1); 

    this.cx = constrain(this.cx, this.x + this.diameter/2, this.x + this.width - this.diameter/2);
    this.cy = constrain(this.cy, this.y + this.diameter/2, this.y + this.height - this.diameter/2);
  }

  draw(){
    rect(this.x, this.y, this.width, this.height);
    circle(this.cx, this.cy, this.diameter);
  }
}

