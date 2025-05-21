let freq, amp, yOffset, numLines
let sub1, sub2; //vars for the sub images 
let hOffset = 0;
let ampStep = 0;
let cellSize;
let resolution = 100;

let circRows, circCols, circWidth, circHeight;
let nx = 0, ny = 0, nt = 0; //time value for noise
let nSeed1, nSeed2

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  amp = height/10;
  freq = width/100;
  numLines = 50;
   
  yOffset = height/numLines;

  numCols = 5;
  numRows = 5;
  cellWidth = width/numCols;
  cellHeight = height/numRows;

  sub1 = createGraphics(width, height);
  sub2 = createGraphics(width, height);
  
  nSeed1 = random(0, 100);
  nSeed2 = random(0, 100);

  //setup for the circles...

  circRows = 20;
  circCols = 20;
  circWidth = width/circCols;
  circHeight = height/circRows;

  print(circRows, circCols, circWidth, circHeight);
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
        img = sub1 
      } else {
        img = sub2 
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
  
  circScalar = 0.8;


  sub1.background(255);
  sub1.fill(0);
  noiseSeed(nSeed1); 
  for (let i = -1; i < circRows + 1; i++) {
    for (let j = -1; j < circCols + 1; j++) {
      let origin = createVector(j * circWidth + circWidth * circScalar, i * circHeight + circHeight * circScalar);

      let angle = noise(j * 0.1, i * 0.1, nt) * TWO_PI;
      let radius = map(noise(j * 0.1 + 99, i * 0.1 + 99, nt), 0, 1, 0, cellWidth/2); // displacement

      let offset = p5.Vector.fromAngle(angle).mult(radius);
      let displaced = p5.Vector.add(origin, offset);

      sub1.ellipse(displaced.x, displaced.y, circWidth * circScalar, circHeight * circScalar);
    }
  }



  sub2.background(0);
  sub2.fill(255);
  sub2.noStroke();
  noiseSeed(nSeed2); 
  for (let i = -1; i < circRows + 1; i++) {
    for (let j = -1; j < circCols + 1; j++) {
      let origin = createVector(j * circWidth + circWidth * circScalar, i * circHeight + circHeight * circScalar);

      let angle = noise(j * 0.1, i * 0.1, nt) * TWO_PI;
      let radius = map(noise(j * 0.1 + 99, i * 0.1 + 99, nt), 0, 1, 0, cellWidth/2); // displacement

      let offset = p5.Vector.fromAngle(angle).mult(radius);
      let displaced = p5.Vector.add(origin, offset);

      sub2.ellipse(displaced.x, displaced.y, circWidth * circScalar, circHeight * circScalar);
    }
  }

  nt += 0.01;
}
