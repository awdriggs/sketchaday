let bar;

function setup() {
  createCanvas(400, 400);

  bar = createImage(30, height);

  // Load the image's pixels into memory.
  bar.loadPixels();

  // Set all the image's pixels to black.
  for (let x = 10; x < 20; x += 1) {
    for (let y = 0; y < bar.height; y += 1) {
      bar.set(x, y, color(map(x, 10, 20, 0, 255),0,y));
    }
  }

  // Update the image's pixel values.
  bar.updatePixels();
  bar.filter(BLUR, 5);
}

function draw() {
  background(220);
  // Apply the BLUR filter.
  // Display the image.
  image(bar, width/2 - bar.width/2, 0);
  // filter(BLUR, 3);
}
