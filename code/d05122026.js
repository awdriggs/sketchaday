//shades of blue tester
//a single device, circular
let bars = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);


  for(let i = 0; i < 360; i++){
    let r = random(80, 110);
    let g = random(60, 80)
    let b = 125;

    // let a = map(i, 200, 600, 0, 255)

    bars.push(color(r, g, b));
  }
  noStroke();
  // strokeWeight(10);
}

function draw() {
  background(255);


  let dia = width * 0.8;
  fill(0);
  ellipse(width/2, height/2, dia, dia)
  for(let i = 0; i< bars.length; i++){

    let c = bars[i].levels

    let spread = map(sin(frameCount/100), -1, 1, 0.5, 3);
    let d = abs(i - 360/2) / (360/2); // 0 at center, 1 at edges
    let a = map(pow(d, spread), 0, 1, 0, 255);


    fill(c[0], c[1], c[2], a);
    arc(width/2, height/2, dia, dia, radians(i) - PI/2, radians(i) + 0.01745329252 - PI/2); //1 degree width + rotation
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

