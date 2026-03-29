let movers = []
function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  let dim = 10;
  let margin = width/10;
  let cellSize = (width - margin)/dim;

  for(let i = 0; i < dim; i++){
    let y = i * cellSize + margin;
    for(let j = 0; j < dim; j++){
      let x = j * cellSize + margin;
      movers.push(new Rotator(x, y, cellSize/2 * 0.8));
    }
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
    this.dir = random() > 0.5 ? 1 : -1;
    this.x = cos(this.angle) * this.radius + this.cx;
    this.y = sin(this.angle) * this.radius + this.cy;
  }

  draw(){
    ellipse(this.cx, this.cy, this.radius, this.radius);
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  update(){
    this.angle += this.speed * this.dir
    this.x = cos(this.angle) * this.radius + this.cx;
    this.y = sin(this.angle) * this.radius + this.cy;
  }

}

