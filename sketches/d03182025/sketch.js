//speed run! playing catchup

let count = 100;
let numLines = 10;
let hoffset, voffset;
let strokesX = [];
let strokesY = [];
let strokeIndex = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  hoffset = width/numLines;
  voffset = width/numLines;

  for(let i = 0; i < count + 1; i++){

    let scaled = map(i, 0, count, 0, TWO_PI)
    let a = cos(scaled);
    strokesX.push(map(a, -1, 1, 0.1, 10));

    // let b = sin(scaled);
    strokesY.push(map(a, -1, 1, 10, 0.1));

    // let b = (scaled);
    // strokesY.push(map(a, -1, 1, 0.1, 10));
    // line(i * hoffset, 0, i * hoffset, height);
    // line(0, i * voffset, width, i*voffset);
  }

}

function draw() {
  background(255);


  for(let i = 0; i < numLines + 1; i++){
    strokeWeight(strokesX[strokeIndex]);

    stroke("blue");
    line(i * hoffset, 0, i * hoffset, height);

    stroke("red");
    strokeWeight(strokesY[strokeIndex]);
    line(0, i * voffset, width, i*voffset);

  }

  if(frameCount % 1 == 0){
    strokeIndex++;

    if(strokeIndex >= count){
      strokeIndex =0;
    }
  }
}

function shiftStrokes(){
  let first = strokes.pop();
  strokes.unshift(first);
  print("shifted");

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

