let bars = [];

let nx, ny; //noise values
let slider;
let oldSliderValue;
let w; //bar width

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);


  slider = createSlider(1, width, 1);
  slider.position(10, 10);
  slider.size(300);

  w = width/slider.value();
  nx = 0;

  for(let i = 0; i < width; i++){
    ny = i/100;
    let c  = map(noise(nx,ny), 0, 1, 150, 255);
    bars.push(c); //add the current color to the bars
  }

  noStroke();
}

function draw() {
  background(220);

  if(oldSliderValue != slider.value()){
    //do somethign
    w = width/slider.value();

    // print(slider.value(), w);
  }

  for(let i = 0; i < slider.value(); i++){
    //update color
    ny = i/100;
    bars[i] = map(noise(nx,ny), 0, 1, 150, 255);
    // bars[i] = color(random(0, 255), 0, random(0, 255));
    //draw a bar for each slider value
    fill(bars[i]);
    rect(i * w, 0, w + 1, height); //plus one is a hack to make sure there is no space between the bars
  }

  oldSliderValue = slider.value();

  nx += 0.001; //update noise offsete
  // print(nx);
  // console.log(bars[0]);
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


