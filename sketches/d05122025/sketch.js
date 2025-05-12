let cells1 = [];
let cells2 = [];
let verticalWaves = [];
let horiziontalWaves = [];
let offset = 0;
let hjitter = 0;
let vjitter = 0;
let numWaves;
let vOffset;
let DEBUG = false;
let waveColors = [];

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
      cells1.push(new Cell(j * sqWidth, i * sqHeight, sqWidth, sqHeight))
      cells2.push(new Cell(j * sqWidth, i * sqHeight, sqWidth, sqHeight))
    }
  }


  numWaves = 10;
  vOffset = width/numWaves;

  for(let h = 0; h < 2; h++){
    waveColors[h] = []
    for(let i = 0; i < numWaves; i++){
      let redValue = 0;
      let blueValue = random(0, 255);
      if(h){
        redValue = random(0,255);
        blueValue = 0;
      }
      waveColors[h].push(color(redValue, random(100, 150), blueValue, 100))
    }
  }
  noStroke();

}

function draw() {
  background(255);

  verticalWaves = []; //clear the wave
  horiziontalWaves = []; //clear the wave

  //horiziontal wave
  for(let h = 0; h < numWaves; h++){
    noiseSeed(h)

    waveColor = waveColors[0][h];
    for(let i = 0; i < width; i++){
      let x = i;
      //replace wiht noise
      // let y = cos(i/80 + offset) * 200 + width/2;
      let y = noise(i/80 - offset, hjitter/30) * (height/4) + (vOffset * h + vOffset/2 - height/8); //noise is from 0 to 1, cos is -1 to 1
      horiziontalWaves.push({x: x, y: y, c: waveColor});
      // point(x,y)
      hjitter+=0.00005
    }
  }

  //verticalwave
  for(let h = 0; h < numWaves; h++){
    noiseSeed(h)

    waveColor = waveColors[1][h];
    for(let i = 0; i < width; i++){
      let y = i;
      //replace wiht noise
      // let y = cos(i/80 + offset) * 200 + width/2;
      let x = noise(i/80 - offset, vjitter/30) * (height/4) + (vOffset * h + vOffset/2 - height/8); //noise is from 0 to 1, cos is -1 to 1
      verticalWaves.push({x: x, y: y, c: waveColor});
      // point(x,y)
      vjitter+=0.00005
    }
  }





  stroke(0);
  // stroke(0);
  for(let c of cells1){
    c.checkForFill(verticalWaves);
    // c.draw();
  }

  for(let c of cells2){
    c.checkForFill(horiziontalWaves);
    // c.draw();
  }

    //draw the cells, alternating between the two cells
  for(let i = 0; i < cells1.length; i++){
    cells1[i].draw();
    // if(i%2 == 0){
    // } else {
    //   cells2[i].draw();
    // }
      // cells1[i].draw();
     

  }

  for(let i = 0; i < cells1.length; i++){
    cells2[i].draw();
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
    this.fill;
  }

  checkForFill(wave){
    this.on = false; //reset

    for(let i = 0; i < wave.length; i++){
      // debugger;
      if(wave[i].x > this.x && wave[i].x < this.x + this.w && wave[i].y > this.y && wave[i].y < this.y + this.h){ //voffset for chunky lines
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
      // fill(255);
    }

    noStroke()
    rect(this.x, this.y, this.w, this.h);
  }

}
