//start the sketch
//refactored, help of chatgpt here

let blocks = [];

function setup() {
  createCanvas(800, 800);

  noStroke();
  // Create blocks with different draw behaviors and parameter objects

  let num = 5;
  let blockSize = width/num;

  let positions = [];

  for(let i = 0; i < num; i++){
    for(let j = 0; j < num; j++){
      positions.push({x: j * blockSize, y: i * blockSize });
    }
  }

  //don't love this, need to think of a way to abstract
  blocks.push(new Block(positions[0].x, positions[0].y, blockSize, blockSize, solid, { colors: ['#727063'] }));
  blocks.push(new Block(positions[1].x, positions[1].y, blockSize, blockSize, verticalStripes, { numStripes: 4, colors: ['red', 'purple'] }));
  blocks.push(new Block(positions[2].x, positions[2].y, blockSize, blockSize, solid, { colors: ['#c8b6af'] }));
  blocks.push(new Block(positions[3].x, positions[3].y, blockSize, blockSize, verticalStripes, { numStripes: 4, colors: ['purple', 'red'] }));
  blocks.push(new Block(positions[4].x, positions[4].y, blockSize, blockSize, solid, { colors: ['#727063'] }));

  blocks.push(new Block(positions[5].x, positions[5].y, blockSize, blockSize, horizontalStripes, { numStripes: 4, colors: ['red', 'purple'] }));
  blocks.push(new Block(positions[6].x, positions[6].y, blockSize, blockSize, checkerboard, { numRows: 4, numCols: 4, colors: ['pink', 'black', 'purple', 'black'], dir: 1}));
  blocks.push(new Block(positions[7].x, positions[7].y, blockSize, blockSize, horizontalStripes, { numStripes: 4, colors: ['purple', 'red'] }));
  blocks.push(new Block(positions[8].x, positions[8].y, blockSize, blockSize, checkerboard, { numRows: 4, numCols: 4, colors: ['black', 'purple', 'black', 'pink'], dir: -1}));
  blocks.push(new Block(positions[9].x, positions[9].y, blockSize, blockSize, horizontalStripes, { numStripes: 4, colors: ['red', 'purple'] }));

  blocks.push(new Block(positions[10].x, positions[10].y, blockSize, blockSize, solid, { colors: ['#c8b6af'] }));
  blocks.push(new Block(positions[11].x, positions[11].y, blockSize, blockSize, verticalStripes, { numStripes: 4, colors: ['purple', 'red'] }));
  blocks.push(new Block(positions[12].x, positions[12].y, blockSize, blockSize, solid, { colors: ['#727063'] }));
  blocks.push(new Block(positions[13].x, positions[13].y, blockSize, blockSize, verticalStripes, { numStripes: 4, colors: ['red', 'purple'] }));
  blocks.push(new Block(positions[14].x, positions[14].y, blockSize, blockSize, solid, { colors: ['#c8b6af'] }));

  blocks.push(new Block(positions[15].x, positions[15].y, blockSize, blockSize, horizontalStripes, { numStripes: 4, colors: ['purple', 'red'] }));
  blocks.push(new Block(positions[16].x, positions[16].y, blockSize, blockSize, checkerboard, { numRows: 4, numCols: 4, colors: ['black', 'purple', 'black', 'pink'], dir: -1}));
  blocks.push(new Block(positions[17].x, positions[17].y, blockSize, blockSize, horizontalStripes, { numStripes: 4, colors: ['red', 'purple'] }));
  blocks.push(new Block(positions[18].x, positions[18].y, blockSize, blockSize, checkerboard, { numRows: 4, numCols: 4, colors: ['pink', 'black', 'purple', 'black'], dir: 1}));
  blocks.push(new Block(positions[19].x, positions[19].y, blockSize, blockSize, horizontalStripes, { numStripes: 4, colors: ['purple', 'red'] }));

  blocks.push(new Block(positions[20].x, positions[20].y, blockSize, blockSize, solid, { colors: ['#727063'] }));
  blocks.push(new Block(positions[21].x, positions[21].y, blockSize, blockSize, verticalStripes, { numStripes: 4, colors: ['red', 'purple'] }));
  blocks.push(new Block(positions[22].x, positions[22].y, blockSize, blockSize, solid, { colors: ['#c8b6af'] }));
  blocks.push(new Block(positions[23].x, positions[23].y, blockSize, blockSize, verticalStripes, { numStripes: 4, colors: ['purple', 'red'] }));
  blocks.push(new Block(positions[24].x, positions[24].y, blockSize, blockSize, solid, { colors: ['#727063'] }));
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
      let colorIndex = col;
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


