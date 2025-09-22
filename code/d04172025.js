let distance;
let prevPos, endPos;

let rectW, rectH

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  rectW = width/4;
  rectH = height/4;
  rectMode(CENTER);
}

function draw() {
  background(100);

  rect(width/2, height/2, rectW, rectH);
  
  text("click and drag", 20, 20);
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

 
function mousePressed(){
  distance = 0; //zero out the distance
  prevPos = createVector(mouseX, mouseY);
}

function mouseReleased(){
  // endPos = createVector(mouseX, mouseY);
  // distance = p5.Vector.dist(startPos, endPos);
}

function mouseDragged(){
  currentPos = createVector(mouseX, mouseY);
  
  rectW = rectW + (currentPos.x - prevPos.x);
  rectH = rectH + (currentPos.y - prevPos.y);
   
  prevPos = currentPos   
}