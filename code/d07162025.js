let numCols, slantWidth;

let motionX = 0, motionY = 0;
let dir = 1;
let c1, c2;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols =  10;
  numRows = 10;

  slantWidth = width/numCols;
  rowHeight = height/numRows;

  c1 = "black";
  c2 = "yellow"; 

}

function draw() {
  background(255);

  // stroke('red');
  noStroke();

  let flipFlop = 0;
  for(let i = -numRows * 2; i < numRows * 2; i++){
    for(let j = -numCols * 2; j < numCols * 2; j++){

      let x = j * slantWidth;
      let y = i * rowHeight;

      if(j % 2 == 0){
        fill(c1);
      } else {
        fill(c2)
        // fill(252,225,1)
      }

      quad(x, y,  x + slantWidth, y, x, y + rowHeight, x - slantWidth, y + rowHeight);

      // fill(255);
      // noStroke();
      // x = width - mouseX;
      // quad(x, 0,  x - slantWidth, 0, x, height, x + slantWidth, height);

    }

      // flipFlop++
  }

  motionX += 1 * dir;
  motionY += 1 * dir;

  if(frameCount % 20 == 0){
    let tempColor = c2;
    c2 = c1;
    c1 = tempColor;
  }


}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 2);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}