//smaller inner square with a grid of squares

let margin;
let numCols, numRows;
let innerWidth, innerHeight;
let cellSize, borderSize;
let nValue = 0;

function setup() {
  createCanvas(800, 800);
  margin = width/6;
  // createCanvas(windowWidth, windowHeight);

  numRows = 50;
  numCols = 50;


  innerWidth = width - 2 * margin;
  innerHeight = height - 2 * margin;

  borderSize = innerWidth / numCols;
  cellSize = borderSize * 0.5;

  strokeWeight(2.5);
}

function draw() {
  background(255);

  fill(0);

  let grid = [];
  for(let i = 0; i < numRows; i++){
    let points = [];
    for(let j = 0; j < numCols; j++){
      let x = j * borderSize + margin + cellSize/2;
      let y = i * borderSize + margin + cellSize/2;

      push();
      translate(x,y);
      noiseDetail(2, 0.75);
      let angle = map(noise(j/10, i/10, nValue), 0, 1, -TWO_PI, TWO_PI);
      rotate(angle);
      noStroke();
      fill(0);
      // rect(0 - cellSize/2, - cellSize/2, cellSize, cellSize);

      //left top corner
      let localCorner = createVector(-cellSize/2, -cellSize/2);
      let rotatedCorner = localCorner.copy().rotate(angle);
      let globalCorner = p5.Vector.add(createVector(x, y), rotatedCorner);

      console.log(globalCorner.x, globalCorner.y);

      
      points.push({x: globalCorner.x, y: globalCorner.y})

      pop();
      // fill("red");
      // debugger;
      ellipse(points[j].x, points[j].y, 2, 2);
      if(points.length > 1){
        // stroke("red");
        line(points[j].x, points[j].y, points[j-1].x, points[j-1].y);
      }

      if(grid.length > 0){
        // stroke("green");
        line(grid[i-1][j].x, grid[i-1][j].y, points[j].x, points[j].y);
      }
    }
    
    grid.push(points);

    // debugger;
      
  }

  nValue += 0.01;
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

