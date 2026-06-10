let maxAngle, dir;
let w, h;

let grid = [];
let numCols, numRows;
let cellWidth, cellHeight;

function setup() {
  createCanvas(800, 800);

  numCols = 4;
  numRows = 4;
  cellWidth = width/numCols;
  cellHeight = height/numRows;

  reset();

  // createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  fill("#002FA7");
}

function draw() {
  background(255);

  for(let c of grid){
    c.update();
    c.draw();
  }

  // if(frameCount % 60 == 0){
  //   reset();
  // }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function reset(){
  grid = [];
  for(let i = 0; i < numRows; i++){
    let y = i * cellHeight + cellHeight/2;
    for(let j = 0; j < numCols; j++){
      let x = j * cellWidth + cellWidth/2; //center
      //deicde whether to split or not
      if(random() > 0.5){
        let dice = random();
        if(dice < 0.2){ //halfs
          //vertical split
          let subWidth = cellWidth/2;
          grid.push(new Cell(x - subWidth/2, y, subWidth, cellHeight));
          grid.push(new Cell(x + subWidth/2, y, subWidth, cellHeight));
        } else if(dice > 0.2 && dice < 0.4){
          let subHeight = cellHeight/2;
          grid.push(new Cell(x, y - subHeight/2, cellWidth, subHeight));
          grid.push(new Cell(x, y + subHeight/2, cellWidth, subHeight));
        } else if(dice > 0.4 && dice < 0.6){
          let subWidth = cellWidth/2;
          grid.push(new Cell(x - subWidth/2, y - subWidth/2, subWidth, subWidth));
          grid.push(new Cell(x - subWidth/2, y + subWidth/2, subWidth, subWidth));
          grid.push(new Cell(x + subWidth/2, y + subWidth/2, subWidth, subWidth));
          grid.push(new Cell(x + subWidth/2, y - subWidth/2, subWidth, subWidth));
        } else if(dice > 0.6 && dice < 0.8){
          //triple vert
          let subWidth = cellWidth/3;
          grid.push(new Cell(x, y, subWidth, cellHeight));
          grid.push(new Cell(x + subWidth, y, subWidth, cellHeight));
          grid.push(new Cell(x - subWidth, y, subWidth, cellHeight));
        } else {
          //triple horizontal
          let subWidth = cellWidth/3;
          grid.push(new Cell(x, y, cellWidth, subWidth));
          grid.push(new Cell(x, y + subWidth, cellWidth, subWidth));
          grid.push(new Cell(x, y - subWidth, cellWidth, subWidth));
        }
        //if splitting, decide on horizontal or vertical split
        //push new cell or cells
      } else {
        //no split, normal push
        grid.push(new Cell(x, y, cellWidth, cellHeight));
      }
    }
  }
}

function mousePressed(){
  for(let c of grid){
    if(c.inside(mouseX, mouseY)){
      break;
    }
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function maxRotation(innerW, innerH, outerW, outerH) {
  const a = innerW / 2;
  const b = innerH / 2;
  const halfW = outerW / 2;
  const halfH = outerH / 2;
  const R = Math.sqrt(a * a + b * b);
  const phi = Math.atan2(b, a);

  // angle where rotated x-extent hits halfW
  const thetaX = halfW < R ? phi - Math.acos(halfW / R) : Infinity;
  // angle where rotated y-extent hits halfH
  const thetaY = halfH < R ? Math.asin(halfH / R) - phi : Infinity;

  return Math.min(thetaX, thetaY);
}

class Cell {
  constructor(cx, cy, w, h){
    this.x = cx; //center x and y
    this.y = cy;
    this.outerWidth = w;
    this.outerHeight = h;
    this.innerWidth = random(this.outerWidth * 0.7, this.outerWidth);
    this.innerHeight = random(this.outerHeight * 0.7, this.outerHeight);
    this.maxAngle = maxRotation(this.innerWidth, this.innerHeight, this.outerWidth, this.outerHeight);

    this.dir = random() > 0.5 ? -1 : 1;
    this.angle = 0; //start angle
    this.angleStep = 0.001;
  }

  reset(){
    this.innerWidth = random(this.outerWidth * 0.7, this.outerWidth);
    this.innerHeight = random(this.outerHeight * 0.7, this.outerHeight);
    this.maxAngle = maxRotation(this.innerWidth, this.innerHeight, this.outerWidth, this.outerHeight);
    this.dir = random() > 0.5 ? -1 : 1;
  }

  draw(){
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    rect(0, 0, this.innerWidth, this.innerHeight);
    pop();
  }

  update(){
    this.angle += this.angleStep * this.dir;

    if(this.angle > this.maxAngle){
      this.angle = this.maxAngle;
      this.dir *= -1;
    }

    if(this.angle < -this.maxAngle){
      this.angle = -this.maxAngle;
      this.dir *= -1;
    }
  }

  inside(mx, my){
    if(mx > this.x - this.outerWidth/2 && mx < this.x + this.outerWidth/2 && my > this.y - this.outerHeight/2 && my < this.y + this.outerHeight/2){
      this.reset()
      return true;
    } else {
      return false;
    }
  }
}
