let numCols, slantWidth;

let motionX = 0, motionY = 0;
let dir = 1;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols =  10;
  numRows = 10;

  slantWidth = width/numCols;
  rowHeight = height/numRows;

}

function draw() {
  background(255);

  stroke('red');

  for(let i = -numRows * 2; i < numRows * 2; i++){
    for(let j = -numCols * 2; j < numCols * 2; j++){

      let x = j * slantWidth + motionX;
      let y = i * rowHeight + motionY;

      if(j % 2 == 0){
        fill(0);
        quad(x, y,  x + slantWidth, y, x, y + rowHeight, x - slantWidth, y + rowHeight);
      }

      // fill(255);
      // noStroke();
      // x = width - mouseX;
      // quad(x, 0,  x - slantWidth, 0, x, height, x + slantWidth, height);

    }
  }

  motionX += 1 * dir;
  motionY += 1 * dir;
   
  if(frameCount % width == 0){
    dir *= -1;
  }


}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 5)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}