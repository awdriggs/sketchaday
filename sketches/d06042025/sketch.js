let originalImage;
let maskedImage;
let angle = 0;
let shiftCenter;

function setup() {
  createCanvas(800, 800);

  shiftCenter = createVector(width/2 - 100, height/2 - 100); // arbitrary center
  resetBg();

  // crop + mask a portion of the image centered at shiftCenter
  let cropSize = width/2;
  maskedImage = getMaskedSubimage(shiftCenter, cropSize, cropSize);
}

function draw() {
  background(255);

  // show full original image
  image(originalImage, 0, 0);

  // draw rotating cropped/masked section
  push();
  translate(shiftCenter.x, shiftCenter.y);
  rotate(angle);
  imageMode(CENTER);
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  rect(0, 0, maskedImage.width, maskedImage.height);
  image(maskedImage, 0, 0);
  pop();

  // draw reference dot
  // fill(0, 255, 0);
  // ellipse(shiftCenter.x, shiftCenter.y, 20, 20);


  if(frameCount%120 ==  0){
    angle += HALF_PI;
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 8);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function getMaskedSubimage(center, w, h) {
  let x = center.x - w / 2;
  let y = center.y - h / 2;

  let subImg = originalImage.get(x, y, w, h);

  let msk = createGraphics(w, h);
  msk.fill(255); // white = visible
  msk.noStroke();
  msk.rectMode(CENTER);
  msk.rect(w / 2, h / 2, w, h); // mask covers full cropped image

  subImg.mask(msk.get());
  return subImg;
}

function resetBg(){
  let bg = createGraphics(width, height);
  bg.background(255);

  bg.fill(0);
  bg.stroke(0);

  let numCols = 7;
  let numRows = 5;


  for(let i = 0; i < numRows; i++){
    let y = i * height/numRows;
    bg.fill("#FF7221");
    bg.rect(0, y, width, height / (numRows * 2));

  }

  for(let j = 0; j < numCols; j++){
    let x = j * width/numCols;

    bg.line(x, 0, x, height);
  }


  originalImage = bg.get();
}

