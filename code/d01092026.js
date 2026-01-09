let polys = [];
let angle = 0;
let radius;

function setup() {
  createCanvas(800, 800);

  // noLoop();

  radius = width/5;
  // createCanvas(windowWidth, windowHeight);
  let numPolys = 3;
  let opacity = 255;
  let colors = [color(255, 0, 0, opacity), color(0, 255, 0, opacity), color(0, 0, 255, opacity)];

  for(let i = 0; i < numPolys; i++){
    polys.push(new Poly(colors[i]));
  }

  noStroke();
}

function draw() {
  blendMode(BLEND);
  background(255);
  for(let p of polys){
    p.update();
    fill(0);
    p.draw();
  }
  blendMode(ADD);
  for(let p of polys){
    fill(p.color);
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
  constructor(c){
    this.color = c;
    this.points = [];
    this.points.push({x: width * 0.25, y: height * 0.25, angle: random(0, TWO_PI), speed: random(0.005, 0.01), dir: random() > 0.5 ? -1 : 1, n: random(1000)});
    this.points.push({x: width * 0.75, y: height * 0.25, angle: random(0, TWO_PI), speed: random(0.005, 0.01), dir: random() > 0.5 ? -1 : 1, n: random(1000)});
    this.points.push({x: width * 0.75, y: height * 0.75, angle: random(0, TWO_PI), speed: random(0.005, 0.01), dir: random() > 0.5 ? -1 : 1, n: random(1000)});
    this.points.push({x: width * 0.25, y: height * 0.75, angle: random(0, TWO_PI), speed: random(0.005, 0.01), dir: random() > 0.5 ? -1 : 1, n: random(1000)});
  }

  draw(){

    beginShape();
    for(let p of this.points){
      let x, y;
      x = p.x + cos(p.angle) * radius;
      y = p.y + sin(p.angle) * radius;
      vertex(x, y);
       

      // p.angle += p.speed * p.dir;
    }
    endShape(CLOSE);

  }

  update(){
    for(let p of this.points){
      //update...
      let change = map(noise(p.n), 0, 1, -0.01, 0.01); 
      p.angle += change;
      p.n += 0.01;
    }
  }

}

