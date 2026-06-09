let maxAngle, dir;
let w, h;

function setup() {
  createCanvas(800, 800);
  reset();
  // createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  fill(0);
}

function draw() {
  background(255);
  push();
  translate(width/2, height/2);
  rotate(maxAngle * dir);
  rect(0, 0, w, h);
  pop();

  if(frameCount % 60 == 0){
    reset();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function reset(){
  w = random(width * 0.7, width);
  h = random(height * 0.7, height);

  maxAngle = maxRotation(w, h, width, height);

  dir = random() > 0.5 ? 1 : -1;
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function maxRotation(innerW, innerH, outerW, outerH) {
  const a = innerW / 2;
  const b = innerH / 2;
  const halfW = outerW / 2;
  const halfH = outerH / 2;
  const R = Math.sqrt(a * a + b * b);
  const phi = Math.atan2(b, a);

  // angle where rotated x-extent hits halfW
  const thetaX = halfW < R ? phi - Math.acos(halfW / R) : Infinity;
  // angle where rotated y-extent hits halfH
  const thetaY = halfH < R ? Math.asin(halfH / R) - phi : Infinity;

  return Math.min(thetaX, thetaY);
}
