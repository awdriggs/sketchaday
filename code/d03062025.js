let pattern = [{d: "r", c: 5}, {d: "d", c: 3}, {d: "r", c: 2}, {d: "d", c: 1}];
let pIndex = 0;
let pCount = 0;

let cells = [];
let cIndex = 0;

let numRows, numCols;
let size;

let currentColor;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  
  numRows = 20;
  numCols = 20;
  size = width/numRows;

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      cells.push(new cell(j * size, i * size, size, "#FFFFFF"));  
    }
  }

  currentColor = randomColor();

  noStroke();
}

function draw() {
  background(255);
 

  for(let c of cells){
    c.draw();
  }

  // if(frameCount == 1){
  //   print("start");
  //   saveGif('thumb', 11);
  // }
  if(frameCount % 1 == 0){
    drawPattern(); 
    pCount++;
    // print(pCount);

    if(pCount >= pattern[pIndex].c){
      // print("step pattern");
      pIndex++;
      pCount = 0;

      if(pIndex > pattern.length - 1){
        pIndex = 0;
      }
    }
  }
}

function randomColor(){
  return color(random(0,255), random(0,255), random(0,255));
}

function drawPattern(){
  // print(cIndex);
  cells[cIndex].fill = currentColor;   

  if(pattern[pIndex].d == "r") {
    cIndex++;
  } else if(pattern[pIndex].d == "l") {
    cIndex--;
  } else if(pattern[pIndex].d == "u") {
    cIndex -= numCols;
  } else if(pattern[pIndex].d ==  "d") {
    cIndex += numCols;
  }

  if(cIndex > cells.length - 1) {
    //find how far over you went
    cIndex = cIndex - cells.length;
    currentColor = randomColor();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
} 

class cell {
  constructor(x, y, s, f){
    this.x = x;
    this.y = y;
    this.size = s;
    this.fill = f;
  }

  draw(){
    fill(this.fill);
    rect(this.x, this.y, this.size, this.size);
  }
}