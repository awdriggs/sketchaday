let freq, amp, yOffset, numLines
let hOffset = 0;
let ampStep = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  amp = height/10;
  freq = width/10;
  numLines = 20;
  yOffset = height/numLines;
}

function draw() {
  background(255);

  // let points = [];
  line(0, height/2, width, height/2);

  for(let h = 0; h < numLines + 2; h++){
    let waveDir = h % 2 == 0 ? -1 : 1;
    // let waveDir = 1;
    let waveOffset = h/10;
    print(h)
    for(let i = 0; i < width; i++){
      let x = i;
      let y = cos(i/freq + hOffset * waveDir + waveOffset * waveDir) * (amp * sin(ampStep)) + (h * yOffset);
      ellipse(x, y, 2, 2);
    }
  }

  hOffset -= 0.01;
  ampStep += 0.05;
   
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 9)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

