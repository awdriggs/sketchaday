//psuedo code
//make a way to single 4 x 22 block that represents the threading pattern
//makde a 22 x 1 block that represents the threading color
//make it so the when you click one of the blocks in the threading array you can choose a color
//make it when you click one of the blocks in the threading pattern you toggle it black to white

//structure of the data
//threading pattern
let threadingPattern = [];

let cellSize;

for(let i = 0; i < 22; i++){
  console.log(i);
  let column = [];
  for(let j = 0; j < 4; j++){
    column.push(1);
    // console.log(j);
    // threadingPattern[i][j] = 0;
  }
  threadingPattern.push(column);

}

// console.log(threadingPattern);

function setup() {
  createCanvas(600, 600);

  cellSize = width/threadingPattern.length;
  print(cellSize);
  // createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(255);
  //visualize threading pattern

  //cols
  for(let i = 0; i < threadingPattern.length; i++){
    let col = threadingPattern[i];
    for(let j = 0; j < col.length; j++){
      fill(threadingPattern[i][j] * 255); //its either 0 or 1
      rect(cellSize * i, cellSize * j, cellSize, cellSize);
    }
  }
}

function mousePressed() {
  //check to see which part of the sketch has been pressed
  print("pressed");
  //thrading pattern, check to see which cell has been pressed
  for(let i = 0; i < threadingPattern.length; i++){
    let column = threadingPattern[i];
    for(let j = 0; j < column.length; j++){
      if(mouseX > i * cellSize && mouseX < i * cellSize + cellSize && mouseY > j * cellSize && mouseY < j * cellSize + cellSize){
        if(threadingPattern[i][j] == 0){
          threadingPattern[i][j] = 1;
        } else {
          threadingPattern[i][j] = 0;
        }
      }
    }
  }
}



// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
