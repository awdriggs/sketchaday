const SKETCH_NAME = document.currentScript.src.split('/').pop().replace('.js', '');

let waves = [];
let numPoints;
let spacing;
let numWaves = 10;
let theta = 0;
let margin;
let amp;

function setup() {
  createCanvas(800, 800);
  numPoints = 200;

  margin = width/10;
  spacing = (width - margin * 2)/numPoints; //* 0.75;

  amp = height / 7;
  let size = (height - margin * 2) / numWaves / 5;
  // a wave reaches amp plus half its stroke above and below its baseline
  let reach = amp + size / 2;

  for(let i = 0; i < numWaves; i++){
    let y = map(i, 0, numWaves - 1, margin + reach, height - margin - reach);
    waves.push(new Wave(margin, y, size));
  }
}

function draw() {
  background(255);


  for(let w of waves){
    w.draw();
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif(SKETCH_NAME, floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas(SKETCH_NAME, "jpg");
  }
}


class Wave {
  constructor(x, y, size){
    this.startX = x;
    this.startY = y;
    this.centerPoints = [];
    this.theta = 0; 
    this.speed = random(0.001, 0.005) * 2;
    this.dir = random() > 0.5 ? -1 : 1;
    this.size = size;
    this.modFreq = random(2, 5);
    this.modDepth = random(0.5, 1)
    this.color = color(random(255), random(255), random(255));
    // ttheta = 0;

    for(let i = 0; i < numPoints; i++){
      let x = this.startX + i * spacing;
      let y = this.startY;
      this.centerPoints.push({x, y});
    }
  }

  update(){
    this.theta += this.speed * this.dir;

    for(let i=0; i < this.centerPoints.length; i++){
      // this.theta += 0.0001;
      let c = this.centerPoints[i];
      let t = this.theta + map(i, 0, numPoints, 0, HALF_PI);
      let y = sin(t + this.modFreq * sin(this.modDepth * t));
      c.y = y * amp + this.startY;
    }
  }

  draw(){
    this.update();
    noFill();
    stroke(this.color);
    strokeWeight(this.size);
    strokeJoin(ROUND);
    strokeCap(ROUND);
    beginShape();
    for(let c of this.centerPoints){
      vertex(c.x, c.y);
    }
    endShape();
  }
}

