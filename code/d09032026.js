//some ideas..
//done! make drunk walkers be the center points, loops get weird, use the mover class in tools.
//change the angle direction? neg will make it turn counter clock wise. can you you change this is a sin value? curly q's then?

//looping with noise
let noiseStep = 0.02;
let count = 4;

let rotators = [];
let movers = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  start();
  // fill(0);
  strokeWeight(10 * width/800);
  noFill();
}

function draw() {
  background(255);

  for(let i = 0; i < movers.length; i++){
    movers[i].update();

    // movers[i].draw();
    rotators[i].update(movers[i].loc)
    rotators[i].draw();
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

function mousePressed(){
  start();
}

function start(){
  rotators = [];
  movers = [];

  let boundsW = width/3;
  let boundsH = height/3;
  let boundsX = width/2 - boundsW/2;
  let boundsY = height/2 - boundsH/2;

  for(let i = 0; i < count; i++){
    //create a mover
    let x = random(boundsX, boundsX + boundsW);
    let y = random(boundsY, boundsY + boundsH);

    movers.push(new Mover(x, y, boundsX, boundsY, boundsW, boundsH, 2));
    //make the rotators xy the same as the mover.
    rotators.push(new Rotator(x, y, random(width/4, width/2), random(), random(0.01, 0.03), random(0.3, 0.6), random(10, 11)));
  }
}

class Rotator {
  constructor(cx, cy, radius, nStart, noiseStep, speed, numLoops){
    this.centerX = cx;
    this.centerY = cy;
    this.maxRadius = radius;
    this.nPosition = nStart; //noise position
    this.noiseStep = noiseStep;
    this.color = color(random(255), random(255), random(255));
    // this.speed = TWO_PI/speed; //angle step = speed,
    this.speed = TWO_PI / 100 * speed; // speed=1 is baseline, speed=2 is twice as fast

    // this.r = map(noise(this.nPosition), 0, 1, this.maxRadius/2, this.maxRadius);
    this.angle = random(TWO_PI);

    this.positions = [];
    this.maxPoints = round(TWO_PI / this.speed) * numLoops;

    this.update(); //ensure init
  }

  update(center){
    if(center){
      this.centerX = center.x;
      this.centerY = center.y;
    }

    let r = map(noise(this.nPosition), 0, 1, this.maxRadius/2, this.maxRadius);
    let x = this.centerX + cos(this.angle) * r
    let y = this.centerY + sin(this.angle) * r
    // print(x,y);

    this.positions.push({x: x, y: y});

    if(this.positions.length > this.maxPoints){
      this.positions.shift();
    }

    this.angle += this.speed;
    this.nPosition += random(0, noiseStep);
  }

  draw(){
    // ellipse(this.x, this.y, 10, 10);

    stroke(this.color);
    beginShape();
    for(let i = 0; i < this.positions.length; i++){
      curveVertex(this.positions[i].x, this.positions[i].y);
    }
    endShape();
  }
}
