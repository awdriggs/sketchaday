let size;
let tiles = [];
let numCols, numRows;

function setup() {
  // createCanvas(800, 800);
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
    // t.update();
    t.draw();

    // if(frameCount % 60 == 0){
    //   tiles[i] = new shiftedPoly(t.x, t.y, t.size);
    // }
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

    this.randomPoint = floor(random(this.cordinates.length));
    this.randomAxis = floor(random(2)); //random int 0 or 1
    this.amount = random(size/4, size/2);
    //determine dir

    if(this.randomAxis == 0 && (this.randomPoint == 0 || this.randomPoint == 3)){ //left side x, shift right, so pos
      this.dir = 1;
    } else if(this.randomAxis == 1 && (this.randomPoint == 3 || this.randomPoint == 2)){ //bottom side y, shift up, so neg
      this.dir = -1;
    } else if(this.randomAxis == 0 && (this.randomPoint == 1 || this.randomPoint == 2)){ //right side x, shift left, so neg
      this.dir = -1;
    } else if(this.randomAxis == 1 && (this.randomPoint == 0 || this.randomPoint == 1)){ //top side y, shift dwon, so pos
      this.dir = 1;
    }

    let shiftPoint = this.cordinates[this.randomPoint];

    if(this.randomAxis == 0){
      shiftPoint.x = shiftPoint.x + this.amount * this.dir;
    } else {
      shiftPoint.y = shiftPoint.y + this.amount * this.dir;
    }

    // print("point", randomPoint, "axis", randomAxis, "amount", amount, "dir", dir);

    //swap the direction so that you can begin 
  }

  draw(){

    // this.update();


    fill(0);
    beginShape();
    for(let p of this.cordinates){
      vertex(p.x, p.y);
    }
    endShape(CLOSE);

    this.update();
  }

  update(){
    let step = random(0.5);
     
    let shiftPoint = this.cordinates[this.randomPoint];
    // fill("red");
    // // ellipse(shiftPoint.x, shiftPoint.y, 10, 10);

    let distance; 

    if(this.randomAxis == 0){
      // shiftPoint.x = shiftPoint.x + this.amount * this.dir;
      if(distance = abs((this.x + this.size/2) - shiftPoint.x) > this.size/4){
        this.dir*=-1;  
      }
      console.log(distance); 
      shiftPoint.x += step * this.dir;
    } else {
      // shiftPoint.y = shiftPoint.y + this.amount * this.dir;
      // shiftPoint.y ++;
      if(distance = abs((this.y + this.size/2) - shiftPoint.y) > this.size/4){
        this.dir*=-1;  
      }
      console.log(distance); 
      shiftPoint.y += step * this.dir;
    }
    // debugger;
  }

}