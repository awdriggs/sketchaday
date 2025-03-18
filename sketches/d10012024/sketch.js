let cells = [];
let newCells = [];
// let closestCell;

function setup() {
  createCanvas(400, 400);
  // createCanvas(windowWidth, windowHeight);
  cells.push(new Cell(1, 1, width-2, randomColor())); //always square
  // let parent = select('#canvas-wrapper');
  // parent.style('border', '5px deeppink dashed');
  // debugger;
  // parent.style("width", 400);
  // noStroke();
}

function draw() {
  background(255);

  
  findClosestCell();

  for(let c of cells){
    c.show();
    c.updateDistance();
  }
}

function findClosestCell(){
  let closestCell;
  let closestDistance = 10000; //start with a large number, so first match becomes the closest

  for(let c of cells){
    if(c.distance < closestDistance && c.alive){
      closestDistance = c.distance;
      closestCell = c;
    }
  }

  return closestCell;
  // print(closestCell);
}

function mousePressed(){
  let closestCell = findClosestCell();
  
  //is the mouse inside the cell? distance is less than radius
  if(closestCell.distance < closestCell.size/2){
    cells.push.apply(cells, closestCell.divide()); //flat add
  }
  // cull(); //turn on off to remove the old cells
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 7)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}


//this will delete all dead cells from the array 
function cull(){
  let aliveCells = [];

  for(let c of cells){
    if(c.alive){
      aliveCells.push(c);
    }
  }
  cells = aliveCells;
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

class Cell {
  constructor(x, y, size, c) {
    this.x = x;
    this.y = y;
    this.size = size; //always square
    this.color = c;
    this.alive = true;
    this.distance;
    // print(this);
  }

  updateDistance(){

    let cx = this.x + this.size/2;
    let cy = this.y + this.size/2;

    this.distance = dist(mouseX, mouseY, cx, cy);
  }

  show() {
    //display the cell, a rectangle
    // fill(this.color);
    noFill();

    let cx = this.x + this.size/2;
    let cy = this.y + this.size/2;

    // this.distance = dist(mouseX, mouseY, cx, cy);
    // print(this.distance);
    // if(this.distance < this.size/2 && this.alive){
    //for debug
    // if(closestCell == this){
    //   fill("red");
    // } else {
    //   noFill();
    // }

    ellipse(cx, cy, this.size, this.size);
    // ellipse(cx, cy, 10, 10);
    // line(cx, cy, mouseX, mouseY);
  }

  divide() {
    //
    if(this.size > 30){
      let children = [];
      children.push(new Cell(this.x, this.y + this.size/4, this.size/2, randomColor()));
      children.push(new Cell(this.x + this.size/2, this.y + this.size/4, this.size/2, randomColor()));
      children.push(new Cell(this.x + this.size/4, this.y, this.size/2, randomColor()));
      children.push(new Cell(this.x + this.size/4, this.y + this.size/2, this.size/2, randomColor()));

      this.alive = false; //will stop checking clicks for this cell

      return children;
    }
  }

  clicked() {
    // if(mouseX > this.x && mouseX < this.x + this.size && mouseY > this.y && mouseY < this.y + this.size){
    //   print(this + " clicked")
    //   return distance(this.x + this.size/2, this.y + this.size/2, mouseX, mouseX);
    // }
    // circle checking
    let distance = dist(this.x + this.size/2, this.y + this.size/2, mouseX, mouseX);
    // print(this, distance);
    return distance;
  }
}

function randomColor(){
  let r, g, b;
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);

  return color(r,g,b);
}
