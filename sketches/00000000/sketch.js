function setup() {
  createCanvas(400, 400);
  // createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

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

