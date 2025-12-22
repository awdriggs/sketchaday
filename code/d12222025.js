let bars = [];

let offsetX, offsetY; //, mappedOffsetX, mappedOffsetY;

let barHeight;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  let numBars = 100;
  let angleStep = PI/numBars;
  // barHeight = height/numBars;

  let radius = width * 0.5; //radius is 90% of canvas width
  barHeight = radius*2/numBars + 1; //plus 1 hack

  // barHeight = height;
  // let widthStep = width/(numBars)

  for(let i = 0; i < numBars; i++){
    // let angle = random(0, PI);
    let angle = i * angleStep;
    // let angle = 0;
    //circle formula
    let y = (height/2 - radius) + (2 * radius * i) / (numBars - 1);

    // Using circle formula: (x - cx)² + (y - cy)² = r²
    // Width at height y is: 2 * sqrt(r² - (y - cy)²)
    const distanceFromCenter = y - height/2;
    const halfWidth = Math.sqrt(radius * radius - distanceFromCenter * distanceFromCenter);
    const maxWidth = 2 * halfWidth;

    bars.push(new Bar(width/2, y, maxWidth, angle, i/1000));
  }

  noFill();
  strokeWeight(width/80);

  offsetX = width/2;
  offsetY = height/2;
}

function draw() {
  background(255);

  // let maxOffsetX = offsetX * 0.75;
  // let maxOffsetY = offsetY * 0.75;

  // let distX = map((width/2 - mouseX) * -1, -offsetX, offsetX, -maxOffsetX, maxOffsetX, true);
  // let distY = map((height/2 - mouseY) * -1, -offsetY, offsetY, -maxOffsetY, maxOffsetY, true);

  // mouse
  for(let i = 0; i < bars.length; i++){
    let b = bars[i];
    // let displaceY = (bars.length - i) * (distY/bars.length);
    // let displaceX = (bars.length - i) * (distX/bars.length);
    // b.centerX = width/2 + displaceX;
    // b.y = height/2 + displaceY;
    // console.log(b.y);
    b.draw();
  }

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 4.18 * 2);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Bar {
  constructor(x, y, maxWidth, startAngle, speed){
    this.centerX = x; //center!
    this.y = y;
    this.maxWidth = maxWidth;
    this.angle = startAngle;
    this.speed = speed;
    // this.speed = random(0.005, 0.015);
    // this.speed = TWO_PI/maxWidth
  }

  draw(){
    // fill(0, 0, 255, 20);
    fill(0);
    noStroke();

    // if(random() > 0.9){
    //   this.speed = random(0.05, 0.15);
    // }

    this.angle += this.speed;
    // let w = map(this.triangleWave(this.angle), -1, 1, this.maxWidth/10, this.maxWidth);
    let w = map(sin(this.angle), -1, 1, this.maxWidth/10, this.maxWidth);
    // let w = this.maxWidth
    // debugger;
    rect(this.centerX, this.y, w, barHeight);
  }

// Triangle wave (-1 to 1 to -1, repeating)
  triangleWave(angle) {
    const normalized = (angle % (Math.PI * 2)) / (Math.PI * 2);
    return normalized < 0.5
      ? normalized * 4 - 1       // Rising: -1 to 1
      : 3 - normalized * 4;      // Falling: 1 to -1
  }
}
