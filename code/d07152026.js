let type;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  type = floor(random(0, 4));
  noFill();
}

function draw() {
  background(255);

  drawLines(width, height, type);

  if(frameCount % 60 == 0){
    type = floor(random(0, 4));
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

//line types
function drawLines(w, h, t){
  let numLines = floor(width / 10);
  let spacing = w / numLines;
  let amplitude = w / numLines;

  let cycles = 3;

  // stroke("red");
  if(t == 0){ //horiziontal sin
    for(let i = -1; i < numLines + 2; i++){
      beginShape();
      for (let x = 0; x < w; x++) {
        let y = i * amplitude + sin(map(x, 0, w, 0, TWO_PI * cycles)) * amplitude;
        vertex(x, y);
      }
      endShape(OPEN);
    }
  } else if(t == 1){ //vertical sine
    for(let i = -1; i < numLines + 2; i++){
      beginShape();
      for(let y = 0; y < h; y++){
        let x = i * amplitude + sin(map(y, 0, h, 0, TWO_PI * cycles)) * amplitude;
        vertex(x, y);
      }
      endShape(OPEN);
    }
  } else if(t == 2){ //horiziontal lines
    for(let i = 0; i < numLines + 1; i++){
      line(0, i * spacing, w, i * spacing);
    }
  } else { //vertical lines
    for(let i = 0; i < numLines + 1; i++){
      line(i * spacing, 0, i * spacing, h);
    }
  }
}
