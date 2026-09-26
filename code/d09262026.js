let grid = []; // a gird of "spaces"
let numCols, numRows
let hColors = [];
let vColors = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  // colors = ["#FA3BF099", "#FFED2999", "#1BFC0699", "#30C5FF99", "#FF5C0099", "#8A00C499"];

  numCols = 10;
  numRows = 10;

  for(let i = 0; i < numCols; i++){
    hColors.push(color(random(255), random(255), random(255), 150));
  }

  for(let i = 0; i < numRows; i++){
    vColors.push(color(random(255), random(255), random(255), 150));
  }

  let margin = width/10;

  let gridW = (width - margin)/numCols;
  let gridH = (height - margin)/numRows;

  for(let i = 0; i < numRows; i++){
    let y = margin/2 + i * gridH;
    for(let j = 0; j < numCols; j++){
      let x = margin/2 + j * gridW;
      grid.push({x, y, w: gridW, h: gridH});
    }
  }

  strokeWeight(30 * width/800);
  // strokeWeight(gridW);
  strokeCap(SQUARE);

}

function draw() {
  background(255);
  let update = false;
  // if(frameCount % 60 == 0) update = true;

  // for(let c of grid){
  //   stroke(colors[0]);  
  //   line(c.x, c.y + c.h/2, c.x + c.w, c.y + c.h/2);
  //   stroke(colors[1]);
  //   line(c.x + c.w/2, c.y, c.x + c.w/2, c.y + c.h);
  // }

    for (let idx = 0; idx < grid.length; idx++) {
    let c = grid[idx];
    let i = floor(idx / numCols);
    let j = idx % numCols;

    if ((i + j) % 2 == 0) {
      stroke(hColors[i % hColors.length]);
      line(c.x, c.y + c.h/2, c.x + c.w, c.y + c.h/2);
      stroke(vColors[(j + floor(vColors.length / 2)) % vColors.length])
      line(c.x + c.w/2, c.y, c.x + c.w/2, c.y + c.h);
    } else {
      // colors[(j + floor(colors.length / 2)) % colors.length]
      stroke(vColors[(j + floor(vColors.length / 2)) % vColors.length])
      line(c.x + c.w/2, c.y, c.x + c.w/2, c.y + c.h);
      stroke(hColors[i % hColors.length]);
      line(c.x, c.y + c.h/2, c.x + c.w, c.y + c.h/2);
    }
  }

  if(frameCount % 60 == 0){
    vColors = shuffle(vColors);
    hColors = shuffle(hColors);
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

// function mousePressed(){
//   colors = shuffle(colors);
// }

