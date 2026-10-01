let hGrid = [];
let vGrid = [];

let colors = ["#FA3BF050", "#FFED2950", "#1BFC0650", "#30C5FF50", "#FF5C0050", "#8A00C450"];

function setup(){
  createCanvas(800, 800);
  reset();

  noStroke();
}

function draw(){
  background(255);
  for(let c of hGrid){
    c.draw();
  }

  if(frameCount % 30 == 0){
    reset();
  }
}

function reset(){
  hGrid = [];
  vGrid = [];
  colors = shuffle(colors);

  let margin = width/10;

  let numRows = 10;
  let lineWidth = (height - margin)/numRows;

  let stepSize = 1;

    let oMin = 5 * width/800;
    let oMax = 10 * width/800;

  for(let i = 0; i < numRows; i++){
    let y = i * lineWidth + margin/2 - (lineWidth * 0.2);
    let offset = 0;
    let rowOffset = random() > 0.5 ? random(-oMin, -oMax) : random(oMin, oMax);
    for(let x = margin/2; x < width - margin/2 + rowOffset; x += stepSize){
      if(random() > 0.92){
        offset += random() > 0.5 ? -1 : 1;
      }
      hGrid.push(new Cell(x + rowOffset, y + offset, stepSize, lineWidth * 1.2, colors[0]));
    }
  }

  for(let i = 0; i < numRows; i++){
    let x = i * lineWidth + margin/2 - (lineWidth * 0.2);
    let offset = 0;
    let rowOffset = random() > 0.5 ? random(-oMin, -oMax) : random(oMin, oMax);
    for(let y = margin/2; y < width - margin/2 + rowOffset; y += stepSize){
      if(random() > 0.92){
        offset += random() > 0.5 ? -1 : 1;
      }
      hGrid.push(new Cell(x + offset, y + rowOffset, lineWidth * 1.2, stepSize, colors[1]));
    }


  }
}

// function mousePressed(){
//   reset();
// }


function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Cell {
  constructor(x, y, w, h, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c; //color
  }

  draw(){
    fill(this.c);

    rect(this.x, this.y, this.w, this.h);
  }

}
