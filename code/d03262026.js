let movers = []
let globalFill;
let newFill;
let points;
let radius = 20;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  points = poisson(width, height, radius);

  globalFill = color(random(255), random(255), random(255));
  newFill = color(random(255), random(255), random(255));;

  for(let i = 0; i < points.length; i++){
      let p = points[i];
      // let neighbors = calcNeighborIndex(j, i, dim, dim);
      neighbors = movers;
    
      movers.push(new Rotator(p.x, p.y, radius, neighbors)); //add the indexes
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
  for(let m of movers){ m.prevState = false; }
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
    let overlapping = false;

    for(let n of this.neighbors){
      if(dist(this.x, this.y, n.x, n.y) < (this.radius + n.radius) / 2){
        overlapping = true;
        if(!this.prevState && this.fill == globalFill && n.fill != globalFill){
          this.fill = n.fill;
          this.prevState = true;
          break;
        }
      }
    }

    if(!overlapping){
      this.prevState = false;
    }
  }

}

