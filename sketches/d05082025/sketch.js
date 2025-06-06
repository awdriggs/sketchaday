let cells = [];
let wave = [];
let offset = 0;
let jitter = 0;
let numWaves;
let vOffset;
let DEBUG = false;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  stroke("red");

  let numRows = 50;
  let numCols = 50;
  let sqWidth = width/numCols;
  let sqHeight = height/numRows;
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      cells.push(new Cell(j * sqWidth, i * sqHeight, sqWidth, sqHeight))
    }
  }

  numWaves = 7;
  vOffset = width/numWaves;
}

function draw() {
  background(255);

  wave = []; //clear the wave
  for(let h = 0; h < numWaves; h++){
    for(let i = 0; i < width; i++){
      let x = i;
      //replace wiht noise
      // let y = cos(i/80 + offset) * 200 + width/2;
      let y = noise(i/80 - offset, jitter, h) * 200 + (vOffset * h + vOffset/2 - 100); //noise is from 0 to 1, cos is -1 to 1
      wave.push({x: x, y: y});
      // point(x,y)
      jitter+=0.00005
    }
  }


  stroke(0);
  for(let c of cells){
    c.checkForFill(wave);
    c.draw();
  }

  //draw sine wave
  if(DEBUG){
    stroke("red")
    for(let p of wave){
      ellipse(p.x, p.y, 2, 2);
    }
  }

  offset += 0.01;

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 9)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Cell {
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.on = false;
  }

  checkForFill(wave){
    this.on = false; //reset

    for(let i = 0; i < wave.length; i++){
      // debugger;
      if(wave[i].x > this.x && wave[i].x < this.x + this.w && wave[i].y > this.y && wave[i].y < this.y + this.h){
        this.on = true;
        // debugger;
        this.fill = wave[i].c;
      }
      // if(wave[i].x > this.x + this.w){
      //   return //stop checking
      // }
    }

  }

  draw(){
    if(this.on){
      fill(0);
    } else {
      fill(255);
    }

    rect(this.x, this.y, this.w, this.h);
  }

}
