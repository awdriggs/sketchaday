let startColor, endColor;
let circSize, repeatNum;

function setup() {
  createCanvas(800, 800);

  // startColor = color(218, 165, 32, 100);
  // endColor = color(72, 61, 139, 100);
  startColor = color('#1a85ff');
  endColor = color('#d41159');
  
  circSize = 50; //small
  repeatNum = width/circSize + 1; //how many cirlces would it take to stretch across the scren exactly.
  


  // Create intermediate colors.
  // let interA = lerpColor(from, to, 0.33);
  // let interB = lerpColor(from, to, 0.66);
  
  noFill();
  noStroke();
  rectMode(CENTER);
    // blendMode(LIGHTEST);
  blendMode(HARD_LIGHT);
  // blendMode(ADD);
}

function draw() {
  background(255);

  let red = map(mouseX, 0, 800, 0, 255);
  startColor.levels[0] = red;
  // endColor.levels[0] = red;
  let startBlue = map(cos(frameCount/15), -1, 1, 0, 255);
  startColor.levels[2] = startBlue;

  let green = map(mouseY, 0, 800, 0, 255);
  startColor.levels[1] = green;

  let blue = map(cos(frameCount/10), -1, 1, 0, 255);
  endColor.levels[2] = blue;
  
  for(let h = 0; h < repeatNum * 1.75; h++){
  for(let i = 0; i < repeatNum * 1.75; i++){
    let x = i * (circSize/2);
    let percentOfWidth = x/width; 
    fill(lerpColor(startColor, endColor, percentOfWidth));
    rect(i * circSize*0.6, h * circSize * 0.6, circSize, circSize);
  }

  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

