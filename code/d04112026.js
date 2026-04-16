let grid = [];
let flipper = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  
  grid = makeCells();
  noFill();
  strokeWeight(4);
}

function draw() {
  background(255);
  
  for(let c of grid){
    // rect(c.x, c.y, c.w, c.h); 
    if(c.slash){
      // line(c.x, c.y, c.x + c.w, c.y + c.h);
      line(c.x, c.y, c.x + c.w * 100 * c.slash.xDir, c.y + c.h * 100 * c.slash.yDir);
    }
  }

  if(frameCount % 60 == 0){
    grid = makeCells();
  }
   
}

function makeCells(){
  flipper++;
  let cells = []
  let numCols = 10;
  let numRows = 10;
  let cellWidth = width/numCols;
  let cellHeight = height/numRows;
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let dir;
      let dice = random() < 0.3 ? true : false;
      if(dice){
        let yDir = random() < 0.5 ? 1 : -1;
        let xDir = random() < 0.5 ? 1 : -1;
        // let yDir = flipper % 2 == 0 ? 1 : -1;
        // let xDir = flipper % 2 == 0 ? 1 : -1;
        // let xDir = flipper % 4 == 0 ? 1 : -1;
        dir = {xDir: xDir, yDir: yDir};
      }
      cells.push({x: j * cellWidth, y: i * cellHeight, w: cellWidth, h: cellHeight, slash: dir});
    }
  }

  return cells;
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

