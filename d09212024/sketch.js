//playing with colorblending modes
//taking more inspiration from Kitty van der mijll dekker
//https://www.stedelijk.nl/nl/collectie/30278-kitty-van-der-mijll-dekker-staal-monster
let colorOne, colorTwo;

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

  colorPickOne = createColorPicker('red');
  colorPickOne.position(50, 100);
  colorAlphaOne = createSlider(0, 255, 255);
  colorAlphaOne.position(50, 150);  
  colorAlphaOne.size(100);
  
  colorPickTwo = createColorPicker('blue');
  colorPickTwo.position(50, 200);
  colorAlphaTwo = createSlider(0, 255, 255);
  colorAlphaTwo.position(50, 250);  
  colorAlphaTwo.size(100);

   
  // colorOne = color(colorPickOne.value());
  // colorTwo = color(colorPickTwo.value());

  // debugger;
}

function draw() {
  // blendMode(blendSelect.selected());
  // background('magenta');
  colorOne = color(colorPickOne.value());
  colorOne.setAlpha(colorAlphaOne.value());

  colorTwo = color(colorPickTwo.value());
  colorTwo.setAlpha(colorAlphaTwo.value());

  // fill(255);
  // rect(0,0,width,height);

  let rectSize = 100;

  //vertical bars
  fill(colorOne);
  for(let x = rectSize; x < width; x += rectSize * 2){
    rect(x, 0, rectSize, height);
  }
  //horizontal bars
  fill(colorTwo);
  for(let y = rectSize; y < height; y += rectSize * 2){
    rect(0, y, width, rectSize);
  }


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
