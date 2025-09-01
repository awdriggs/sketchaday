let offsetX = 0;
let offsetY = 0;
let max;// = 200;

function setup() {
  createCanvas(800, 800);
  max = width/4;
  print("working");
  noStroke();
  background(0);
}

function draw() {
  fill(255, 100);
  let x = cos(offsetX) * max + width/2;
  let y = sin(offsetY) * max + height/2;

  ellipse(x, y, 2, 2);

  if(x == 0){
    print(boom);
  }

  offsetX += random(0.05);
  offsetY += random(0.05);

  if(frameCount % 100 == 0){
    max += random(-10, 10);
     
    console.log("boom");
    // offSetX = 0;
  }

}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}





function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
