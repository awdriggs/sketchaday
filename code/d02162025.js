let numCols = 20;
let numRows = 20;
let rectSize;
let rowHeight;
let rows = [];

function setup() {

  createCanvas(800, 800);
  // createCanvas(300, 300);


  rectSize = width / (numCols - 1);
  rowHeight = height/numRows;

  for(let h = 0; h < numRows; h++){
    let row = [];
    let y, ydir; 
    //figure out the y position and ydir
    if(h == 0){ //top row
      y = 0;
      ydir = 0;
      yo = 0;
    } else if(h == numRows - 1){
      y = height - rowHeight;
      // ydir1 = 0;
      ydir = 0;
      yo = height;
    } else {
      y = h * rowHeight;
      yo = h * rowHeight;
      //y dir gets set later on
    }

    for(let i = 0; i < numCols; i++){

      let x, xdir, xo;

      if(i == 0){ //first
        x = 0;
        xdir = 0;
        xo = 0;
      } else if(i == numCols - 1) { //last
        x = width;
        xdir = 0;
        xo = width;
      } else { //middle cols
        x = i * rectSize;
        xo = i * rectSize;
        xdir = random() > 0.5 ? 1 : -1;
      }

      //see if ydirs have been defined.
      if(ydir == undefined) ydir = random() > 0.5 ? 1 : -1;

      row.push([{x: x, xdir: xdir, xo: xo, y: y, ydir: ydir, yo: yo}, randomColor()]);
    }

    rows.push(row);
  }

  noStroke();
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
          p.y = p.yo - rowHeight / 2; // Reset to the top edge
          p.ydir *= -1;
        } else if (p.y > p.yo + rowHeight / 2) {
          p.y = p.yo + rowHeight / 2; // Reset to the bottom edge
          p.ydir *= -1;
        }
      }
    }
  }
  
  //draw
  for(let i = 1; i < rows.length; i++){
    let row = rows[i];
    //after row is updated, loop over again to draw, otherwise there will be gaps and overlaps
    for(let j = 0; j < row.length - 1; j++){
      let leftLine = row[j];
      let rightLine = row[j + 1];

      let topLeft = rows[i - 1][j];
      let topRight = rows[i-1][j + 1];
    

      let prevY

      //poly shit
      fill(leftLine[1]); //color is in the third array position for each line

      beginShape();
      vertex(topLeft[0].x, topLeft[0].y);
      vertex(topRight[0].x, topRight[0].y);
      vertex(rightLine[0].x, rightLine[0].y);
      vertex(leftLine[0].x, leftLine[0].y);
      // vertex(leftLine[0].x, leftLine[0].y);
      vertex(topLeft[0].x, topLeft[0].y);
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


function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}