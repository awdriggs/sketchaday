let bars = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  let numBars = 10;
  let angleStep = PI/numBars; 
  let widthStep = width/(numBars - 1)
  for(let i = 0; i < numBars; i++){
    let angle = random(0, PI);
    // bars.push(new Bar(width/2, height/2, (i+1) * widthStep, i * angleStep));
    bars.push(new Bar(width/2, height/2, (i+1) * widthStep, angle));
  }

  noFill();
  strokeWeight(width/80);
}

function draw() {
  background(255);

  for(let b of bars){
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
  constructor(x, y, maxWidth, startAngle){
    this.centerX = x; //center!
    this.y = y;
    this.maxWidth = maxWidth;
    this.angle = startAngle;
    this.speed = 0.1;
  }

  draw(){
    this.angle += this.speed;
    let w = map(sin(this.angle), -1, 1, this.maxWidth - this.maxWidth/10, this.maxWidth);
    // debugger;
    rect(this.centerX, this.y, w, w);
  }
}
