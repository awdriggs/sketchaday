let movers = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  // let numCols = 10;
  // let numRows = 10;
  // let cellWidth = width/numCols;
  // let cellHeight = height/numRows;
  let numMovers = 10;

  for(let i = 0; i < numMovers; i++){

    let mover = new Mover(random(0, width), height-10, 0, 0, width, height);
    movers.push(mover);
  }
  
  noStroke();

}

function draw() {
  background(255);
  for(let m of movers){
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

//mover
//has an inclination to move in the direction that it is already heading in
//when it get the boundry it turns
//mover knows its bounds

class Mover {
  constructor(sx, sy, bx, by, bw, bh){
    this.loc = createVector(sx, sy);
    this.boundingBox = {x: bx, y: by, w: bw, h: bh};
    this.heading = -HALF_PI;
    this.speed = random(1, 3);
    this.maxTurn = 0.05; // max radians per frame — lower = straighter
    this.dia = 10;
    this.history = []
  }

  update(){
    this.history.push(createVector(this.loc.x, this.loc.y));
    // debugger;
    if(this.history.length > 100) {
      this.history.shift();
    }

    this.heading += random(-this.maxTurn, this.maxTurn);

    let bb = this.boundingBox;
    let r = this.dia / 2;

    let nx = this.loc.x + cos(this.heading) * this.speed;
    let ny = this.loc.y + sin(this.heading) * this.speed;

    if(nx - r < bb.x || nx + r > bb.x + bb.w){
      this.heading = PI - this.heading;
      nx = this.loc.x + cos(this.heading) * this.speed;
    }

    if(ny - r < bb.y || ny + r > bb.y + bb.h){
      this.heading = -this.heading;
      ny = this.loc.y + sin(this.heading) * this.speed;
    }

    this.loc.x = nx;
    this.loc.y = ny;
  }

  draw(){
    this.update();
    // rect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.w, this.fboundingBox.h);
    fill(0);
    ellipse(this.loc.x, this.loc.y, this.dia, this.dia);

    for(let i = 0; i < this.history.length; i++){
      let alpha = map(i, 0, this.history.length, 0, 255);
      fill(0, alpha);
      ellipse(this.history[i].x, this.history[i].y, this.dia, this.dia);
    }
  }
}


