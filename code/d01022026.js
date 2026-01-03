//not sure why this works!

let sliders = [];
let angle = 0;
let radius;
let margin;

function setup() {
  createCanvas(800, 800);
  radius = width/32;

  let numSliders = 10;
  let h = height/numSliders;
  margin = h/4;

  for(let i = 0; i < numSliders; i++){
    let y = i * h;
    sliders.push(new Slider(y, h));
  }
  // createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(255);
  fill(0);

  for(let s of sliders){
    s.draw();
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

class Slider {
  constructor(y, h){
    this.points = [];
    this.points.push(new createVector(width * 0.25, y + h * 0.25));
    this.points.push(new createVector(width * 0.75, y + h * 0.25));
    this.points.push(new createVector(width * 0.75, y + h * 0.75));
    this.points.push(new createVector(width * 0.25, y + h * 0.75));

    this.angle = random(0, TWO_PI);
    this.dir = random() > 0.5 ? -1 : 1;

  }

  draw(){
    beginShape();
    for(let p of this.points){
      p.x = p.x + cos(this.angle) * radius * this.dir;
      p.ux = constrain(p.x, margin, width -  margin);
      vertex(p.ux, p.y);
    }
    endShape(CLOSE);
    this.angle += 0.1;


  }
}

