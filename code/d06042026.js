let points = [];
let sideWidth, sideHeight;
let num = 2;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  let numPoints = num;
  makePoints(numPoints);

  strokeWeight(3);
}

function draw() {
  background(255);

  // beginShape
  // beginShape(TRIANGLE_STRIP);
  beginShape(QUAD_STRIP);
  for(let p of points){
    // rect(p.x, p.y, sideWidth, sideHeight);
    // ellipse(p.x, p.y, 10, 10);
    vertex(p.x, p.y + sideHeight/2);
    vertex(p.x, p.y - sideHeight/2);
  }
  endShape();

  if(frameCount % 60 == 0){
    num++;
    makePoints(num);

    if(num > 10){ //reset for next round
      num = 1;
    }
  }
  // endShape(CLOSE);
}

// function mouseMoved() {
//   let numPoints = floor(map(mouseX, 0, width, 2, 20));
//   makePoints(numPoints);
// }

function makePoints(numPoints){
  points = []; //reset

  let margin = width/8;
  sideWidth = (width - margin * 2)/numPoints;
  sideHeight = height - margin * 2;

  for(let i = 0; i < numPoints + 1; i++){
    let x = i * sideWidth + margin;
    let offset = 0;

    if(i % 2 == 0){
      offset = margin/2;
    }

    let y = height/2 - offset;

    points.push(createVector(x, y));
  }
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

