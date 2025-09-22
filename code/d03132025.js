//speed run! playing catchup

let count = 50;
let hoffset;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  
  hoffset = width/count;
  
  noLoop();
}

function draw() {
  background(255);
  
  for(let i = 0; i < count; i++){
    
    let scaled = map(i, 0, count, 0, TWO_PI) 
    let a = cos(scaled);
    strokeWeight(map(a, -1, 1, 0.1, 10));
    line(i * hoffset, 0, i * hoffset, height);
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3,7)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}