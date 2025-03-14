let bar, blurred;
let slider, oldSliderValue;

function setup() {
  // createCanvas(600, 600);
  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);

  slider = createSlider(10, 100, 45);
  slider.position(10, 10);
  slider.size(100);

  //create the image
  bar = createImage(height, height); //make it square

  // Load the image's pixels into memory.
  bar.loadPixels();

  // debugger;

  for (let x = bar.width * 0.25; x < bar.width * 0.75; x += 1) {
    for (let y = bar.height * 0.25; y < bar.height * 0.75; y += 1) {
      bar.set(x, y, color(220,220,220,255));
    }
  }

  // Update the image's pixel values.
  bar.updatePixels();
  blurred = bar.get();
  // blurred.filter(BLUR, slider.value());
  blurred.filter(BLUR, slider.value());
  // blurred.filter(INVERT);

  image(blurred, width/2, height/2); //display the image once
}

function draw() {
  // background(255);


  if(oldSliderValue != slider.value()){
    background(255);
    blurred = bar.get(); //copy the original image
    blurred.filter(BLUR, slider.value());
    image(blurred, width/2, height/2);
  }


  // image(bar, 0, 0);
  // image(blurred, width/2, height/2);
  // ellipse(width/2, height/2, 20, 20);

  // filter(BLUR, 3);
  oldSliderValue = slider.value();
}

function createBar(){

}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3,7)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}


