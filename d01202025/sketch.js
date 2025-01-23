let heights = [];
let numCols, numRos;

function setup() {
  createCanvas(800, 800, WEBGL);
  // noLoop();
  numCols = 10;
  numRows = 10;
  for(let i = 0; i < numCols * numRows; i++){
    heights.push(random(50, 100));
  }
}

function draw() {
  background(255);

  // Enable orbiting with the mouse.
  orbitControl();

  let count = 0;
  for(let i = -5; i< 5; i++){
    for(let j = -5; j < 5; j++){
      push();
      // let h = random(50, 100);
      let grow = random();
      if(heights[count] < 400){
        if(grow > 0.25){
          heights[count] +=0.5;
        } else {
          heights[count] -= 0.5;
        }
      }
      h = heights[count];
      translate(i*50 + i * 10, 100 - h/2, j*50 + j*10);
      box(50, h, 50);
      pop();
      print(count);
      count++;
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
