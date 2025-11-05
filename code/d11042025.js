//columns and rows
//alterate between different colors
//but add control the time, next just a simple swaping at a set interval
//ultimate goal is to control with a pattern, either text or an external trigger


//the flashing is a bug, not a feature

let blocks = [];
let colors = ["black", "white",];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  blocks.push(new Block(0, 0, width/4, height/4, "horiziontal", 20, colors)); 
  blocks.push(new Block(width/4, 0, width/4 * 3, width/4, "vertical", 10, colors)); 
  blocks.push(new Block(width/2, width/4, width/4 * 3, width/2, "horiziontal", 20, colors)); 
  blocks.push(new Block(0, width/4, width/2, width/4 * 3, "vertical", 40, colors)); 
  blocks.push(new Block(width/2, width/4 * 3, width/2, width/4, "vertical", 300, colors)); 

}

function draw() {
  background(255);

  for(let b of blocks){
    b.draw();
  }
  // noLoop()
  noStroke();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

//

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Block {
  constructor(x, y, w, h, type, stripeWidth, colorsArray){
    this.startX = x;
    this.startY = y;
    this.width = w;
    this.height = h;
    this.colors = colorsArray;
    this.type = type; //vertical or horiziontal stripes

    this.init(stripeWidth);
  }

  init(sw) {
    //calculate the numcols or numrow based off the stripeWidth
    if(this.type == "vertical"){
      //one row, many cols
      this.numRows = 1;
      this.numCols = floor(this.width/sw);
      this.stripeWidth = this.width/this.numCols;
      this.stripeHeight = this.height; //make it exact
    } else if(this.type == "horiziontal"){
      this.numCols = 1;
      this.numRows = floor(this.height/sw);
      this.stripeWidth = this.width;
      this.stripeHeight = this.height/this.numRows; //make it exact
    }
  }

  draw() {
    for(let i = 0; i < this.numRows; i++){
      let y = i * this.stripeHeight + this.startY;
      for(let j = 0; j < this.numCols; j++){
        let x = j * this.stripeWidth + this.startX;
        fill(this.colors[0]);
        rect(x, y, this.stripeWidth, this.stripeHeight);
        //alternate the color
        let tempColor = this.colors.shift();
        this.colors.push(tempColor);
        // this.colors = this.colors.shuffle();
      }

        // let tempColor = this.colors.shift();
        // this.colors.push(tempColor);
    }
  }
}

