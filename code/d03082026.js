//worbley noise  on a grid, not per pixel
let featurePoints = [];
let maxDist;
let gridHeight, gridWidth;
// let slider;

function setup() {
  createCanvas(800, 800);
  maxDist = sqrt(width * width + height * height);
  print(maxDist); 
  // createCanvas(windowWidth, windowHeight);
  featurePoints = poisson(width, height, 200);

    // noLoop();

  // Create a slider and place it at the top of the canvas.
  // slider = createSlider(1, 100);
  // slider.position(10, 10);
  // slider.size(80);
  noStroke();

}

function draw() {

  let numCols = floor(map(mouseX, 0, width, 1, 100, true));
  let numRows = floor(map(mouseY, 0, height, 1, 100, true));

  // let numRows =  10
  // let numCols =  10
  
  gridHeight = height/numRows;
  gridWidth = width/numCols;

  background(255);
  loadPixels();
  for(let y = 0; y < height; y+= gridHeight){
    for(let x = 0; x < width; x+= gridWidth){
      let minDist = Infinity

      for(let p of featurePoints){
        let d = dist(x + gridWidth/2, y + gridHeight/2, p.x, p.y);
        if(d < minDist){
          minDist = d;
        }
      }

      brightness = map(minDist, 0, 400, 255, 0);

      fill(255, brightness, 255);
      rect(x,y,gridWidth, gridHeight);
    }
  }

}

function setPoints(numPoints){
let pointsList = [];
 for(let i = 0; i < numPoints; i++){
    let x = random(0, width);
    let y = random(0, height);

    pointsList.push(createVector(x, y));
 }
  return pointsList;

}

function mousePressed(){
  featurePoints = poisson(width, height, 200);
  redraw();
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

