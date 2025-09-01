let test;
let stitches = [];
function setup() {

  // createCanvas(400, 400);
  createCanvas(10000, 10000);
  test = new Stitch(width/2, height/2, QUARTER_PI);
  
  for(let i = 0; i < 1000000; i++){
    stitches.push(new Stitch(random(0, width), random(0, height), random(0, TWO_PI)));
  }

  noLoop();
}

function draw() {
  background(255);
  for(let s of stitches){
    s.draw();
  }
  // test.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Stitch {
  constructor(x, y, theta, color){
    this.x = x;
    this.y = y;
    this.theta = theta;
    this.color = color;
  }
  
  draw(){
    push();
    translate(this.x,this.y);
    rotate(this.theta);
    line(0, -5, 0, 5); //vert line
    line(-5, 0, 5, 0);
    pop();
  }
}

