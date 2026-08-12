let points;
let slider;
let prevSliderValue;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  slider = createSlider(4, 100, 50);
  slider.position(10, 10);
  slider.size(100);

  prevSliderValue = slider.value();

  generatePoints(prevSliderValue)

}

function draw() {
  background(255);

  if(prevSliderValue !== slider.value()){
    console.log("change");
    prevSliderValue = slider.value();
    generatePoints(prevSliderValue);
  }

  for(let p of points){
    p.draw();
  }
}

function generatePoints(resolution) {
  points = [];
  let diameter = width * 0.8;


  let angleStep = TWO_PI/resolution


  for(let i = 0; i < resolution; i++){
    let x = width/2 + cos(angleStep * i) * diameter/2;
    let y = height/2 + sin(angleStep * i) * diameter/2;
    points.push(new Point(x, y));
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

class Point {
  constructor(x, y){
    this.loc = createVector(x, y);
    this.size = (width/800) * 20;
  }

  draw(){
    ellipse(this.loc.x, this.loc.y, this.size, this.size);
  }
}

