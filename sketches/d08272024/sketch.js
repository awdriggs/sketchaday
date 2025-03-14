let bar, slider;
let oldSliderValue;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  // Create a slider and place it at the top of the canvas.
  slider = createSlider(1, width/2, width/2 * 0.75);
  slider.position(10, 10);
  slider.size(100);
  createBar();
}

function draw() {
  background(220);

  if(oldSliderValue != slider.value()){
    createBar();
  }
  // Apply the BLUR filter.
  // Display the image.
  image(bar, width/2 - bar.width/2, 0);
  // filter(BLUR, 3);
  oldSliderValue = slider.value();
}

function createBar(){
  bar = createImage(slider.value(), height);

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

      bar.set(x, y, color(255,255,255,255 * a));
    }
  }

  // Update the image's pixel values.
  bar.updatePixels();
  // bar.filter(BLUR, 5);
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

