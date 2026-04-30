//grid with jitter
let points =  [];
let maxWidth;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  let numRows = 10;
  let numCols = 10;
  let cellWidth = width/numCols;
  let cellHeight = height/numRows;
  maxWidth = cellWidth * 0.8


  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let xOffset = random(-cellWidth * 0.25, cellWidth * 0.25);
      let yOffset = random(-cellHeight * 0.25, cellHeight * 0.25);
      let p = createVector(j * cellWidth + cellWidth/2 + xOffset, i * cellHeight + cellHeight/2 + yOffset, random(cellWidth * 0.2, cellWidth * 0.8));
      points.push(p);
    }
  }
}

function draw() {
  background(255);

  for(let p of points){
    if(checkMouse(p)){
      if(p.z < maxWidth){
        p.z += 0.5;
      }


    }

    ellipse(p.x, p.y, p.z, p.z);
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

function checkMouse(p){
  if(dist(mouseX, mouseY, p.x, p.y) < p.z/2){
    return true;
  } else return false;

  // if(random() < 0.05){
  //   return true;
  // } else return false;
}

