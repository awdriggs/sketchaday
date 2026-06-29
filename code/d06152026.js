//wiggly line
let numSegments = 10;
let segmentLength;
let numRows, rowHeight;
let lines = [];

function setup() {
  createCanvas(800, 800);
  segmentLength = width/numSegments;

  numRows = 50;
  rowHeight = height/numRows;

  for(let i = 0; i < numRows; i++){
    let y = i * rowHeight + rowHeight/2;
    
    lines.push(new wiggleLine(y, i));
  }
  
  // createCanvas(windowWidth, windowHeight);

  strokeWeight(2 * width/800);
}

function draw() {
  background(255);
  for(let l of lines){
    l.update();
    l.draw();
  }
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

function updatePoints(){


}

class wiggleLine {
  constructor(y, rowNum){
    this.n = rowNum/10;
    this.y = y;
  }

  update(){
    this.n += 0.01;
    this.points = [];

    for(let i = 0; i < numSegments + 1; i++){
      let x = i * segmentLength;
      let y = this.y + noise(i, this.n) * (rowHeight/2) ;

      this.points.push({x: x, y: y});
    }
  }

  draw(){
    for(let i = 1; i < this.points.length; i++){
      line(this.points[i].x, this.points[i].y, this.points[i-1].x, this.points[i-1].y);
    }
  }
}

