let squares = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  
  setupGrid();
  
}

function setupGrid(){
  let numRows = 50;

  let sqSize = height / numRows;
  print(sqSize);
  let numCols = 50;
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      squares.push(new Square(j * sqSize, i * sqSize, sqSize));  
    }
  }
}

function draw() {
  background(255);

  for(let s of squares){
    s.draw();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Square {
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.setColor();
  }
  
  setColor(){
   //each square has the chance to turn white, but only if a dice roll is less than a threshold 
    let threshold; 
    let binSize = width/10; 
    
    let xDist = abs(width/2 - (this.x + this.size/2));
    let yDist = abs(height/2 - (this.y + this.size/2));

    print(xDist, yDist)
     
    if(xDist < binSize && yDist < binSize){
      threshold = 1;
    } else if (xDist < binSize * 2 && yDist < binSize * 2){
      threshold = 0.8;
    } else if (xDist < binSize * 3 && yDist < binSize * 3){
      threshold = 0.75;
    } else if (xDist < binSize * 4 && yDist < binSize * 4){
      threshold = 0.5; 
    } else {
      threshold = 0.25;
    }

    let dice = random();
    if(dice > threshold){
      this.color = 255;
    } else {
      this.color = 0;
    }
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.size);
  }

}
