let numSteps = 20;
let stepSize;
let view = 0;

let views = [];
// views[view]();

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  views = [
    () => { radial(0, height/2, numSteps); radial(width, height/2, numSteps); },
    () => { radial(0, 0, numSteps * 2); radial(width, 0, numSteps * 2); radial(width, height, numSteps * 2); radial(0, height, numSteps * 2); },
    () => { verts(0, 0, numSteps); hors(0, 0, numSteps); },
    () => { views[0](); views[2](); }, // calls both without repeating
    () => { views[1](); views[2](); }, // calls both without repeating
    () => { radial(width/2, height/2, numSteps); views[2](); }, // calls both without repeating
  ];


  stepSize = width/numSteps;
  noFill();
}

function draw() {
  background(255);

  views[view]();

}

function radial(x, y, num){
  for(let i = 0; i < num; i++){ //left side radiate out
    let size = i * stepSize + stepSize
    ellipse(x, y, size * 2, size * 2);
    // line(size, 0, size, height);
  }
}

function verts(x, y, num){
  for(let i = 0; i < num; i++){ //left side radiate out
    let size = i * stepSize + stepSize
    line(size, 0, size, height);
  }
}

function hors(x, y, num){
  for(let i = 0; i < num; i++){ //left side radiate out
    let size = i * stepSize + stepSize
    line(0, size, width, size);
  }
}

function mousePressed() {
  view++;
  console.log("click", view);
  if(view > views.length - 1){
    view = 0;
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

