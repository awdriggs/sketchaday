let cells = [];
let n = 0;
let angleStep = 0.05;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  let numCols = 10; 
  let numRows = 10;
  let margin = 10;
  let cellWidth = (width - margin * 2)/numCols;
  let cellHeight = (height - margin * 2)/numRows;
   
  
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let x = j * cellWidth + cellWidth/2 + margin ; 
      let y = i * cellHeight + cellHeight/2 + margin;

      cells.push(new Circle(x, y, cellWidth * 0.7, cellHeight * 0.7, 0));
    }
  }

  noStroke();
}

function draw() {
  background(255);
   
  for(let i = 0; i < cells.length; i++){
    let c = cells[i]
    // c.angle = map(noise(c.x * 0.005, c.y * 0.005, n), 0, 1, 0, TWO_PI);
    c.draw();
  }
  
  fill(200);
  ellipse(mouseX, mouseY, 5, 5);

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

class Circle {
  constructor(x, y, w, h, a){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = a;
    this.distance = this.w/6;
  }

  draw(){
    this.angle = this.setAngle();
    push();
    translate(this.x, this.y)
    rotate(this.angle); 
    fill(0);
    ellipse(0, 0, this.w, this.h);
    fill(255);

    this.distance = this.setDist();
    ellipse(this.distance, this.distance, this.w, this.h);
    pop();
  }

  setAngle(){
    return atan2(mouseY - this.y, mouseX - this.x);
  }

  setDist(){
    let distance = dist(this.x, this.y, mouseX, mouseY);
    let mappedDist = map(distance, 0, 1131, 0, this.w/2, true);
    return mappedDist;
  }

}

