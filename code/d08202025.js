//a brush that is a line with a number of points across it, the bristles
//the bristles are space evenly apart, with some play to make it more natural
//the the brush is moved, each bristle draws a point

let linePoints = []; //aka bristles
let numPoints; //num bristles
let lineLength; //width of brush

//for drawing
let y, ydir;
let yMin, yMax;
let n = 0;
let left;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  lineLength = width/2; //width of the line
  numPoints = width/4; 
  let lineSpacing = lineLength/numPoints;
  // let start = width/2 - lineLength/2
  let start = 0;
  //space bristles
  for(let i = 0; i < numPoints; i++){
    let x = i * lineSpacing + start;
    x += random(-lineSpacing/2, lineSpacing/2)

    let yOffset = random(-height/8, height/8);
    linePoints.push({x: x, y: yOffset});
  }

  noStroke();
  fill(0);

  left = width/2 + random(-width/8, width/8) - lineLength/2;
  y = height/2;
  ydir = 1;

  yMax = height * 0.75;
  yMin = height * 0.25;
  background(255);
}


function draw() {
  // background(255);


  for(let p of linePoints){
    ellipse(p.x + left, p.y + y, 2, 2);
  }

  left += map(noise(n), 0, 1, -1, 1);

  y+=1 * ydir;

  if(y > yMax || y < yMin){
    // y = yMax;
    ydir *= -1;
    y = random(yMin, yMax); //return to center
    left += random(-width/10, width/10);
    // background(255);
  } 
  n += 0.01;
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 5)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}