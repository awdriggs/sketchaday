let movers = []
function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numMovers = 100;

  for(let i = 0; i < numMovers; i++){
    let x = random(width/10, width - width/10);
    let y = random(height/10, height - height/10);

    movers.push(new Rotator(x, y, width/10));
  }
}

function draw() {
  background(255);

  for(let m of movers){
    m.update();
    m.draw();
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

class Rotator{
  constructor(cx, cy, r){
    this.cx = cx;
    this.cy = cy;
    this.radius = r;
    this.speed = random(0.04, 0.05);
    this.angle = random(0, TWO_PI);
    this.x = cos(this.angle) * this.radius + this.cx;
    this.y = sin(this.angle) * this.radius + this.cy;
  }

  draw(){
    ellipse(this.cx, this.cy, 10, 10);
    ellipse(this.x, this.y, 10, 10);
  }

  update(){
    this.angle += this.speed
    this.x = cos(this.angle) * this.radius + this.cx;
    this.y = sin(this.angle) * this.radius + this.cy;
  }

}

