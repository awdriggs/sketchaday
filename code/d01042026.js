let polys = [];
let angle = 0;
let radius;

function setup() {
  createCanvas(800, 800);
  radius = width/5;
  // createCanvas(windowWidth, windowHeight);
  let numPolys = 1;

  for(let i = 0; i < numPolys; i++){
    polys.push(new Poly);
  }

  noStroke();
}

function draw() {
  background(255);
  fill(0);
  for(let p of polys){
    p.draw();
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

class Poly {
  constructor(){
    this.points = [];

    this.points.push({x: width * 0.25, y: height * 0.25, angle: random(0, TWO_PI), speed: random(0.005, 0.01), dir: random() > 0.5 ? -1 : 1});
    this.points.push({x: width * 0.75, y: height * 0.25, angle: random(0, TWO_PI), speed: random(0.005, 0.01), dir: random() > 0.5 ? -1 : 1});
    this.points.push({x: width * 0.75, y: height * 0.75, angle: random(0, TWO_PI), speed: random(0.005, 0.01), dir: random() > 0.5 ? -1 : 1});
    this.points.push({x: width * 0.25, y: height * 0.75, angle: random(0, TWO_PI), speed: random(0.005, 0.01), dir: random() > 0.5 ? -1 : 1});
  }

  draw(){

    beginShape();
    for(let p of this.points){
      let x, y;
      x = p.x + cos(p.angle) * radius;
      y = p.y + sin(p.angle) * radius;
      vertex(x, y);
      p.angle += p.speed * p.dir;
    }
    endShape(CLOSE);

  }

}

