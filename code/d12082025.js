let p1, p2;
let angle = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  p1 = createVector(0, 0);
  p2 = createVector(width, height);

  strokeWeight(10);
}

function draw() {
  background(255);

  line(p1.x, p1.y, p2.x, p2.y);
  // ellipse(p1.x, p1.y, 20, 20);
  // ellipse(p2.x, p2.y, 20, 20);

  p1.x = sin(angle) * width/2 + width/2;
  p2.x = cos(angle) * width/2 + width/2;
  angle += 0.05;

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

