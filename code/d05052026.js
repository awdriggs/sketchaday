let movers = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numCols = 10;
  let numRows = 10;
  let cellWidth = width/numCols;
  let cellHeight = height/numRows;

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){

      let x = j * cellWidth;
      let y = i * cellHeight;
      
      let mover = new Mover(x + cellWidth/2, y + cellHeight/2, x, y, cellWidth, cellHeight);
      movers.push(mover);
    }
  }

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
    this.angle = createVector(random(TWO_PI), random(TWO_PI));
    this.speed = random(1, 3);
    this.stepSize = 0.8;
    this.dia = 10;
  }

  update(){
    this.angle.x += random(-this.stepSize, this.stepSize);
    this.angle.y += random(-this.stepSize, this.stepSize);

    let bb = this.boundingBox;
    let r = this.dia / 2;

    let nx = this.loc.x + sin(this.angle.x) * this.speed;
    let ny = this.loc.y + sin(this.angle.y) * this.speed;

    if(nx - r < bb.x || nx + r > bb.x + bb.w){
      this.angle.x *= -1;
      nx = this.loc.x + sin(this.angle.x) * this.speed;
    }

    if(ny - r < bb.y || ny + r > bb.y + bb.h){
      this.angle.y *= -1;
      ny = this.loc.y + sin(this.angle.y) * this.speed;
    }

    this.loc.x = nx;
    this.loc.y = ny;
  }

  draw(){
    this.update();
    // rect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.w, this.boundingBox.h);
    ellipse(this.loc.x, this.loc.y, this.dia, this.dia);
  }
}


