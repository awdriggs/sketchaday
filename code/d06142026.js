//wiggly line
let points = [];
let numSegments = 10;
let segmentLength;
let n = 0;

function setup() {
  createCanvas(800, 800);
  segmentLength = width/numSegments;
  // createCanvas(windowWidth, windowHeight);

  strokeWeight(12 * width/800);
}

function draw() {
  background(255);

  for(let i = 0; i < points.length; i++){
    if(i > 0){
      line(points[i].x, points[i].y, points[i-1].x, points[i-1].y);
    }
  }

  n += 0.01

  updatePoints();
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
  points = [];

  for(let i = 0; i < numSegments + 1; i++){
    let x = i * segmentLength;
    let y = height/2 + noise(i, n) * 10;

    points.push({x: x, y: y});
  }

}

