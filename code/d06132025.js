let points = []
let turnRadius = 300;
let numTurns;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numTurns = width/turnRadius;
  noFill();
}

function draw() {
  background(255);
  for(let h = -1 ; h < numTurns + 1; h++){
    let x = turnRadius * h;
    let y2 = turnRadius * h + turnRadius/2;
    for(let i = -1; i < numTurns + 1; i++){
      let y = turnRadius * i;
      // let x2 = turnRadius * i + turnRadius/2;
      let x2 = turnRadius * i; // + turnRadius/2;
      ellipse(x,y, 2, 2);
      if(i % 2 == 0){
        arc(x, y, turnRadius, turnRadius, HALF_PI * 3, HALF_PI);
        arc(x2, y2, turnRadius, turnRadius, 0, PI);
      } else {
        arc(x, y, turnRadius, turnRadius, HALF_PI, HALF_PI * 3);
        arc(x2,y2, turnRadius, turnRadius, PI, 0);
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