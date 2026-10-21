//broken grid.
// let cells = [];
let circs = [];
let margin, availableWidth, availableHeight;
let thickness;
let index = 0;

function setup() {
  createCanvas(800, 800);
  reset();

  noFill();
  // thickness = 20 * width/800;
}


function draw() {
  background(255);

  stroke(0);

  let drawing = false;
    for(let c of circs){
      c.draw();
    if(c.alive) drawing = true;
    }
  
  // if(index < circs.length - 1 && circs[index].alive == false) index++;

  if(!drawing) reset();

  // if(frameCount % 60 == 0){
  //   reset();
  // }

}

function reset() {
  
  circs = [];
  let colors = ["#FA3BF099", "#FFED2999", "#1BFC0699", "#30C5FF99", "#FF5C0099", "#8A00C499"];
  colors = shuffle(colors);

  let numCircs = floor(random(2, 3));

  let margin = width/10 //* width/800;

  let cellSize = width - 2 * margin;

  thickness = cellSize/20;
  strokeWeight(thickness);

  let maxSpeed = cellSize/8;
  let minSpeed = cellSize/2;

  for(let i = 0; i < numCircs; i++){


    let speed = max(20, random(cellSize/8, cellSize/2) * (800/width));
    // console.log(c);
    // test = new Rotator(width/2, height/2, width/2 - thickness/2, 0, speed);
    circs.push(new Rotator(width/2, height/2, cellSize/2 - thickness/2, random(100), random(8,12), speed, colors[i]));
  }

  // circs = shuffle(circs);
}


function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Rotator {
  constructor(cx, cy, radius, nStart, noiseStep, speed, strokeColor){
    this.centerX = cx;
    this.centerY = cy;
    this.maxRadius = radius;
    this.nPosition = nStart;
    this.noiseStep = noiseStep / speed;
    this.speed = TWO_PI/speed; //angle step = speed,
    // this.r = map(noise(this.nPosition), 0, 1, this.maxRadius/2, this.maxRadius);
    this.angle = random(0, TWO_PI);
    this.dir = random() > 0.5 ? 1 : -1;
    // this.numPoints = speed + ceil(random(speed * 0.1, speed * 0.2)) * (random() > 0.5 ? -1 : 1);
    this.numPoints = speed + ceil(random() > 0.5 ? random(speed * 0.1, speed * 0.18) : random(speed * 0.04, speed * 0.08) * -1);
    console.log(this.numPoints);
    this.points = [];
    this.alive = true;

    this.color = strokeColor;

    this.update(); //ensure init
  }

  update(){
    if(this.points.length < this.numPoints){
      this.r = map(noise(this.nPosition), 0, 1, this.maxRadius * 0.8, this.maxRadius);
      this.x = this.centerX + cos(this.angle) * this.r
      this.y = this.centerY + sin(this.angle) * this.r

      this.angle += this.speed * this.dir;
      this.nPosition += random(0, this.noiseStep);

      this.points.push(createVector(this.x, this.y));
    } else {
      this.alive = false;
    }
  }

  draw(){


    if(this.alive) this.update();
    noFill();
    stroke(this.color);
    beginShape();
    let pts = this.points;
    curveVertex(pts[0].x, pts[0].y);
    for(let p of pts){
      curveVertex(p.x, p.y);
    }
    curveVertex(pts[pts.length-1].x, pts[pts.length-1].y);
    endShape(OPEN);
  }
}
