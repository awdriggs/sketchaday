let points = []
let turnRadius = 100;
let numTurns;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numTurns = width/turnRadius;
}

function draw() {
  background(255);
  for(let h = 0; h < numTurns; h++){
    let y = turnRadius * h;
  for(let i = 0; i < numTurns; i++){
    let x = turnRadius * i;
    ellipse(x,y, 2, 2);
    if(i % 2 == 0){
      arc(x, y, turnRadius, turnRadius, 0,PI);
    } else {
      arc(x,y, turnRadius, turnRadius, PI, 0);
    }

  }
  }

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