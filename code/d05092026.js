//shades of blue tester
//a single device
let bars = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  for(let i = 0; i < width; i++){
    let r = random(80, 110);
    let g = random(60, 80)
    let b = 125;

    // let a = map(i, 200, 600, 0, 255)

    bars.push(color(r, g, b));
  }
  noStroke();
}

function draw() {
  background(0);

  for(let i = 0; i< bars.length; i++){
    let c = bars[i].levels

    let spread = map(sin(frameCount/100), -1, 1, 1, 3);
    let d = abs(i - width/2) / (width/2); // 0 at center, 1 at edges
    let a = map(pow(d, spread), 0, 1, 0, 255);

    fill(c[0], c[1], c[2], a);
    rect(i, 0, 2, height);
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

