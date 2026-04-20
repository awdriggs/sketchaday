let lines = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  createLines();
  

}

function createLines(){ 
  lines = [];

  let strokeWidth = 4;
  //push the borders
  lines.push(new Line(createVector(0,0), createVector(width, 0), 0, strokeWidth));
  lines.push(new Line(createVector(width, 0), createVector(width, height), 0, strokeWidth));
  lines.push(new Line(createVector(width, height), createVector(0, height), 0, strokeWidth));
  lines.push(new Line(createVector(0, height), createVector(0, 0), 0, strokeWidth));

  let numLines = 50;

  //put random lines along any existing line
  for(let i = 0; i < numLines; i++){
    let indexes = getIndexes(lines);

    //get two random lines
    let line1 = lines[indexes[0]];
    let line2 = lines[indexes[1]];

    //get a random point on each line
    let t1 = random();
    // let t1 = 0.5;
    let start = createVector(line1.start.x + t1 * (line1.end.x - line1.start.x), line1.start.y + t1 * (line1.end.y - line1.start.y));
    let t2 = random();
    // let t2 = 0.5;
    let end = createVector(line2.start.x + t2 * (line2.end.x - line2.start.x), line2.start.y + t2 * (line2.end.y - line2.start.y));
    //create a new line between those points
    lines.push(new Line(start, end, 0, strokeWidth));
  }
}

function getIndexes(arr) {
  const i = Math.floor(Math.random() * arr.length);
  let j;
  do {
    j = Math.floor(Math.random() * arr.length);
  } while (j === i);
  return [i, j];
}

function draw() {
  background(255);

  for(let l of lines){
    l.draw();
  }
}

function mousePressed(){
  createLines();
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

class Line {
  constructor(startXY, endXY, c, strokeW){
    this.start = startXY;
    this.end = endXY;
    this.color = c;
    this.strokeWidth = strokeW;
  }

  draw(){
    strokeWeight(this.strokeWidth);
    stroke(this.color);

    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}


