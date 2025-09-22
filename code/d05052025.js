let cells1 = [];
let cells2 = [];
let verticalWaves = [];
let horiziontalWaves= [];
let offset = 0;
let numWaves;
let vOffset;
let DEBUG = false;

let waveColors = []

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  stroke("red");

  let numRows = 20;
  let numCols = 20;
  let sqWidth = width/numCols;
  let sqHeight = height/numRows;

  numWaves = 7;
  vOffset = width/numWaves;


  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      cells1.push(new Cell(j * sqWidth, i * sqHeight, sqWidth, sqHeight))
      cells2.push(new Cell(j * sqWidth, i * sqHeight, sqWidth, sqHeight))
    }
  }

  for(let i = 0; i < 2; i++){
    waveColors[i] =  [];
    for(let j = 0; j < numWaves; j++){
      let waveColor = color(random(0,255), random(0,255), random(0,255))
      waveColors[i].push(waveColor)
    }
  }
  noStroke();
}

function draw() {
  background(255);

  verticalWaves = []; //clear the wave
  horiziontalWaves = []; //clear the wave

  // horiziontal wave
  for(let h = 0; h < numWaves; h++){
    let waveColor = waveColors[0][h]

    for(let i = 0; i < width; i++){
      // let step = i; //interesting to play with this shit
      // let step = i/10;
      let step = 0;
      let x = i;
      let freq = vOffset/2;
      let amp = freq
      // let y = cos(i/freq + offset + step + h) * amp + (vOffset * h + vOffset/2);
      let y = cos(i/freq + offset + step) * amp + (vOffset * h + vOffset/2);
      horiziontalWaves.push({x: x, y: y, c: waveColor});
      // point(x,y)
    }
  }

  //vertical wave
  for(let h = 0; h < numWaves; h++){
    // let waveColor = color(random(0,255), random(0,255), random(0,255))
    let waveColor = waveColors[1][h]

    for(let i = 0; i < height; i++){

      // let step = i; //interesting to play with this shit
      // let step = i/10;
      let step = 0;
      let y = i;
      let freq = vOffset/2;
      let amp = freq
      // let y = cos(i/freq + offset + step + h) * amp + (vOffset * h + vOffset/2);
      let x = cos(i/freq - offset + step) * amp + (vOffset * h + vOffset/2);
      verticalWaves.push({x: x, y: y, c: waveColor});
      // point(x,y)
    }
  }


  // stroke(0);
  for(let c of cells1){
    c.checkForFill(verticalWaves);
    c.draw();
  }

  for(let c of cells2){
    c.checkForFill(horiziontalWaves);
    c.draw();
  }

  //draw the cells, alternating between the two cells
  for(let i = 0; i < cells1.length; i++){
    if(i%2 == 0){
      cells1[i].draw();
    } else {
      cells2[i].draw();
    }
  }


  if(DEBUG){
    //draw sine wave
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
    this.fill = 255; //default to white
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
      fill(this.fill);
    } else {
      fill(255);
    }

    rect(this.x, this.y, this.w, this.h);
  }

}