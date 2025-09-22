//speed run! playing catchup

let count = 50;
let hoffset, voffset;
let strokesX = [];
let strokesY = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  
  hoffset = width/count;
  voffset = width/count;
  
  for(let i = 0; i < count + 1; i++){
    
    let scaled = map(i, 0, count, 0, PI) 
    let a = cos(scaled);
    strokesX.push(map(a, -1, 1, 0.1, 10));

    // let b = (scaled);
    strokesY.push(map(a, -1, 1, 0.1, 10));
    // line(i * hoffset, 0, i * hoffset, height);
    // line(0, i * voffset, width, i*voffset);
  }

}

function draw() {
  background(255);
  
  for(let i = 0; i < count + 1; i++){
    strokeWeight(strokesX[i]);
    line(i * hoffset, 0, i * hoffset, height);

    strokeWeight(strokesY[i]);
    line(0, i * voffset, width, i*voffset);
  }

  shiftStrokes();
}

function shiftStrokes(){
  let first = strokesX.pop();
  strokesX.unshift(first);
  print("shifted");

  first = strokesY.shift();
  strokesY.push(first);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 7)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}