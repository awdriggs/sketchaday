//speed run! playing catchup

let count = 50;
let hoffset;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  
  hoffset = width/count;
  
}

function draw() {
  background(255);
  
  for(let i = 0; i < count; i++){
    strokeWeight(map(i, 0, count, 0.1, 10));
    line(i * hoffset, 0, i * hoffset, height);
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}