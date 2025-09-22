//playing with colorblending modes
//taking more inspiration from Kitty van der mijll dekker
//https://www.stedelijk.nl/nl/collectie/30278-kitty-van-der-mijll-dekker-staal-monster

function setup() {
  // createCanvas(300, 300);
  createCanvas(windowWidth, windowHeight);

  noStroke();

  // Create a dropdown and place it beneath the canvas.
  blendSelect = createSelect();
  blendSelect.position(0, 100);

  // Add color options.

  let options = [BLEND, ADD, DARKEST, LIGHTEST, EXCLUSION, MULTIPLY, SCREEN, REPLACE, REMOVE, DIFFERENCE, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN]

  for(let o of options){
    blendSelect.option(o);
  }

  blendSelect.changed(()=>blendMode(blendSelect.selected()));
  // Set the selected option to "red".
  // blendSelect.selected('red');
}

function draw() {
  // blendMode(blendSelect.selected());
  background('magenta');


  fill('lightgreen');
  fill(144, 238, 144)
  for(let x = 0, w=80; x < width; x += 100, w/=1.5){
    rect(x, 0, w, height);
  }

  let s = width/5;
  fill(255, 0, 0, 127);
  fill(255, 0, 0, 200);
  rect(0, mouseY - s/2, width, s);
  fill(0, 0, 255, 100);
  rect(mouseX - s/2, 0, s, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3,7)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}