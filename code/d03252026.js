let movers = []
let globalFill;
let newFill;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  let dim = 10;
  let margin = width/10;
  let cellSize = (width - margin)/dim;

  globalFill = color(random(255), random(255), random(255));
  newFill = color(random(255), random(255), random(255));;

  for(let i = 0; i < dim; i++){
    let y = i * cellSize + margin;
    for(let j = 0; j < dim; j++){
      let x = j * cellSize + margin;
      let neighbors = calcNeighborIndex(j, i, dim, dim);
      print(neighbors)
      movers.push(new Rotator(x, y, cellSize/2 * 0.8, neighbors)); //add the indexes
    }
  }

  movers[floor(random(movers.length))].fill = newFill; 

  noStroke();
}


function calcNeighborIndex(hIndex, vIndex, hMax, vMax){
  let neighbors = [];
  //find neigbhors indexs the 1 day array of movers
  if(hIndex > 0){
    neighbors.push((vIndex) * hMax + (hIndex - 1));
  }

  if(hIndex + 1 < hMax){
    neighbors.push((vIndex) * hMax + (hIndex + 1));
  }

  if(vIndex > 0){
    neighbors.push((vIndex - 1) * hMax + hIndex);
  }

  if(vIndex + 1 < vMax){
    neighbors.push((vIndex + 1) * hMax + hIndex);
  }

  return neighbors;
}

function draw() {
  background(255);

  for(let m of movers){
    m.update();
    m.draw();
  }

  checkForFill();

}

function checkForFill(){
  // let alledFilled = true;

  // for(let i = 0; i < movers.length; i++){
  //   let 
  // }

  for(let m of movers){
    if(m.fill == globalFill){
      return; //exit
    }
  }
   
  //if you get here, no movers have the global fill
  //reset
  globalFill = newFill;
  newFill = color(random(255), random(255), random(255));;
  movers[floor(random(movers.length))].fill = newFill; 
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

class Rotator{
  constructor(cx, cy, r, neighbors){
    this.cx = cx;
    this.cy = cy;
    this.radius = r;
    this.speed = random(0.04, 0.05);
    this.angle = random(0, TWO_PI);
    this.dir = random() > 0.5 ? 1 : -1;
    this.x = cos(this.angle) * this.radius + this.cx;
    this.y = sin(this.angle) * this.radius + this.cy;
    this.neighbors = neighbors
    this.prevState = false;
    // this.fill = color(random(255), random(255), random(255));
    this.fill = globalFill;
  }

  draw(){
    this.getFill()
    fill(this.fill);
    // ellipse(this.cx, this.cy, this.radius, this.radius);
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  update(){
    this.angle += this.speed * this.dir
    this.x = cos(this.angle) * this.radius + this.cx;
    this.y = sin(this.angle) * this.radius + this.cy;
  }

  getFill(){
    // let filler = this.fill;

    for(let n of this.neighbors){
      let neighbor = movers[n];

      // debugger;
      if(dist(this.x, this.y, neighbor.x, neighbor.y) < (this.radius + neighbor.radius)/2){
        if(this.prevState == false && this.fill == globalFill){
          this.fill = neighbor.fill;
          this.prevState = true;
        }
        break;
      } else {
        this.prevState = false;
      }
    }

    // return filler;
  }

}

