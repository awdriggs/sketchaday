//grid with jitter
let points =  [];
let maxWidth;
let numRows = 10;
let numCols = 10;
let cellWidth, cellHeight;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  cellWidth = width/numCols;
  cellHeight = height/numRows;
  maxWidth = cellWidth * 0.8


  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let xOffset = random(-cellWidth * 0.25, cellWidth * 0.25);
      let yOffset = random(-cellHeight * 0.25, cellHeight * 0.25);
      let p = createVector(j * cellWidth + cellWidth/2 + xOffset, i * cellHeight + cellHeight/2 + yOffset, cellWidth/2);
      points.push(p);
    }
  }

  noFill();
}

function draw() {
  background(255);

  // for(let p of points){
  //   if(checkMouse(p)){
  //     if(p.z < maxWidth){
  //       p.z += 0.5;
  //     }


  //   }

  //   ellipse(p.x, p.y, p.z, p.z);
  // }
  noFill();
  stroke(0);
  for(let r = 0; r < numRows; r++){
    for(let c = 0; c < numCols; c++){
      let p = points[r * numCols + c];
      if(c < numCols - 1){
        let right = points[r * numCols + c + 1];
        line(p.x, p.y, right.x, right.y);
      }
      if(r < numRows - 1){
        let down = points[(r + 1) * numCols + c];
        line(p.x, p.y, down.x, down.y);
      }
      ellipse(p.x, p.y, p.z, p.z);

      if(checkMouse(p)){
        // let p = createVector(j * cellWidth + cellWidth/2 + xOffset, i * cellHeight + cellHeight/2 + yOffset, cellWidth/2);
        let xOffset = random(-cellWidth * 0.25, cellWidth * 0.25);
        let yOffset = random(-cellHeight * 0.25, cellHeight * 0.25);
        p.x = c * cellWidth + cellWidth/2 + xOffset;
        p.y = r * cellHeight + cellHeight/2 + yOffset;
      }
    }
  }

 noStroke();
  fill(220);
  ellipse(mouseX, mouseY, 10, 10);


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

function checkMouse(p){
  if(dist(mouseX, mouseY, p.x, p.y) < p.z/2){
    return true;
  } else return false;

  // if(random() < 0.05){
  //   return true;
  // } else return false;
}

