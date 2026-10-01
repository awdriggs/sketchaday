//this is a mistake but i like it
let grid = [];

let colors = ["#FA3BF050", "#FFED2950", "#1BFC0650", "#30C5FF50", "#FF5C0050", "#8A00C450"];

function setup(){
  createCanvas(800, 800);
  reset();

  noStroke();
}

function draw(){
  background(255);
  for(let c of grid){
    c.draw();
  }

  if(frameCount % 30 == 0){
    reset();
  }
}

function reset(){
  // hGrid = [];
  // vGrid = [];
  colors = shuffle(colors);

  // let margin = width/10;

  // let numRows = 10;
  // let lineWidth = (height - margin)/numRows;

  // let stepSize = 1;

  // let oMin = 5 * width/800;
  // let oMax = 10 * width/800;
  grid = [];

  let numRows = 10;
  let numCols = 10;

  let margin = width/10;

  let cellH = (height - margin) / numRows;
  let cellW = (width - margin) / numCols;

  let hJitter = 0; //track the horiziontal jitter cell to cell for cols
  for(let i = 0; i < numCols; i++){
    let y = margin/2 + i * cellH;

    let vJitter = 0; //track the vertical jitter cell to cell for rows

    for(let j = 0; j < numRows; j++){
      let x = margin/2 + j * cellW;
      //if j is 0, we are on the lefthand size
      //if i is 0, we know we are on teh top row
      grid.push(new Cell(i * numCols + j, x, y, cellW, cellH, vJitter, hJitter, 0, 0)); //flat array index val
      //after the cell is created is has build its vertical and horiziontal lines, get them for the next row
      vJitter = grid[grid.length - 1].vJitter;
      hJitter = grid[grid.length - 1].hJitter;
    }
  }

  // for(let i = 0; i < numRows; i++){
  //   let y = i * lineWidth + margin/2 - (lineWidth * 0.2);
  //   let offset = 0;
  //   let rowOffset = random() > 0.5 ? random(-oMin, -oMax) : random(oMin, oMax);
  //   for(let x = margin/2; x < width - margin/2 + rowOffset; x += stepSize){
  //     if(random() > 0.92){
  //       offset += random() > 0.5 ? -1 : 1;
  //     }
  //     hGrid.push(new Slice(x + rowOffset, y + offset, stepSize, lineWidth * 1.2, colors[0]));
  //   }
  // }

  // for(let i = 0; i < numRows; i++){
  //   let x = i * lineWidth + margin/2 - (lineWidth * 0.2);
  //   let offset = 0;
  //   let rowOffset = random() > 0.5 ? random(-oMin, -oMax) : random(oMin, oMax);
  //   for(let y = margin/2; y < width - margin/2 + rowOffset; y += stepSize){
  //     if(random() > 0.92){
  //       offset += random() > 0.5 ? -1 : 1;
  //     }
  //     hGrid.push(new Slice(x + offset, y + rowOffset, lineWidth * 1.2, stepSize, colors[1]));
  //   }
  // }
}

// function mousePressed(){
//   reset();
// }


function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Cell {
  constructor(idx, x, y, w, h, vj, hj, vo, ho){
    this.idx = idx;
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

    this.vSlices = [];
    this.hSlices = [];

    for(let x = this.x + this.hOffset; x < this.bx; x++){
      if(random() > 0.92){
        this.vJitter += random() > 0.5 ? -1 : 1;
      }

      this.hSlices.push(new Slice(x, this.y + this.vJitter, this.stepSize, this.lineWidth * 1.2, colors[0]));
    }

    for(let y = this.y + this.hOffset; y < this.by; y++){
      if(random() > 0.92){
        this.hJitter += random() > 0.5 ? -1 : 1;
      }

      this.vSlices.push(new Slice(this.x + this.hJitter, y, this.stepSize, this.lineHeight * 1.2, colors[1]));
    }

    //build the slices

  // for(let i = 0; i < numRows; i++){
  //   let y = i * lineWidth + margin/2 - (lineWidth * 0.2);
  //   let offset = 0;
  //   let rowOffset = random() > 0.5 ? random(-oMin, -oMax) : random(oMin, oMax);
  //   for(let x = margin/2; x < width - margin/2 + rowOffset; x += stepSize){
  //     if(random() > 0.92){
  //       offset += random() > 0.5 ? -1 : 1;
  //     }
  //     hGrid.push(new Slice(x + rowOffset, y + offset, stepSize, lineWidth * 1.2, colors[0]));
  //   }
  // }
  }

  draw(){

    noStroke();
    for(let s of this.hSlices){
      s.draw();
    }

    for(let s of this.vSlices){
      s.draw();
    }

    noFill();
    stroke(0);
    rect(this.x, this.y, this.bx - this.x, this.by - this.y);

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


