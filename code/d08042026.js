let angle = 0.0;
let rectWidth, rectHeight;
let n = 0;
let numCols = 4;
let spacing;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  spacing = width/numCols;
  rectWidth = spacing/10;
  rectHeight = height - height/4;
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(255);

  fill(0); 
  // angle = map(noise(n), 0, 1, -0.2, 0.2);
  for(let i = 0; i < numCols; i++){
    let x = i * spacing + spacing/2;
    push();
    translate(x, height/2);
    // rotate(angle + i/100);
    angle = map(noise(n, i/10), 0, 1, -0.2, 0.2);
    rotate(angle);
     
     
    rect(0, 0, rectWidth, rectHeight);
    // fill("red");
    // ellipse(0, 0, 20, 20);
    pop();
  }

  //static
  //fill(0);
  //rect(width/2 - rectWidth/2, height/2 - rectHeight/2, rectWidth, rectHeight);

  //angle = map(noise(n), 0, 1, -0.2, 0.2);
  ////rotating
  //push();
  //translate(width/2 + rectWidth/4, height/2 - rectHeight/8);
  //rotate(angle);
  //fill(255);
  //stroke(0);
  //rect(0 - rectWidth/2, 0 - rectHeight/4, rectWidth, rectHeight/2);
  //fill("red");
  //ellipse(0,0,20, 20);
  //pop();

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

