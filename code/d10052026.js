//this is a mistake but i like it
let grid = [];
let numCols, numRows;

let colors = ["#FA3BF099", "#FFED2999", "#1BFC0699", "#30C5FF99", "#FF5C0099", "#8A00C499"];

function setup(){
  createCanvas(800, 800);
  reset();

  noStroke();
}

function draw(){
  background(255);

  // let update = frameCount % 4 == 0;
  let update = true;

  for(let i = 0; i < grid.length / numRows; i++){
    for(let j = 0; j < grid.length / numCols; j++){
      let c = grid[i * numRows + j];

      // let prevHSlice = null;
      // let prevVSlice = null;

      if(update){
        let prevCellX = null;
        let prevCellY = null;
        //if the cell is not in the first row, grab the cell at this column value in the previous cell
        //if the cell is not
        //else send null
        if(i > 0){
          let prevVSlices = grid[(i - 1) * numRows + j].vSlices;
          prevCellX = prevVSlices[prevVSlices.length - 1].x;
        }

        if(j > 0){
          let prevHSlices = grid[i * numRows + (j - 1)].hSlices;
          prevCellY = prevHSlices[prevHSlices.length -1].y;
        }

        c.squiggle(prevCellX, prevCellY);
      }

      c.draw();
    }
  }

  // if(frameCount % 30 == 0){
  //   reset();
  // }
}

function reset(){
  colors = shuffle(colors);


  grid = []; //empty the grid

  numRows = 20;
  numCols = 20;

  let margin = width/10;

  let cellH = (height - margin) / numRows;
  let cellW = (width - margin) / numCols;


  //offset max for stagger start
  // let oMin = 5 * width/800;
  // let oMax = 10 * width/800;
let oMin = cellW * 0.1;
  let oMax = cellW * 0.2;

  let hJitter = 0; //track the horiziontal jitter cell to cell for cols
  let vOffsetStart = 0;
  let hOffsetStart = 0;
  let vOffsetEnd = 0;
  let hOffsetEnd = 0;

  for(let i = 0; i < numCols; i++){
    let y = margin/2 + i * cellH;

    let vJitter = 0; //track the vertical jitter cell to cell for rows

    for(let j = 0; j < numRows; j++){
      let x = margin/2 + j * cellW;

      if (i > 0) { //if not the top cell in a column, get the hJitter from the last cell in this column
        let aboveCell = grid[(i - 1) * numCols + j];
        hJitter = aboveCell.hJitter;
      }

      //if i is 0, we know we are on teh top row, add some vertical ofset to stagger the start
      if(i == 0){
        vOffsetStart = random() > 0.5 ? floor(random(-oMin, -oMax)) : floor(random(oMin, oMax));
      } else {
        vOffsetStart = 0;
      }

      if(i == numRows - 1){
        vOffsetEnd = random() > 0.5 ? floor(random(-oMin, -oMax)) : floor(random(oMin, oMax));
      } else {
        vOffsetEnd = 0;
      }

      //if j is 0, we are on the lefthand size, add some horizontal offset to stagger the start
      if(j == 0){
        hOffsetStart = random() > 0.5 ? floor(random(-oMin, -oMax)) : floor(random(oMin, oMax));
      } else {
        hOffsetStart = 0;
      }

      if(j == numCols - 1){
        hOffsetEnd = random() > 0.5 ? floor(random(-oMin, -oMax)) : floor(random(oMin, oMax));
      } else {
        hOffsetEnd = 0;
      }
      let checkerboardValue = (i + j) % 2 == 0
      grid.push(new Cell(checkerboardValue, x, y, cellW, cellH, vJitter, hJitter, hOffsetStart, vOffsetStart, hOffsetEnd, vOffsetEnd)); //flat array index val
      //after the cell is created is has build its vertical and horiziontal lines, get them for the next row
      vJitter = grid[grid.length - 1].vJitter;
    }
  }
}

