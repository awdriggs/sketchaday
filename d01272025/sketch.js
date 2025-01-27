let c1, c2, c3, c4, c5, c6;
let numStripes = 20;
let numCols, numRows
let sqSize;

function setup() {
  createCanvas(800, 800);
  c1 = "white";
  c2 = "red";
  c3 = "#1D3461";
  c4 = "#26C485";
  c5 = "#26C485";
  c6 = "#5386E4";
  noStroke();

  numCols = 4;
  numRows = 4;

  sqSize = width/numCols;
}

function draw() {
  background(255);

  fill(255);
  rect(100, 100, 200, 200)
  
  //fill the entire background
  tiledFill(0, 0, width, height, 20, numCols, c1, c2);

  tiledFill(100, 100, 200, 200, 5, 4, c3, c4);
  tiledFill(500, 100, 200, 200, 5, 4, c3, c4);
  tiledFill(100, 500, 200, 200, 5, 4, c3, c4);
  tiledFill(500, 500, 200, 200, 5, 4, c3, c4);

  tiledFill(300, 300, 200, 200, 5, 4, c5, c6);
  //swap colors for animation
  if(frameCount % 100 == 0){
    let tempColor = c1;
    c1 = c2;
    c2 = tempColor;

    tempColor = c3;
    c3= c4;
    c4 = tempColor;

    tempColor = c5;
    c5 = c6;
    c6 = tempColor;



  }

}


function tiledFill(x, y, w, h, count, dim, color1, color2){
  let sqSize = w / dim;

  for(let i = 0; i < dim; i++){
    for(let j = 0; j < dim; j++){

      if((i+j) % 2 == 0){
        diagonalFillForward(x + i * sqSize, y + j * sqSize, sqSize, sqSize, count, color1, color2);
      } else {
        diagonalFillBack(x + i * sqSize, y + j * sqSize, sqSize, sqSize, count, color1, color2);
      }
    }


    let tempColor = color1;
    color1 = color2;
    color2 = tempColor;
  }

}

function diagonalFillBack(x, y, w, h, c, color1, color2){
  //start in lower left corner
  let numStripes = c;

  let sw = w / numStripes;

  let x1, y1, x2, y2;

  let px1 = x, py1 = y + h, px2 = x, py2 = y + h; //set all previous points to bottom left hand corner

  for(let i = 0; i < numStripes * 2 + 1; i++){
    x1 = x + i * sw; //move along x

    if(x1 > x + w){  //x1 exceeds the right bounds
      y1 = y + h - (x1 - (x+w)); //how far off are ya? move up the y this amount!
      x1 = x+w; //max x out at the right bounds
    } else {
      y1 = y + h; //else y is the bottom bounds
    }

    y2 = y + h - i * sw; //move along y

    if(y2 < y){ //if y2 is less than y, the top of the square
      x2 = x + (y - y2); //how far off are ya? move right by this amount!
      y2 = y; //max y a the top of the bounds
    } else {
      x2 = x; //else x is the left hand side
    }

    if(i % 2 == 0){
      fill(color1);
    } else {
      fill(color2);
    }

    // line(x1, y1, x2, y2); //for simplified testing
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(px2, py2);
    vertex(px1, py1);
    endShape();

    //update the previous
    px1 = x1;
    py1 = y1;
    px2 = x2;
    py2 = y2;
  }
}

function diagonalFillForward(x, y, w, h, c, color1, color2){
  //start in lower left corner
  let numStripes = c;

  let sw = w / numStripes;

  let x1, y1, x2, y2;

  let px1 = x, py1 = y; px2 = x, py2 = y; //set all previous points to top left corner

  for(let i = 0; i < numStripes * 2 + 1; i++){
    x1 = x + i * sw; //move along x

    if(x1 > x + w){ //if x is greate than the right side bounds
      y1 = y + (x1 - (x+w)); //how far off are ya? ove up this amount
      x1 = x+w; //max x out at the right hand side;
    } else {
      y1 = y; //y1 is at the top of the bounds
    }

    y2 = y + i * sw; //move along the y

    if(y2 > y + h){ //if y2 is greater than the bottom limit
      x2 = x + (y2 - (y + h)); //how far off are ya? move the x by this amoutn
      y2 = y + h; //limit y2 to the bottom of the bounds
    } else {
      x2 = x; //x2 is on the left hand side
    }

    if(i % 2 == 0){
      fill(color1);
    } else {
      fill(color2);
    }

    // line(x1, y1, x2, y2); //debug
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(px2, py2);
    vertex(px1, py1);
    endShape(CLOSE);

    //update the previous
    px1 = x1;
    py1 = y1;
    px2 = x2;
    py2 = y2;
  }
}

//you started with this as a poc
function diagonalLines(x, y, w, h){
  //start in lower left corner
  let numStripes = 8;

  let sw = w / numStripes;

  let x1, y1, x2, y2;

  for(let i = 0; i < numStripes * 2; i++){
    x1 = x + i * sw;

    if(x1 > x + w){
      y1 = y + h - ((x + i * sw) - (x+w));
      x1 = x+w;
    } else {
      y1 = y + h;
    }

    y2 = y + h - i * sw;

    if(y2 < y){ //if y is greater than the
      x2 = x + w - (y2 + y);
      y2 = y;
    } else {
      x2 = x
    }

    line(x1, y1, x2, y2);
  }
}


