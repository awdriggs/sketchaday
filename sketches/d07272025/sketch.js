let n, multipler;
let numCols, numRows;
let colWidth, rowHeight;
let colors;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  n = 0;
  
  numCols = 100;
  numRows = 80;

  colWidth = width/numCols;
  rowHeight = height/numRows;

  multipler = rowHeight;

  //build the array for the colors
  colors = [];
  for(let i = 0; i < numRows; i++){
    colors.push(color(random(0, 255), random(0,255), random(0,255))); 
  }

  console.log(colors);
  // noLoop();
  noStroke();
}

function draw() {
  background(255);
  
  // let vertices = []
  for(let i = 0; i < numRows; i++){
    fill(colors[i]);
    beginShape(); 
    // let vertices = [];
    for(let j = 0; j < numCols; j++){
      let noiseValue = noise(i/100, j/100, n);
      let x = j * colWidth;
      let y;

      if(noiseValue > 0.5){
        y = i * rowHeight + noiseValue * multipler;
      } else {
        y = i * rowHeight;
      }
        // y = i * rowHeight - noiseValue * multipler;
        // y = i * rowHeight - noiseValue * noiseValue * multipler;
      // debugger;
      // vertices.push({x: x, y:y}); 
      vertex(x,y)
      
      // if(vertices.length > 1){
      //   line(vertices[j-1].x, vertices[j-1].y, vertices[j].x, vertices[j].y);
      // }


    }
    vertex(width, i * rowHeight);
    vertex(width, height);
    vertex(0, height);
    endShape();
  }

  n += 0.01;
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

