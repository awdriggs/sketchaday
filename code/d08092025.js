//smaller inner square with a grid of squares

let margin;
let numCols, numRows;
let innerWidth, innerHeight;
let cellSize, borderSize;
let nValue = 0;

let colors = [];

function setup() {
  createCanvas(800, 800);
  margin = width/6;
  // createCanvas(windowWidth, windowHeight);

  numRows = 20;
  numCols = 20;


  innerWidth = width - 2 * margin;
  innerHeight = height - 2 * margin;

  borderSize = innerWidth / numCols;
  cellSize = borderSize * 0.5;

  rectMode(CENTER);
  noStroke();
  blendMode(HARD_LIGHT)
   
   
  // blendMode(MULTIPLY)
  // blendMode(SOFT_LIGHT)
   
  // blendMode(OVERLAY)

  // strokeWeight(2.5);
  // let rgb = [color(255, 0, 0,50), color(0, 255, 0,50), color(0, 0, 255,50)];
  for(let i = 0; i < numRows * numCols; i++){

    // let index = floor(random(0, rgb.length))
    // let r = floor(random(0, 3));
    // let a = random(100, 200);
    let g = random(0, 255);
    let b = random(100, 255);
    // let c;
    // if(r == 0){
    //   c = color(255, 0, 0, a);
    // } else if(r == 1){
    //   c = color(0, 255, 0, a);
    // } else {
    //   c = color(0, 0, 255, a);
    // }
  
      c = color(0, g, b);
    // debugger;
    
    // let r = random(0, 255)
    // let g = random(0, 255)
    // let b = random(0, 255)
    // let a = 50 
    // debugger;
    colors.push(c);
  }
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

      let cIndex = j * numCols + i;
      let c = colors[cIndex];

      push();
      translate(x,y);
      noiseDetail(1, 0.5);
      let angle = map(noise(j/10, i/10, nValue), 0, 1, -TWO_PI, TWO_PI);
      rotate(angle);


      fill(0, map(angle, -TWO_PI, TWO_PI, 0, 255), map(angle, -TWO_PI, TWO_PI, 255, 0));
      rect(0,0, cellSize/1.5, cellSize * 2, cellSize * 1.5);

      // ellipse(0,0, 2, 2);


      //left top corner
      // rect(0 - cellSize, - cellSize, cellSize * 2, cellSize * 2);
      // let rotatedCorner = localCorner.copy().rotate(angle);
      // let globalCorner = p5.Vector.add(createVector(x, y), rotatedCorner);


      // console.log(globalCorner.x, globalCorner.y);

      
      // points.push({x: globalCorner.x, y: globalCorner.y})

      pop();

      noFill();

      // rect(globalCorner.x - borderSize, globalCorner.y - borderSize, borderSize * 2, borderSize * 2);
      // fill("red");
      // debugger;
      // ellipse(points[j].x, points[j].y, 2, 2);
      if(points.length > 1){
        // stroke("red");
        // line(points[j].x, points[j].y, points[j-1].x, points[j-1].y);
      }

      if(grid.length > 0){
        // stroke("green");
        // line(grid[i-1][j].x, grid[i-1][j].y, points[j].x, points[j].y);
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