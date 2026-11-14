//a happy accident
// currentScript is only set while this file first runs, so grab it at load time
const SKETCH_NAME = document.currentScript.src.split('/').pop().replace('.js', '');
let radius;
let speed;
let angle = 0;
let loc;
let centerX, centerY;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  centerX = width/2;
  centerY = height/2;
  radius = width/2 * 0.8;
  speed = random(0.001, 0.01); 

  strokeWeight(10 * width/800)
  strokeCap(PROJECT)
}

function draw() {
  background(255);

  angle += speed;

  let x1 = centerX + cos(-angle) * radius
  let y1 = centerY + sin(-angle) * radius
  let x2 = centerX + cos(angle) * radius
  let y2 = centerY + sin(angle) * radius


  line(x1, y1, x2, y2);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif(SKETCH_NAME, floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas(SKETCH_NAME, "jpg");
  }
}



