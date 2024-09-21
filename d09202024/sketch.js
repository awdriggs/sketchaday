//playing with colorblending modes
//taking more inspiration from Kitty van der mijll dekker
//https://www.stedelijk.nl/nl/collectie/30278-kitty-van-der-mijll-dekker-staal-monster

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  noStroke();

  // Create a dropdown and place it beneath the canvas.
  blendSelect = createSelect();
  blendSelect.position(50, 50);

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
  // background('magenta');

  // fill(255);
  // rect(0,0,width,height);

  let rectSize = 100;

  //vertical bars
  fill(255, 0, 0, 100);
  for(let x = rectSize; x < width; x += rectSize * 2){
    rect(x, 0, rectSize, height);
  }
  //horizontal bars
  fill(0, 0, 255, 100);
  for(let y = rectSize; y < height; y += rectSize * 2){
    rect(0, y, width, rectSize);
  }


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
