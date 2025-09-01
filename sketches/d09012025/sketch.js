// a grid agent, inspired by Bruno Murani
// multiple agents
let cellSize;
let blocks = [];
let numBlocks = 1;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let scale = width/800;
  cellSize = 20 * scale;

  let xCount = width/cellSize;
  let yCount = height/cellSize;
  

  for(let i = 0; i < numBlocks; i++){
    let margin = width/20;
    let x = floor(random(0, xCount)) * cellSize;
    let y = floor(random(0, yCount)) * cellSize;
    // let c = color(random(0,255), random(0, 255), random(0, 255));
    let c = color(0, 0, 0, 10);
    let num = floor(random(50, 300));

    blocks.push( new Block(x, y, num, c))
  }

  strokeWeight(10 * scale);
  noFill();
}

function draw() {
  background(255);

  for(let b of blocks){
    b.draw();
    // if(frameCount % 120 == 0){
    //   b.buildCells();
    // }

    if(frameCount % 10 == 0){
      print('yip');
      b.incIndex();
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

class Block {
  constructor(x,y, numCells, c){
    this.x = x;
    this.y = y;
    this.numCells = numCells;
    this.cells = [];
    this.color = c;
    this.index = 0; //used for animatte

    this.buildCells(); //init the cells
  }

  buildCells(){
    this.cells = []; //reset

    // let margin = width/10;
    // let startX = random(margin, width - margin);
    // let startY = random(margin, height - margin);
    let startX = this.x;
    let startY = this.y;
    //build the blocks

    while(startX < width && startX > 0 && startY < height && startY > 0){

      //decide on the corner
      // let w = floor(random(1, 12)) * cellSize * (random() > 0.5 ? 1 : -1);
      // let h = floor(random(1, 12)) * cellSize * (random() > 0.5 ? 1 : -1);
      let w = 1 * cellSize * (random() > 0.5 ? 1 : -1);
      let h = 1 * cellSize * (random() > 0.5 ? 1 : -1);

      this.cells.push(new Cell(startX, startY, w, h));
      let newCell = this.cells[this.cells.length -1]

      let nextCorner = newCell.corners[floor(random(newCell.corners.length))]
      // console.log(nextCorner);
      startX = nextCorner.x;
      startY = nextCorner.y;
    }
  }

  draw(){
    stroke(this.color);
    for(let i = 0; i < this.index; i++){
      this.cells[i].draw();
    }
    
  }

  incIndex(){
    if(this.index < this.cells.length - 1){
      this.index++; //increase for the next round
    }
  }
}


class Cell {
  constructor(cornerX, cornerY, w, h){
    this.corners = [{x: cornerX, y: cornerY}, {x: cornerX + w, y: cornerY}, {x: cornerX + w, y: cornerY + h}, {x: cornerX, y: cornerY + h},]
  }

  draw(){
    beginShape();
    for(let c of this.corners){
      vertex(c.x, c.y);
    }
    endShape(CLOSE);
  }
}
