// a grid agent, inspired by Bruno Murani
// first draw an array squares that touch. The squares should be random in size but a factor of the grid size

let cellSize; 
let blocks = [];
let numBlocks = 4;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let scale = width/800;
  cellSize = 20 * scale;
  buildBlocks(); 

  strokeWeight(10 * scale);
  noFill();
}

function buildBlocks(){

  blocks = []; //reset



  let margin = width/10; 
  // let startX = random(margin, width - margin);
  // let startY = random(margin, height - margin);
  let startX = width/2;
  let startY = height/2;
  //build the blocks
  for(let i = 0; i < numBlocks; i++){
    //decide on the corner
    let w = floor(random(1, 12)) * cellSize * (random() > 0.5 ? 1 : -1);
    let h = floor(random(1, 12)) * cellSize * (random() > 0.5 ? 1 : -1);

    blocks.push(new Block(startX, startY, w, h));
    let newBlock = blocks[i]

    nextCorner = newBlock.corners[floor(random(newBlock.corners.length))]
    console.log(nextCorner);

    startX = nextCorner.x;
    startY = nextCorner.y;

  }
}

function draw() {
  background(255);

  for(let b of blocks){
    b.draw();
  }

  if(frameCount % 60 == 0){
    buildBlocks();
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