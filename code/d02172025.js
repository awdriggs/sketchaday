let numCols = 20;
let numRows = 20;
let rectSize;
let rowHeight;
let rows = [];
let maxArea;

function setup() {

  createCanvas(800, 800);
  // createCanvas(300, 300);


  rectSize = width / (numCols - 1);
  rowHeight = height/numRows;

  maxArea = rectSize * rowHeight * 2;

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

      row.push({x: x, xdir: xdir, xo: xo, y: y, ydir: ydir, yo: yo, c: randomColor()});
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
    
    // for(let l of row){
      for(let p of row){
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
    // }
  }
  
  //draw
  for(let i = 1; i < rows.length; i++){
    let row = rows[i];
    //after row is updated, loop over again to draw, otherwise there will be gaps and overlaps
    for(let j = 0; j < row.length - 1; j++){
      let x1, y1, x2, y2, x3, y3, x4, y4;

      x1 = rows[i - 1][j].x;
      y1 = rows[i - 1][j].y;

      x2 = rows[i - 1][j + 1].x;
      y2 = rows[i - 1][j + 1].y;

      x4 = rows[i][j].x;
      y4 = rows[i][j].y;

      x3 = rows[i][j+1].x;
      y3 = rows[i][j+1].y;

    
      // print(x1,y1,x2,y2,x3,y3,x4,y4);

      let area = calcArea(x1,y1,x2,y2,x3,y3,x4,y4);
      let shade = map(area, 0, maxArea, 0, 255);

      //poly shit
      // fill(rows[i][j].c); //color is in the third array position for each line
      fill(shade);
      stroke(shade);

      beginShape();
      vertex(x1, y1);
      vertex(x2, y2);
      vertex(x3, y3);
      vertex(x4, y4);
      vertex(x1, y1);
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

function calcArea(x1, y1, x2, y2, x3, y3, x4, y4){
//shoelace algo implemented on formula given by chatgpt
  //Area=21​∣x1​y2​+x2​y3​+x3​y4​+x4​y1​−(y1​x2​+y2​x3​+y3​x4​+y4​x1​)∣
  let area = 0.5 * abs(x1*y2 + x2*y3 + x3*y4 + x4*y1 - (y1*x2 + y2*x3 + y3*x4 + y4*x1));

  return area;
}