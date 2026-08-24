let angle = 0;
let diameter;
let margin;
let cx, cy;

function setup() {
  createCanvas(800, 800);

  // rectMode(CENTER);
  // createCanvas(windowWidth, windowHeight);
  diameter = width/2;
  cx = width/2;
  cy = height/2;
  margin = width/20;
}

function draw() {
  background(255);
  let x = cx + cos(angle) * (cx - diameter/2 - margin); 
  let y = cy + sin(angle) * (cy - diameter/2 - margin); 

  stroke(0);
  fill(0);
  ellipse(x, y, diameter, diameter);

  push();
  translate(cx, cy);
  rotate(angle);
  rect(0, 0 - diameter/2, width/2 - diameter/2 - margin, diameter); 
  pop();

  noStroke();
  fill(255);
  ellipse(cx, cy, diameter, diameter);


  angle += 0.01;
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

