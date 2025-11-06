//columns and rows
//alterate between different colors
//but add control the time, next just a simple swaping at a set interval
//ultimate goal is to control with a pattern, either text or an external trigger

let blocks = [];
let colors = ["black", "white",]; // "red", "blue", "green", "yellow"];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  blocks.push(new Block(0, 0, width/2, height/2, "horiziontal", 20, shuffle(colors)));
  blocks.push(new Block(width/2, 0, width/2, width/2, "vertical", 10, shuffle(colors)));
  blocks.push(new Block(0, height/2, width/2, height/2, "vertical", 20, shuffle(colors)));
  blocks.push(new Block(width/2, height/2, width/2, width/2, "horiziontal", 10, shuffle(colors)));
  // blocks.push(new Block(width/2, width/4, width/4 * 3, width/2, "horiziontal", 20, [...colors]));
  // blocks.push(new Block(0, width/4, width/2, width/4 * 3, "vertical", 40, [...colors]));
  // blocks.push(new Block(width/2, width/4 * 3, width/2, width/4, "vertical", 300, [...colors]));

}

function draw() {
  background(255);

  for(let b of blocks){
    b.draw();
  }

  // if(frameCount % 30 == 0){
  for(let b of blocks){
    if(random() > 0.95){
      let r = random();
      if(r < 0.25){
        b.swapColors();
      } else if(r >= 0.25 && r < 0.5){
        b.swapType();
      } else if(r >= 0.5 && r < 0.75){
        b.swapStripes();
      }
    }
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
  constructor(x, y, w, h, type, numStripes, colorsArray){
    this.startX = x;
    this.startY = y;
    this.width = w;
    this.height = h;
    this.colors = colorsArray;
    this.type = type; //vertical or horiziontal stripes
    this.numStripes = numStripes

    this.init();
  }

  init(numStripes) {
    //calculate the numcols or numrow based off the stripeWidth
    if(this.type == "vertical"){
      //one row, many cols
      this.numRows = 1;
      this.numCols = this.numStripes;
      this.stripeWidth = this.width/this.numCols;
      this.stripeHeight = this.height; //make it exact
    } else if(this.type == "horiziontal"){
      this.numCols = 1;
      this.numRows = this.numStripes;
      this.stripeWidth = this.width;
      this.stripeHeight = this.height/this.numRows; //make it exact
    }
  }

  draw() {
    for(let i = 0; i < this.numRows; i++){
      let y = i * this.stripeHeight + this.startY;
      for(let j = 0; j < this.numCols; j++){
        let x = j * this.stripeWidth + this.startX;

        // let colorIndex = (i + j) % this.colors.length;
        let colorIndex = (i + j) % 2 == 0 ? 0 : 1; //only pick between the first two colors

        fill(this.colors[colorIndex]);
        rect(x, y, this.stripeWidth, this.stripeHeight);
      }

    }
  }

  swapColors() {
    let tempColor = this.colors.shift(); //first becomes last
    this.colors.push(tempColor);
  }

  swapType() {
    if(this.type == "vertical"){
      this.type = "horiziontal";
    } else {
      this.type = "vertical";
    }

    this.init();
  }

  swapStripes() { //change the number of stripes
    console.log("change swap size")
    let num = floor(random(3, 20)); //relate this to width in some way?
    this.numStripes = num;
    this.init();
  }
}

