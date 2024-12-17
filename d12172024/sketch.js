//start the sketch
//refactored, help of chatgpt here

let pattern = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

let blocks = [];

function setup() {

  let config = [
    {func: brokenPlates, params: {colors: [randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor()]}}
    // {func: solid, params: {colors: ['#727063'] }}, //0
    // {func: wavePattern, params: {colors: ["white", "red"], numTris: 3}},
    // {func: wavePattern, params: {colors: ["red", "white"], numTris: 3}}
    // {func: solid, params: { colors: ['#c8b6af'] }}, //1
    // {func: verticalStripes, params: { numStripes: 4, colors: ['red', 'purple'] }}, //2
    // {func: verticalStripes, params: { numStripes: 4, colors: ['purple', 'red'] }}, //3
    // {func: horizontalStripes, params: { numStripes: 4, colors: ['red', 'purple'] }}, //4
    // {func: horizontalStripes, params: { numStripes: 4, colors: ['purple', 'red'] }}, //5
    // {func: checkerboard, params: { numRows: 4, numCols: 4, colors: ['pink', 'black', 'purple', 'black'], dir: 1}}, //6
    // {func: checkerboard, params: { numRows: 4, numCols: 4, colors: ['black', 'purple', 'black', 'pink'], dir: -1}} //7
    // {func: checkerboard, params: { numRows: 4, numCols: 4, colors: ['black', 'purple'], dir: -1}} //7
  ]

  createCanvas(680, 960); //p-o screen size
  //gcf is 40 fyi, producing a 17 x 24 grid

  // noStroke();
  // Create blocks with different draw behaviors and parameter objects
  //calculate margin!
  let horizontalMargin = 20;

  let num = 4;
  let blockSize = (width - horizontalMargin * 2)/num;

  // let positions = [];

  //loop through the pattern, calculate the position, creat the block
  for(let i = 0; i < pattern.length; i++){ //a row
    for(let j = 0; j < pattern[i].length; j++){

      let x = j * blockSize + horizontalMargin;
      let y = i * blockSize;
      let index = pattern[i][j] //get the index from the pattern array

      blocks.push(new Block(x, y, blockSize, blockSize, 1, config[index].func, config[index].params));
    }
  }

  // noLoop();
  noStroke();
}

function draw() {
  background(255);

  // Draw all blocks
  for (let block of blocks) {
    block.draw();
  }
}

function mouseClicked(){
  saveCanvas("quilt", "png");
}

class Block {
  constructor(originX, originY, width, height, state, drawFunction, drawParams = {}) {
    this.originX = originX;
    this.originY = originY;
    this.width = width;
    this.height = height;
    this.state = state; //used for animated the color
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

function wavePattern(block, params){

  const { numTris, colors,   } = params; // Destructure parameters from the object

  let bgColor, fillColor;

  if(block.state > 0){
    bgColor = colors[0];
    fillColor =  colors[1];
  } else {
    bgColor = colors[1];
    fillColor =  colors[0];
  }

  fill(bgColor);
  rect(block.originX, block.originY, block.width, block.height);

  fill(fillColor);

  let b = block.width/numTris; //make it exact
  let h = b/2;

  for(let c = numTris; c > 0; c--){

    let offset = (numTris - c) * b/2;

    let y = offset + block.originY;
    let y1 = offset - block.originY; //for the bottom rows

    //horziontals
    for(let i = 0; i < c; i++){
      let x = b*i - b/2 + block.originX;

      if(i!=0){
        triangle(x + offset, y + h, x + b/2 + offset, y, x + b + offset, y+h);
        triangle(x + offset, block.height - y1 - h, x + b/2 + offset, block.height - y1, x + b + offset, block.height - y1 - h);
      }
    }

    //vertical
    let x = offset + block.originX;
    let x1 = offset - block.originX; //for the right columns

    for(let i = 0; i < c; i++){
      let y = b*i + block.originY;
      triangle(x, y + offset, x + h, y + b/2 + offset, x, y + b + offset);
      triangle(block.width - x1, y + offset, block.width - x1 - h, y + b/2 + offset, block.width - x1, y + b + offset);
    }
  }
}

function brokenPlates(block, params){

  const { colors } = params; // Destructure parameters from the object
  //also pinwheels?
  //colors is a long list
  //shuffle the colors up

  // let colorList = shuffle(colors);
  let colorList = colors; //since colors is an object, pass by reference

  // let colorList = []; //for a deep copy
  // for(let c of colors){
  //   colorList.push(c)
  // }

  let x = block.originX;
  let y = block.originY;

  //don't live the repetion but trying to loop it is a mindfuck right now
  fill(colorList[0]);
  triangle(x, y, x + block.width/2, y, x + block.width/2, y + block.height/2);
  colorList = shiftColors(colorList);

  fill(colorList[0]);
  triangle(x + block.width/2, y, x + block.width/2, y + block.height/2, x + block.width, y);
  colorList = shiftColors(colorList);

  fill(colorList[0]);
  triangle(x + block.width/2, y + block.height/2, x + block.width, y, x + block.width, y + block.height/2);
  colorList = shiftColors(colorList);

  fill(colorList[0]);
  triangle(x + block.width/2, y + block.height/2, x + block.width, y + block.height/2, x+block.width, y + block.height);
  colorList = shiftColors(colorList);

  fill(colorList[0]);
  triangle(x + block.width/2, y + block.height/2, x+block.width, y + block.height, x + block.width/2, y + block.height);
  colorList = shiftColors(colorList);

  fill(colorList[0]);
  triangle(x + block.width/2, y + block.height/2, x + block.width/2, y + block.height, x, y + block.height);
  colorList = shiftColors(colorList);

  fill(colorList[0]);
  triangle(x + block.width/2, y + block.height/2, x, y + block.height, x, y + block.height/2);
  colorList = shiftColors(colorList);

  fill(colorList[0]);
  triangle(x + block.width/2, y + block.height/2, x, y + block.height/2, x, y);
  colorList = shiftColors(colorList);


}

function shiftColors(list){
  let c = list.shift();
  list.push(c);
  return list
}

function randomColor(){
  return color(random(0, 255), random(0, 255), random(0, 255));
}
