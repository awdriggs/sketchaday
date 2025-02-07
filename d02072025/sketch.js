let numCols = 20;
let numRows = 20;
let rectSize;
let rowHeight;
let rows = [];

function setup() {
  createCanvas(800, 800);

  rectSize = width / (numCols - 1);
  rowHeight = height/numRows;

  for(let h = 0; h < numRows; h++){
    let row = [];
    let y, ydir1, ydir2, yo;
    //figure out the y position and ydir
    if(h == 0){ //top row
      y = 0;
      ydir1 = 0;
      // ydir2 = 0;
      yo = 0;
    } else if(h == numRows - 1){
      y = height - rowHeight;
      // ydir1 = 0;
      ydir2 = 0;
      yo = height - rowHeight;
    } else {
      y = h * rowHeight;
      yo = h * rowHeight;
      //y dir gets set later on
    }

    for(let i = 0; i < numCols; i++){

      let x, xdir1, xdir2, xo;

      if(i == 0){ //first
        x = 0;
        xdir1 = 0;
        xdir2 = 0;
        xo = 0;
      } else if(i == numCols - 1) { //last
        x = width;
        xdir1 = 0;
        xdir2 = 0;
        xo = width;
      } else { //middle cols
        x = i * rectSize;
        xo = i * rectSize;
        xdir1 = random() > 0.5 ? 1 : -1;
        xdir2 = random() > 0.5 ? 1 : -1;
      }

      //see if ydirs have been defined.
      if(ydir1 == undefined) ydir1 = random() > 0.5 ? 1 : -1;
      if(ydir2 == undefined) ydir2 = random() > 0.5 ? 1 : -1;

      row.push([{x: x, xdir: xdir1, xo: xo, y: y, ydir: ydir1, yo: y}, {x: x, xdir: xdir2, xo: xo, y: y + rowHeight, ydir: ydir2, yo: y + rowHeight}, randomColor()]);
    }

    rows.push(row);
  }
}

function draw() {
  background(255);

  for(let i = 0; i < rows.length; i++){
    let row = rows[i];
    let y = rowHeight * i;
    for(let l of row){
      for(let p of l){
        //update the x
        p.x += p.xdir * random(0.5); 
        //bounds check the x
        if (p.x < p.xo - rectSize / 2) {
          p.x = p.xo - rectSize / 2; // Reset to the left edge
          p.xdir *= -1;
        } else if (p.x > p.xo + rectSize / 2) {
          p.x = p.xo + rectSize / 2; // Reset to the right edge
          p.xdir *= -1;
        }

        p.y += p.ydir * random(0.5); 
        //bounds check the y
        if (p.y < p.yo - rowHeight / 2) {
          p.y = p.yo - rowHeight / 2; // Reset to the left edge
          p.ydir *= -1;
        } else if (p.y > p.yo + rowHeight / 2) {
          p.y = p.yo + rowHeight / 2; // Reset to the right edge
          p.ydir *= -1;
        }
      }
    }

    //after row is updated, loop over again to draw, otherwise there will be gaps and overlaps
    for(let j = 0; j < row.length - 1; j++){
      let leftLine = row[j];
      let rightLine = row[j + 1];

      //poly shit
      fill(leftLine[2]); //color is in the third array position for each line

      beginShape();
      vertex(leftLine[0].x, leftLine[0].y);
      vertex(rightLine[0].x, rightLine[0].y);
      vertex(rightLine[1].x, rightLine[1].y);
      vertex(leftLine[1].x, rightLine[1].y);
      vertex(leftLine[0].x, leftLine[0].y);
      endShape();
    }
  }
}

function randomColor(){
  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);

  return color(r, g, b);
}
