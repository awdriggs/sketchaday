let grid = []; // a gird of "spaces"
let numCols, numRows
let colors = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  colors = ["#FA3BF099", "#FFED2999", "#1BFC0699", "#30C5FF99", "#FF5C0099", "#8A00C499"];

  numCols = 10;
  numRows = 10;

  let margin = width/10;

  let gridW = (width - margin)/numCols;
  let gridH = (height - margin)/numRows;

  for(let i = 0; i < numRows; i++){
    let y = margin/2 + i * gridH;
    for(let j = 0; j < numCols; j++){
      let x = margin/2 + j * gridW;
      grid.push({x, y, w: gridW, h: gridH, on: random() > 0.5 ? true : false});
    }
  }

}

function draw() {
  background(255);
  let update = false;
  if(frameCount % 60 == 0) update = true;

  for(let c of grid){
    if(update){
      if(random() > 0.8){
        c.on = !c.on; //toggle
      }
    }
    if(c.on){
      ellipse(c.x + c.w/2, c.y + c.h/2, 10, 10);
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

