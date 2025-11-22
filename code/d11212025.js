let things = [];

let step = 0.01;
function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numThings = 100;
  for(let i = 0; i < numThings; i++){
    let x = random(0, width);
    let y = random(0, height);
    let radius = random(width/10, width/2); //arc raidus
    let angle = random(0, TWO_PI);
    let size = random(50, 200);
    let fillColor = color(random(255), random(255), random(255));
    things.push(new Thing(x, y, radius, angle, size, fillColor));
  }
  // test = new Thing(400, 400, 100, 0);

  noStroke();
}

function draw() {
  background(255);
  for(let t of things){
    t.draw();
  }

  // console.log(test.angle
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

class Thing {
  constructor(x, y, r, a, s, fill){
    this.cx = x;
    this.cy = y;
    this.r = r;
    this.angle = a;
    this.size = s; //circles
    this.rotate();
    this.dir = random() > 0.5 ? -1 : 1; //cw or ccw
    this.color = fill;
  }

  rotate(){
    this.angle += step;
    this.x = this.cx + cos(this.angle * this.dir) * this.r;
    this.y = this.cy + sin(this.angle * this.dir) * this.r;
  }

  reverse(){
    this.dir *= -1;
  }
  
  draw(){ //change to differenct shapes later?
    this.rotate(); //update position

    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

