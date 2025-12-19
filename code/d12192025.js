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
  barHeight = height;
  // let widthStep = width/(numBars)

  for(let i = 0; i < numBars; i++){
    let angle = random(0, PI);
    // let angle = 0;
    //use sin of angle for the max width
    let maxWidth = sin(i * angleStep) * width;
    // let offset = (numBars - i) * 20;
    // bars.push(new Bar(width/2, height/2, (i+1) * widthStep, i * angleStep));
    bars.push(new Bar(width/2, height/2, maxWidth, angle));
  }

  noFill();
  strokeWeight(width/80);

  offsetX = width/2;
  offsetY = height/2;
}

function draw() {
  background(200);

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
  constructor(x, y, maxWidth, startAngle){
    this.centerX = x; //center!
    this.y = y;
    this.maxWidth = maxWidth;
    this.angle = startAngle;
    // this.speed = random(0.05, 0.15);
    this.speed = TWO_PI/maxWidth
  }

  draw(){
    // fill(0, 0, 255, 20);
    fill(0, 10);
    noStroke();

    // if(random() > 0.9){
    //   this.speed = random(0.05, 0.15);
    // }

    this.angle += this.speed;
    // let w = map(sin(this.angle), -1, 1, this.maxWidth - this.maxWidth/10, this.maxWidth);
    let w = map(sin(this.angle), -1, 1, 0, this.maxWidth);
    // debugger;
    rect(this.centerX, this.y, w, barHeight);
  }
}
