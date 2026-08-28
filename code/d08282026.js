
function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(10 * width/800);
}

function draw() {
  background(255);
  drawTouchingCircles(0, 0, width, height, 20);
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

function drawTouchingCircles(x, y, totalWidth, totalHeight, numSteps){
  // for(let i = 0; i < numSteps * 2; i++){
  //   let r1 = i * (totalWidth / numSteps);
  //   let r2 = totalWidth - r1;

  //   circle(x, y, r1 * 2);
  //   circle(x + totalWidth, y, r2 * 2);
  //   circle(x + totalWidth, y + totalHeight, r1 * 2);
  //   circle(x, y + totalHeight, r2 * 2);
  // }

  let D = dist(0, 0, width, height); // width * sqrt(2)
  for(let i = 0; i < numSteps * 2; i++){
  let r1 = i * (D / numSteps);
  let r2 = D - r1;

    circle(x, y, r1 * 2);
    circle(x + totalWidth, y, r2 * 2);
    circle(x + totalWidth, y + totalHeight, r1 * 2);
    circle(x, y + totalHeight, r2 * 2);
  }

  //  Pseudocode:
  //   for each step i from 0 to numSteps:
  //     r1 = i * (width / numSteps)           // grows 0 → width
  //     r2 = width - r1                        // shrinks width → 0

  //     draw circle at (0, 0) with radius r1
  //     draw circle at (width, 0) with radius r2
  //     draw circle at (width, height) with radius r1
  //     draw circle at (0, height) with radius r2

}
