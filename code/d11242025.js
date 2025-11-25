//things become a constellation
let constellations = [];
let largestConstellation;
// let numCols, numRows;
// let largestNode;

let step = 0.01;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let margin =  width/10;
  // let numConstellations = 4;
  let numCols = 4;
  let numRows = 4;
  let colSize = width/numCols;
  let rowSize = height/numRows;

  for(let i = 0; i < numRows; i++){
      let cornerY = i * rowSize; 
    for(let j = 0; j < numCols; j++){
      let cornerX = j * colSize;
      constellations.push(new Constellation(cornerX, cornerY, cornerX + rowSize, cornerY + rowSize, colSize/20, colSize/2, floor(random(2, 6))));
    }
    // constellations.push(new Constellation(margin, margin, width-margin, height-margin, width/10, width/4, 1));
  }

  //find the largest conestellation
  largestConstellation = 0;

  // largestNode = constellations[0].things[constellations[0].largestNode

  for(let i = 1; i < constellations.length; i++){
    // let currentConstellation = constellation[i];
    // let largestConstellation = constellation[largestConstellation];
    if(constellations[i].things[constellations[i].largestNodeIndex].size > constellations[largestConstellation].things[constellations[largestConstellation].largestNodeIndex].size){
      largestConstellation = i;
    }

  }

  // test = new Thing(400, 400, 100, 0);

}

function draw() {
  background(255);

  for(let c of constellations){
    let largestNode = c.things[c.largestNodeIndex]
    let largestOfAll = constellations[largestConstellation].things[constellations[largestConstellation].largestNodeIndex]
    // debugger
    stroke(0);
    line(largestNode.x, largestNode.y, largestOfAll.x, largestOfAll.y);
  }

  for(let c of constellations){
    c.draw();
  }
}

// console.log(test.angle

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

class Constellation {
  constructor(minX, minY, maxX, maxY, minRadius, maxRadius, numNodes){
    this.things = [];

    this.largestNodeIndex = 0;

    for(let i = 0; i < numNodes; i++){
      let x = random(minX, maxX);
      let y = random(minY, maxY);
      let radius = random(minRadius, maxRadius); //arc raidus
      let angle = random(0, TWO_PI);
      let size = random(width/30, width/20);
      let fillColor = color(random(255), random(255), random(255));
      this.things.push(new Thing(x, y, radius, angle, size, fillColor));

      if(i > 0){
        if(size > this.things[this.largestNodeIndex].size){
          this.largestNodeIndex = i;
        }
      }
    }
  }

  // generateNodes(){

  // }

  draw(){
    //draw the lines
    stroke(0);
    strokeWeight(1);
    for(let i = 0; i < this.things.length; i++){
      let thisNode = this.things[i];
      // let nextNode = this.things[i+1];
      // line(thisNode.x, thisNode.y, nextNode.x, nextNode.y);

      let largestNode = this.things[this.largestNodeIndex]

      line(thisNode.x, thisNode.y, largestNode.x, largestNode.y);
    }

    noStroke();
    //draw the circles
    for(let t of this.things){
      t.draw();
    }
  }


}

class Thing {
  constructor(x, y, r, a, s, fill){
    this.cx = x;
    this.cy = y;
    this.r = r;
    this.angle = a;
    this.size = s; //circles
    this.rotate();
    this.dir = random() > 0.5 ? -1 : 1; //cw or ccw
    this.color = fill;
  }

  rotate(){
    this.angle += step;
    this.x = this.cx + cos(this.angle * this.dir) * this.r;
    this.y = this.cy + sin(this.angle * this.dir) * this.r;
  }

  reverse(){
    this.dir *= -1;
  }

  draw(){ //change to differenct shapes later?
    this.rotate(); //update position

    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

