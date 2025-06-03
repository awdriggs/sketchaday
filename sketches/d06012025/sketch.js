let nest = [];
let numLines = 5;
let growth = 10;

function setup() {
  print("working");
  createCanvas(800, 800);
   
  generateNest();
  // createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  //loop through nest, draw each line in the nest 
  noFill();
  for(let l of nest){
    beginShape();
    for(let p of l){
      ellipse(p.x, p.y, 10, 10);
      vertex(p.x, p.y);
    }
    endShape();
  }
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


function generateNest() {
  let c = createVector(width / 2, height / 2);

  for (let i = 0; i < numLines; i++) {
    let middlePoint = p5.Vector.random2D();
    middlePoint.setMag(random(0, 100));
    middlePoint.add(c);

    let line = [];

    // ---- Positive Growth ----
    let posGrowth = [];
    let lastPoint = middlePoint.copy();
    let dir = p5.Vector.random2D();

    for (let j = 0; j < growth; j++) {
      let newDir = dir.copy().rotate(random(-PI / 10, PI / 10)).setMag(20);
      let newPoint = p5.Vector.add(lastPoint, newDir);
      posGrowth.push(newPoint);
      lastPoint = newPoint;
      dir = newDir;
    }

    // ---- Negative Growth ----
    let negGrowth = [];
    lastPoint = middlePoint.copy();
    dir.rotate(PI); // reverse direction

    for (let j = 0; j < growth; j++) {
      let newDir = dir.copy().rotate(random(-PI / 10, PI / 10)).setMag(20);
      let newPoint = p5.Vector.add(lastPoint, newDir);
      negGrowth.unshift(newPoint); // prepend
      lastPoint = newPoint;
      dir = newDir;
    }

    // Combine all parts
    line = [...negGrowth, middlePoint, ...posGrowth];
    nest.push(line);
  }
}

