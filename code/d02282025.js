let size;
let tiles = [];
let numCols, numRows;

function setup() {
  createCanvas(800, 800);

  numCols = 10;
  numRows = 10;
  size = width/numCols; //always square?

  // createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < numCols; i++){
    let x = i * size;
    for(let j = 0; j < numRows; j++){
      let y = j * size
      tiles.push(new shiftedPoly(x, y, size));
    }
  }
}

function draw() {
  background(255);

  for(let i = 0; i < tiles.length; i++){
    let t = tiles[i];
    t.draw();

    if(frameCount % 60 == 0){
      tiles[i] = new shiftedPoly(t.x, t.y, t.size);
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

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class shiftedPoly {
  constructor(x, y, size){
    this.x = x; //origin top left, needed?
    this.y = y;
    this.size = size;
    this.defineShape(x, y, size);
  }

  defineShape(x,y, size){
    this.cordinates = []
    this.cordinates.push(createVector(x, y));
    this.cordinates.push(createVector(x + size, y));
    this.cordinates.push(createVector(x + size, y + size));
    this.cordinates.push(createVector(x, y + size));

    let randomPoint = floor(random(this.cordinates.length));
    let randomAxis = floor(random(2)); //random int 0 or 1
    let amount = random(size/4, size/2);
    //determine dir
    let dir ;
    if(randomAxis == 0 && (randomPoint == 0 || randomPoint == 3)){ //left side x, shift right, so pos
      dir = 1;
    } else if(randomAxis == 1 && (randomPoint == 3 || randomPoint == 2)){ //bottom side y, shift up, so neg
      dir = -1;
    } else if(randomAxis == 0 && (randomPoint == 1 || randomPoint == 2)){ //right side x, shift left, so neg
      dir = -1;
    } else if(randomAxis == 1 && (randomPoint == 0 || randomPoint == 1)){ //top side y, shift dwon, so pos
      dir = 1;
    }

    let shiftPoint = this.cordinates[randomPoint];
    if(randomAxis == 0){
      shiftPoint.x += amount * dir;
    } else {
      shiftPoint.y += amount * dir;
    }

    // print("point", randomPoint, "axis", randomAxis, "amount", amount, "dir", dir);
  }

  draw(){
    fill(0);
    beginShape();
    for(let p of this.cordinates){
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
  }
}