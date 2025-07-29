let numCols, slantWidth;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols =  3;
  slantWidth = width/numCols;

}

function draw() {
  background(255);

  let x = mouseX;

  fill(0);
  quad(x, 0,  x + slantWidth, 0, x, height, x - slantWidth, height); 

  fill(255);
  noStroke();
  x = width - mouseX;
  quad(x, 0,  x - slantWidth, 0, x, height, x + slantWidth, height); 
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

