let x,y;
let rotation;
let lineLength = 200;
let yDir = 1;
let xDir = 1;
let xMax, xMin, yMax, yMin;
let n = 0;
let xNoise = 5;


function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  x = width/2;
  y = height/2;

  rotation = 0;
  yMax = height * 0.8;
  yMin = height * 0.2;
}

function draw() {
  // background(255);

  push();
  translate(x,y)
  rotate(rotation);
  ellipse(0, 0, 2, 2);
  stroke(255, 0, 0);
  line(-lineLength/2, 0, lineLength/2, 0);
  pop();

  rotation += map(noise(n), 0, 1, -0.01, 0.01);

  x += map(noise(xNoise), 0, 1, -1, 1);

  y += 1 * yDir;

  if(x > xMax){
    x = xMax;
    xDir *= -1;
    // rotation *= -1;
  } else if(x < xMin){
    x = xMin;
    xDir *= -1;
    // rotation *= -1;
  }
  if(y > yMax){
    y = yMax;
    yDir *= -1;
    // rotation *= -1;
  } else if(y < yMin){
    y = yMin;
    yDir *= -1;
    // rotation *= -1;
  }

  n += 0.1;
  xNoise += 0.5;
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 5)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

