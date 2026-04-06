//bahaus color wheel 1
let slider;
let maxSize;
let angle, speed;
let colors = ["red", "blue", "green", "yellow", "orange"]
let slices = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  maxSize = width * 0.8
  angle = 0;
  speed = 0.2;

  let weights = colors.map(() => random(1, 5));
  let weightTotal = weights.reduce((a, b) => a + b, 0);
  let start = 0;
  for(let i = 0; i < colors.length; i++){
    let sliceSize = (weights[i] / weightTotal) * TWO_PI;
    slices.push({color: colors[i], start: start, end: start + sliceSize});
    start += sliceSize;
  }


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
  for(let s of slices){
    fill(s.color);
    arc(0, 0, maxSize, maxSize, s.start, s.end);
  }
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

