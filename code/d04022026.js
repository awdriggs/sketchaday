//bahaus color wheel 1
let slider;
let maxSize;
let angle, speed; 

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  maxSize = width * 0.8
  angle = 0;
  speed = 0.2;

  slider = createSlider(0, 1, 0.2, 0.1);
  slider.position(10, 10);
  slider.size(80);

}

function draw() {
  background(255);
  speed = slider.value();

  push() 
  translate(width/2, height/2)
  rotate(angle);
  // ellipse(0,0, maxSize, maxSize);
  fill(0);
  arc(0, 0, maxSize, maxSize, 0, PI); 
  fill(255);
  arc(0, 0, maxSize, maxSize, PI, TWO_PI); 
  pop();
  angle += speed;
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

