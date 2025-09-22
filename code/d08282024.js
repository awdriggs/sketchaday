let slider, oldSliderValue;
let bar1, bar2;
// let zips = [];

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  // Create a slider and place it at the top of the canvas.
  slider = createSlider(1, width/2 - 1, width/4);
  slider.position(10, 10);
  slider.size(100);

  //bar 1
    bar1 = createBar(slider.value(), 220);
    bar2 = createBar(width/2 - slider.value(), 220);
}

function draw() {
  background(255);

  if(oldSliderValue != slider.value()){
    // bar1 = createBar(slider.value(), color(255, 255, 255));
    // bar2 = createBar(width/2 - slider.value(), color(0, 255, 255));
    bar1 = createBar(slider.value(), 220);
    bar2 = createBar(width/2 - slider.value(), 220);
  }
  // Apply the BLUR filter.
  // Display the image.
  image(bar1, width * 0.25  - bar1.width/2, 0);
  image(bar2, width * 0.75  - bar2.width/2, 0);
  // filter(BLUR, 3);
  oldSliderValue = slider.value();
}

function createBar(barW, barC){
  let bar = createImage(barW, height);

  // Load the image's pixels into memory.
  bar.loadPixels();

  // Set all the image's pixels to black.
  let w = bar.width - 1;
  let m = w/2;

  for (let x = 0; x <= w; x += 1) {
    let d = abs(x - m);
    // let a = map(d, 0, m, 1, 0);
    let a = norm(d, m, 0);
    console.log(x, d, a);

    for (let y = 0; y < bar.height; y += 1) {
      // bar.set(x, y, color(barC.levels[0], barC.levels[1], barC.levels[2], 255 * a));
      bar.set(x, y, color(barC, 255 * a));
    }
  }

  // Update the image's pixel values.
  bar.updatePixels();
  // bar.filter(BLUR, 5);

  return bar;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}