let numRows, numCols;
let cellSize;
let widths = [];
let heights = [];
let strokeIndex = 0;
let count

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numRows = 20;
  numCols = 20;
  cellSize = width/numRows; //squares

  count = numRows * numCols;

  noStroke();
  rectMode(CENTER)



  for(let i = 0; i < count + 1; i++){

    let scaled = map(i, 0, count, 0, TWO_PI)
    let a = cos(scaled);

    widths.push(map(a, -1, 1, 0.5, cellSize/2));
    heights.push(map(a, -1, 1, cellSize/2, 1));
  }

}

function draw() {
  background(255);
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){

      if ((i + j) % 2 == 0) {
        fill("blue"); // White squares
        rect(j * cellSize + cellSize/2, i * cellSize + cellSize/2, widths[strokeIndex], cellSize);
        fill("red"); // Black squares
        rect(i * cellSize + cellSize/2, j * cellSize + cellSize/2, cellSize, heights[strokeIndex]);
      } else {
        fill("red"); // Black squares
        rect(i * cellSize + cellSize/2, j * cellSize + cellSize/2, cellSize, heights[strokeIndex]);
        fill("blue"); // White squaresj
        rect(j * cellSize + cellSize/2, i * cellSize + cellSize/2, widths[strokeIndex], cellSize);

      }

      strokeIndex++;
      if(strokeIndex >= count){
        strokeIndex = 0;
      }

    }

    // if(frameCount % 30 == 0){
      // strokeIndex++;
      // if(strokeIndex >= count){
      //   strokeIndex = 0;
      // }
    // }

    // strokeIndex++;
    // if(strokeIndex >= count){
    //   strokeIndex = 0;
    // }


  }

    shiftStrokes();
}


function shiftStrokes(){
  // print(widths);
  let last = widths.shift();
  widths.push(last);

  let first = heights.shift();
  heights.push(first);
  // print(widths);
  // debugger;
  print("shifted");
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', count, { units: 'frames' });
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}