//start the sketch
//refactored, help of chatgpt here

let config = [
  {func: solid, params: {colors: ['#727063'] }}, //0
  {func: solid, params: { colors: ['#c8b6af'] }}, //1
  {func: verticalStripes, params: { numStripes: 4, colors: ['red', 'purple'] }}, //2
  {func: verticalStripes, params: { numStripes: 4, colors: ['purple', 'red'] }}, //3
  {func: horizontalStripes, params: { numStripes: 4, colors: ['red', 'purple'] }}, //4
  {func: horizontalStripes, params: { numStripes: 4, colors: ['purple', 'red'] }}, //5
  {func: checkerboard, params: { numRows: 4, numCols: 4, colors: ['pink', 'black', 'purple', 'black'], dir: 1}}, //6
  {func: checkerboard, params: { numRows: 4, numCols: 4, colors: ['black', 'purple', 'black', 'pink'], dir: -1}} //7
  // {func: checkerboard, params: { numRows: 4, numCols: 4, colors: ['black', 'purple'], dir: -1}} //7
]

let pattern = [
  [0, 2, 1, 3, 0],
  [4, 6, 5, 7, 4],
  [1, 3, 0, 2, 1],
  [5, 7, 4, 6, 5],
  [0, 2, 1, 3, 0]
]

let blocks = [];

function setup() {
  createCanvas(800, 800);

  noStroke();
  // Create blocks with different draw behaviors and parameter objects

  let num = 5;
  let blockSize = width/num;

  // let positions = [];

  //loop through the pattern, calculate the position, creat the block
  for(let i = 0; i < pattern.length; i++){ //a row
    for(let j = 0; j < pattern[i].length; j++){

      let x = j * blockSize;
      let y = i * blockSize;
      let index = pattern[i][j] //get the index from the pattern array

      blocks.push(new Block(x, y, blockSize, blockSize, config[index].func, config[index].params));
    }
  }
}

function draw() {
  background(255);

  // Draw all blocks
  for (let block of blocks) {
    block.draw();
  }
}

class Block {
  constructor(originX, originY, width, height, drawFunction, drawParams = {}) {
    this.originX = originX;
    this.originY = originY;
    this.width = width;
    this.height = height;
    this.drawFunction = drawFunction; // The drawing function
    this.drawParams = drawParams;    // Object containing parameters for the draw function
  }

  draw() {
    // Pass the block instance and drawParams object to the draw function
    this.drawFunction(this, this.drawParams);
  }
}

//pattern functions
function horizontalStripes(block, params) {
  const { numStripes, colors } = params; // Destructure parameters from the object
  let stripeHeight = block.height / numStripes;
  let colorIndex = 0;

  for (let i = 0; i < numStripes; i++) {
    let y = block.originY + i * stripeHeight;
    fill(colors[colorIndex]);
    rect(block.originX, y, block.width, stripeHeight);
    colorIndex = (colorIndex + 1) % colors.length;
  }
}

function verticalStripes(block, params) {
  const { numStripes, colors } = params; // Destructure parameters from the object
  let stripeWidth = block.width / numStripes;
  let colorIndex = 0;

  for (let i = 0; i < numStripes; i++) {
    let x = block.originX + i * stripeWidth;
    fill(colors[colorIndex]);
    rect(x, block.originY, stripeWidth, block.height);
    colorIndex = (colorIndex + 1) % colors.length;
  }
}

function checkerboard(block, params) {
  const { numRows, numCols, colors, dir } = params; // Destructure parameters from the object
  let cellWidth = block.width / numCols;
  let cellHeight = block.height / numRows;
  let colorOffset = 0;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      // let colorIndex = (row + col) % colors.length; //I like this for determining the color! better than what I was doing
      let colorIndex = col % colors.length;
      fill(colors[colorIndex]);
      rect(
        block.originX + col * cellWidth,
        block.originY + row * cellHeight,
        cellWidth,
        cellHeight
      );

    }

    //
    if(dir > 0){
      let lastColor = colors.pop();
      colors.unshift(lastColor);
    } else if(dir < 0){
      let firstColor = colors.shift();
      colors.push(firstColor);
    }

  }

  function incrementColor(){
    colorIndex = colorIndex++;

    if(colorIndex >= colors.length){
      colorIndex == 0;
    }
  }
}

function solid(block, params) {
  const { colors } = params; // Destructure parameters from the object
  fill(colors[0]);
  rect(block.originX, block.originY, block.width, block.height);
}


