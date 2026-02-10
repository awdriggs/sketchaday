let cells = [];
let angle = 0;
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

      cells.push({x: x, y: y, w: cellWidth * 0.7, h: cellHeight * 0.7});
    }
  }
}

function draw() {
  background(255);
   
  for(let c of cells){
    push();
    translate(c.x, c.y)
    rotate(angle); 
    fill(0);
    ellipse(0, 0, c.w, c.h);
    fill(255);
    ellipse(c.w/4, c.h/4, c.w, c.h);
    pop();
  }

  angle += angleStep;
  
  // fill(0);
  // push();
  // translate(width/2, height/2);
  // rotate(angle);
  // ellipse(50, 50, 200, 200);
  // pop();
  
  // angle = map(noise(n), 0, 1, 0, TWO_PI);

  // n+=0.01
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

