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
  fill(0);
}

function draw() {
  background(255);

  let x;
  let y;

  //vertical line
  for(let j = 0; j < vcount + 2; j++){
    for(let i = 0; i < hcount; i++){
      // x = cos(i+inc)*40 + j *voffset;
      // y = i * sqsize;

      // rect(x, y, sqSize, sqSize)
      // inc+= 0.0001;

      // x = i * sqSize;
      x = cos(i+inc)*40 + j *vOffset;
      y = sin(j+inc)*40 + i * vOffset;
      rect(x, y, sqSize, sqSize);

      inc+= 0.0001;
    }
  }

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 6);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

