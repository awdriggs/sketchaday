let n, multipler;
let numCols, numRows;
let colWidth, rowHeight;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
   multipler = 5;
  n = 0;
  
  numCols = 100;
  numRows = 100;

  colWidth = width/numCols;
  rowHeight = height/numRows;
  
  // noLoop();
}

function draw() {
  background(255);
  
  // let vertices = []
  for(let i = 0; i < numRows; i++){
  // beginShape(LINES); 
    let vertices = [];
    for(let j = 0; j < numCols; j++){
      let noiseValue = noise(i, j, n);
      let x = j * colWidth;
      let y = i * rowHeight + noiseValue * multipler;
      // debugger;
      vertices.push({x: x, y:y}); 
      
      if(vertices.length > 1){
        line(vertices[j-1].x, vertices[j-1].y, vertices[j].x, vertices[j].y);
      }
    }
    // endShape();
  }

  n += 0.01;
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}