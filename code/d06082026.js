let numSections = 10;
let sectionWidth, sectionHeight;
let barWidth;
let marginX, marginY;
let r1, g1, b1, r2, g2, b2;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  sectionWidth = width/numSections
  barWidth = sectionWidth/2;
  sectionHeight = height/numSections
  barHeight = sectionHeight/2;

  // marginX = width * 0.1;
  // marginY = height * 0.1;
  marginX = 10;
  marginY = 10;

  noStroke();

  r1 = random(0, 255);
  g1 = random(0, 255);
  b1 = random(0, 255);
  r2 = random(0, 255);
  g2 = random(0, 255);
  b2 = random(0, 255);
}

function draw() {
  background(255);

  //horiziontals


  //verticals
  for(let i = 0; i < numSections; i++){
    let y = i * sectionHeight + sectionHeight/2;
    // let alpha = sin(i
    let angle = map(i, 0, numSections - 1, 0, PI);   // 0 → π across the row
    let alpha = map(sin(angle), 0, 1, 50, 200);
    fill(r1, g1, b1, alpha);
    rect(marginX, y - barHeight/2, width - marginX * 2, barHeight);

    let x = i * sectionWidth + sectionWidth/2;
    // line(x, 0, x, height);
    alpha = map(cos(angle), 1, 0, 50, 200, true);
    fill(r2, g2, b2, alpha);
    rect(x - barWidth/2, marginY, barWidth, height - marginY * 2);
  }

  if(frameCount % 60 == 0){
    r1 = random(0, 255);
    g1 = random(0, 255);
    b1 = random(0, 255);
    r2 = random(0, 255);
    g2 = random(0, 255);
    b2 = random(0, 255);
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

