//smaller inner square with a grid of squares

let margin;
let numCols, numRows;
let innerWidth, innerHeight;
let cellSize, borderSize;
let nValue = 0;

let rowData = [];
let noiseSeeds = [];

function setup() {
  createCanvas(800, 800);
  margin = width/6;
  // createCanvas(windowWidth, windowHeight);

  numRows = 10;
  numCols = 10;

  innerWidth = width - 2 * margin;
  innerHeight = height - 2 * margin;

  borderSize = innerWidth / numCols;
  cellSize = borderSize * 0.5;

  frameRate(2);

  for(let i = 0; i < numRows; i++){
    rowData.push(floor(random(10, 18)));
  }

  noiseSeed[0] = random(0, 5000);

}

function draw() {
  background(255);

  fill(0);
  for(let i = 0; i < numRows; i++){
    //for each row, scale stays the same
    //calculate how many columns there should be
    numCols = rowData[i]; //old num of colums

    //abstract this? 
    //roll a dice, > 0.5 increase rows, else decreas
    if(random() > 0.5){
      numCols++;
    } else {
      numCols--;
    }

    numCols = constrain(numCols, 5, 18);

    rowData[i] = numCols; //reassign for next loop

    //calculate spacing between the rects 
    xOffset = innerWidth / numCols;
    //calculate the rotation for each row.
    noiseSeed(noiseSeeds[0]);
    let angle  = map(noise(i/10, nValue), 0, 1, -TWO_PI, TWO_PI);
    
    for(let j = 0; j < numCols; j++){
      let x = j * xOffset + margin + cellSize/2;
      let y = i * borderSize + margin + cellSize/2;
      
      push();
      translate(x,y);
      rotate(angle);
      rect(0 - cellSize/2, - cellSize/2, cellSize, cellSize);
      pop();
    }
  }

  nValue += 0.01;
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}