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
    c.angle = map(noise(c.x * 0.005, c.y * 0.005, n), 0, 1, 0, TWO_PI);
    c.draw();
  }
  n += 0.005;

  
  // fill(0);
  // push();
  // translate(width/2, height/2);
  // rotate(angle);
  // ellipse(50, 50, 200, 200);
  // pop();
  
  // angle = map(noise(n), 0, 1, 0, TWO_PI);

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
 
// how many frames to get around? 


function keyPressed(){
  let numFrames  = floor(TWO_PI/angleStep); 
  if(key == "g"){
    saveGif('thumb', numFrames, { units: "frames" });
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
  }

  draw(){
    push();
    translate(this.x, this.y)
    rotate(this.angle); 
    fill(0);
    ellipse(0, 0, this.w, this.h);
    fill(255);
    ellipse(this.w/6, this.h/6, this.w, this.h);
    pop();
  }


}

