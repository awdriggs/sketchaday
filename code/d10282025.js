//sol lewitt, all comintiosn of rectangle, triangle and circle

let points;
let tl, tr, bl, br;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  points = generatePoints(width/10, height/10, width - 2 * width/10, height - 2 * height/10);
  // points = generatePoints(0, 0, width, height);
  console.log(points);

  tl_index = 0;
  tr_index = 2;
  bl_index = 0;
  br_index = 2;

  // frameRate(1);

}

function draw() {
  background(255);
  drawPoly();

  if(frameCount % 60 == 0){
    updateIndexes();
  }
}

function generatePoints(x, y, w, h){
  //x and y are the top left corner points
  //w and h are the width and height of the bounding square

  let a = createVector(x, y)
  let b = createVector(x + w * 0.25, y)
  let c = createVector(x + w * 0.5, y)
  let d = createVector(x + w * 0.75, y)
  let e = createVector(x + w, y)
  let f = createVector(x, y + h)
  let g = createVector(x + w * 0.25, y + h)
  let i = createVector(x + w * 0.5, y + h)
  let j = createVector(x + w * 0.75, y + h)
  let k = createVector(x + w, y + h)

  let points = {
    tl: [a, b, c],
    tr: [c, d, e],
    bl: [f, g, i],
    br: [i, j, k]
  };

  return points
}

function drawPoly(){
  p1 = points.tl[tl_index];
  p2 = points.tr[tr_index];
  p3 = points.br[br_index];
  p4 = points.bl[bl_index];

  noFill;

  beginShape();
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.y);
  vertex(p3.x, p3.y);
  vertex(p4.x, p4.y);

  endShape(CLOSE);

}

function updateIndexes(){
  //do it random first
  tl_index = floor(random(0, 3));
  tr_index = floor(random(0, 3));
  bl_index = floor(random(0, 3));
  br_index = floor(random(0, 3));
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

