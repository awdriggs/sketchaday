function setup() {
  createCanvas(800, 800);
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
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

