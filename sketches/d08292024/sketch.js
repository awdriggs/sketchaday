let w1, w2;
let count = 1;
let bar1, bar2;

function setup() {
  // createCanvas(300, 300);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  w1 = 1;
  w2 = 1;
  bar1 = createBar(w1, 220);
  bar2 = createBar(w2, 220);
}

function draw() {
  background(255);
  fill(220);


  // rect(width/2 - w/2, 0, w, height);

  bar1 = createBar(w1, 220);
  bar2 = createBar(w2, 220);
  // bar2 = createBar(width/2 - slider.value(), 220);

  image(bar1, width * 0.33 - bar1.width/2, 0);
  image(bar2, width * 0.66 - bar2.width/2, 0);

  w1 = floor(abs(sin(count)) * width/2)+1;
  w2 = floor(abs(cos(count)) * width/2)+1;
  // console.log(count, w);
  count += 0.02;
   
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
    // console.log(x, d, a);

    for (let y = 0; y < bar.height; y += 1) {
      // bar.set(x, y, color(barC.levels[0], barC.levels[1], barC.levels[2], 255 * a));
      bar.set(x, y, color(barC, 255 * a));
    }
  }

  // Update the image's pixel values.
  bar.updatePixels();

  // slider.value() = slider.value() + 1;
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

