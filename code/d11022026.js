let centerPoints = [];
let theta = 0;
let numPoints;

function setup() {
  createCanvas(800, 800);
  numPoints = 100;
  let spacing = width/numPoints;

  for(let i = 0; i < numPoints; i++){
    let x = i * spacing + 5;
    let y = sin(theta + map(i, 0, numPoints, 0, TWO_PI)) * height/4 + height/2;
    centerPoints.push({x, y});
  }
  // createCanvas(windowWidth, windowHeight);
  fill(0)
}

function draw() {
  background(255);

  for(let i=0; i < centerPoints.length; i++){ 
    theta += 0.0001;
    let c = centerPoints[i];
    c.y = sin(theta - map(i, 0, numPoints, 0, TWO_PI)) * height/4 + height/2;
    ellipse(c.x, c.y, 10, 10);
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

