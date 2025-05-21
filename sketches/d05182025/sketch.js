let freq, amp, yOffset, numLines
let verticalWaves, horiziontalWaves
let hOffset = 0;
let ampStep = 0;
let cellSize;
let resolution = 100;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  amp = height/10;
  freq = width/100;
  numLines = 50;
   
  yOffset = height/numLines;

  numCols = 10;
  numRows = 10;
  cellWidth = width/numCols;
  cellHeight = height/numRows;

  verticalWaves = createGraphics(width, height);
  horiziontalWaves = createGraphics(width, height);
}

function draw() {
  background(255);

  generate();

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let img;
      let x = j * cellWidth;
      let y = i * cellWidth;
      if ((i + j) % 2 === 0) {
        // fill(0);
        img = horiziontalWaves
      } else {
        img = verticalWaves
        // img = surface2
      }
      let subimg = img.get(x, y, cellWidth, cellHeight);
      image(subimg, x, y);
      // rect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
    }
  }

  // let points = [];
  // line(0, height/2, width, height/2);

  // hOffset -= 0.01;
  ampStep += 0.05;

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 9)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function generate(){
  verticalWaves.background(255);
  for(let h = -10; h < numLines + 10; h++){
    let linePoints = []
    for(let i = 0; i < resolution; i++){
      let x = sin(i/freq) * (amp * cos(ampStep)) + (h * yOffset);
      let y = map(i, 0, resolution, 0, height + 10);

      linePoints.push({x: x, y: y}); //add the point to the line

      verticalWaves.stroke("red");
      if(i > 0){
        let curr = linePoints[i];
        let prev = linePoints[i-1];
        verticalWaves.line(curr.x, curr.y, prev.x, prev.y);
      }
    }
  }

  horiziontalWaves.background(255);
  for(let h = -10; h < numLines + 10; h++){
    let linePoints = []
    for(let i = 0; i < resolution; i++){
      let y = cos(i/freq) * (amp * sin(ampStep)) + (h * yOffset);
      let x = map(i, 0, resolution, 0, width + 10);

      linePoints.push({x: x, y: y}); //add the point to the line

      horiziontalWaves.stroke("blue");
      if(i > 0){
        let curr = linePoints[i];
        let prev = linePoints[i-1];
        horiziontalWaves.line(curr.x, curr.y, prev.x, prev.y);
      }
    }
  }
  // for(let h = 0; h < numLines + 2; h++){
  //   // let waveDir = h % 2 == 0 ? -1 : 1;
  //   for(let i = 0; i < width; i++){
  //     let x = i;
  //     let y = cos(i/freq) * (amp * sin(ampStep)) + (h * yOffset);
  //     horiziontalWaves.ellipse(x, y, 2, 2);
  //   }
  // }
}

