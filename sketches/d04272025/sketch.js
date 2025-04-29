//an accident, but I like it!

let hcount = 100;
let vcount = 10;
let vOffset;
let inc = 0;
function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  sqSize = width/hcount;
  vOffset = height/vcount; 
}

function draw() {
  background(255);

  let x;
  let y;

  for(let j = 0; j < vcount; j++){
    for(let i = 0; i < hcount; i++){
      x = j * sqSize;
      y = cos(i+inc)*40 + i * vOffset;
      fill(0);
      rect(x, y, width/2, sqSize);
      inc+=0.00001;
    }
  }

  inc+=0.1;
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

