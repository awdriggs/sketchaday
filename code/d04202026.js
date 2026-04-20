let lines = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  createLines();


}

function createLines(){
  lines = [];

  let strokeWidth = width/100;
  //push the borders
  let margin = width/10
  lines.push(new Line(createVector(margin, margin), createVector(width - margin, margin), 0, strokeWidth));
  lines.push(new Line(createVector(width - margin, margin), createVector(width - margin, height - margin), 0, strokeWidth));
  lines.push(new Line(createVector(width - margin, height - margin), createVector(margin, height - margin), 0, strokeWidth));
  lines.push(new Line(createVector(margin, height-margin), createVector(margin, margin), 0, strokeWidth));


  //add major lines, connect border to border only
  //put random lines along any existing line
  let majorLines = 10;
  for(let i = 0; i < majorLines; i++){
    let indexes = getIndexes(lines, 0, 4);

    //get two random lines
    let line1 = lines[indexes[0]];
    let line2 = lines[indexes[1]];

    // let line1 = lines[lines.index - 1]
    // let line2 = lines[

    //get a random point on each line
    let t1 = random(0.2, 0.8);
    // let t1 = 0.5;
    let start = createVector(line1.start.x + t1 * (line1.end.x - line1.start.x), line1.start.y + t1 * (line1.end.y - line1.start.y));
    let t2 = random(0.2, 0.8);
    // let t2 = 0.5;
    let end = createVector(line2.start.x + t2 * (line2.end.x - line2.start.x), line2.start.y + t2 * (line2.end.y - line2.start.y));
    //create a new line between those points
    lines.push(new Line(start, end, 0, strokeWidth));
  }

  ////now create lines between majorlines only
  //let minorLines = 10;
  //for(let i = 0; i < minorLines; i++){
  //  let indexes = getIndexes(lines, 4, 4 + majorLines);

  //  //get two random lines
  //  let line1 = lines[indexes[0]];
  //  let line2 = lines[indexes[1]];

  //  // let line1 = lines[lines.index - 1]
  //  // let line2 = lines[

  //  //get a random point on each line
  //  let t1 = random();
  //  // let t1 = 0.5;
  //  let start = createVector(line1.start.x + t1 * (line1.end.x - line1.start.x), line1.start.y + t1 * (line1.end.y - line1.start.y));
  //  let t2 = random();
  //  // let t2 = 0.5;
  //  let end = createVector(line2.start.x + t2 * (line2.end.x - line2.start.x), line2.start.y + t2 * (line2.end.y - line2.start.y));
  //  //create a new line between those points
  //  lines.push(new Line(start, end, 0, strokeWidth));
  //}
}

function getIndexes(arr, min, max) {
  const i = floor(random(min, max));
  let j;
  do {
    j = Math.floor(random(min, max));
  } while (j === i);
  return [i, j];
}

function draw() {
  background(255);

  for(let i = 4; i < lines.length; i++){
    lines[i].draw();
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


