let numCols, slantWidth;

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

  for(let i = 0; i < numRows; i++){
    for(let j = -numCols * 2; j < numCols * 2; j++){

      let x = j * slantWidth + mouseX;
      let y = i * rowHeight;

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

