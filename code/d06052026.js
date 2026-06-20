let numSections = 3;
let sectionWidth, sectionHeight;
let barWidth;
let marginX, marginY;
let r, g, b;

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

  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
}

function draw() {
  background(255);

  //horiziontals


  //verticals
  for(let i = 0; i < numSections; i++){
    let y = i * sectionHeight + sectionHeight/2;
    fill(r, g, b, map(i, 0, numSections, 50, 255));
    rect(marginX, y - barHeight/2, width - marginX * 2, barHeight);
  }

  for(let i = 0; i < numSections; i++){
    let x = i * sectionWidth + sectionWidth/2;
    // line(x, 0, x, height);
    fill(r, g, b, map(i, 0, numSections, 50, 255));
    rect(x - barWidth/2, marginY, barWidth, height - marginY * 2);
  }

  if(frameCount % 60 == 0){
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);
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