function mousePressed(){
  reset();
}


function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Cell {
  constructor(c, x, y, w, h, vj, hj, ho, vo, hoe, voe){
    this.checker = c;
    this.x = x; //corner x
    this.y = y; //corner y
    this.bx = x + w; //bounds x
    this.by = y + h; //bounds y
    this.stepSize = 1;
    this.lineWidth = w;
    this.lineHeight = h;

    // jitter tracking needed so have continuity between cells
    this.vJitter = vj;
    this.hJitter = hj;

    //for uneven starts
    this.vOffset = vo;
    this.hOffset = ho;

    this.vOffsetEnd = voe;
    this.hOffsetEnd = hoe;

    this.vSlices = [];
    this.hSlices = [];

    this.thickness = 0.8;

    for(let x = this.x + this.hOffset; x < this.bx + this.hOffsetEnd; x++){
      if(random() > 0.92){
        this.vJitter += random() > 0.5 ? -1 : 1;
      }
      this.hSlices.push(new Slice(x, this.y + this.vJitter + (this.lineHeight * (1 - this.thickness) / 2), this.stepSize, this.lineWidth * this.thickness, colors[0]));
    }

    for(let y = this.y + this.vOffset; y < this.by + this.vOffsetEnd; y++){
      if(random() > 0.92){
        this.hJitter += random() > 0.5 ? -1 : 1;
      }
      this.vSlices.push(new Slice(this.x + this.hJitter + (this.lineWidth * (1 - this.thickness) / 2), y, this.lineHeight * this.thickness, this.stepSize, colors[1]));
    }
  }

  draw(){

    noStroke();

    if(this.checker){ //horizontal first
      for(let s of this.hSlices){
        s.draw();
      }

      for(let s of this.vSlices){
        s.draw();
      }
    } else { //vertical first
      for(let s of this.vSlices){
        s.draw();
      }

      for(let s of this.hSlices){
        s.draw();
      }


    }


    // noFill();
    // stroke(0);
    // rect(this.x, this.y, this.bx - this.x, this.by - this.y);

  }

  squiggle(px, py){

    for(let i = 0; i < this.hSlices.length; i++){
      let thisSlice = this.hSlices[i];
      // let lastSlice;

      let lastSliceY;
      //if this is the first slice in the line, get the slice from the previous cell
      if(i == 0) {
        lastSliceY = py ?? thisSlice.y;
      } else {
        lastSliceY = this.hSlices[i - 1].y;
      }

      let yDist = thisSlice.y - lastSliceY;

      if(yDist > 1){
        thisSlice.y--;
      } else if(yDist < -1){
        thisSlice.y++;
      } else if(yDist != 0){
        if(random() > 0.1) thisSlice.y -= yDist; // 90% chance to follow neighbor, propagates steps forward
      } else {
        if(random() > 0.92){
          thisSlice.y += random() > 0.5 ? -1 : 1;
        }
      }
      thisSlice.y = constrain(thisSlice.y, this.y, this.by - thisSlice.h);
    }

    for(let i = 0; i < this.vSlices.length; i++){

      let thisSlice = this.vSlices[i];

      let lastSliceX;

      if(i == 0) {
        lastSliceX = px ?? thisSlice.x;
      } else {
        lastSliceX = this.vSlices[i - 1].x;
      }

      let xDist = thisSlice.x - lastSliceX;

      if(xDist > 1){
        thisSlice.x--;
      } else if(xDist < -1){
        thisSlice.x++;
      } else  if(xDist != 0){
        if(random() > 0.1) thisSlice.x -= xDist;
      } else {
        if(random() > 0.92){
          thisSlice.x += random() > 0.5 ? -1 : 1;
        }
      }
      thisSlice.x = constrain(thisSlice.x, this.x, this.bx - thisSlice.w);
    }
  }
}

class Slice {
  constructor(x, y, w, h, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c; //color
  }

  draw(){
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
  }
}


