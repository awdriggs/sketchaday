//speed run! playing catchup

let count = 50;
let hoffset;
let strokes = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  
  hoffset = width/count;
  voffset = height/count;

  for(let i = 0; i < count + 1; i++){
    
    let scaled = map(i, 0, count, 0, TWO_PI) 
    let a = cos(scaled);
    strokes.push(map(a, -1, 1, 0.1, 10));
    // line(i * hoffset, 0, i * hoffset, height);
    // line(0, i * voffset, width, i*voffset);
  }

  // noLoop();
}

function draw() {
  background(255);
  
  for(let i = 0; i < count + 1; i++){
    
    strokeWeight(strokes[i]);
    line(i * hoffset, 0, i * hoffset, height);
    line(0, i * voffset, width, i*voffset);
  }

  shiftStrokes();

}

function shiftStrokes(){
  let first = strokes.shift();
  strokes.push(first);
  print("shifted");
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 7)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}

