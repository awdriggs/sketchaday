//worbley noise 
let featurePoints = [];
let maxDist;

function setup() {
  createCanvas(800, 800);
  maxDist = sqrt(width * width + height * height);
  print(maxDist); 
  // createCanvas(windowWidth, windowHeight);
  featurePoints = setPoints(50);
  pixelDensity(1);
  noLoop();
}

function draw() {
  background(255);
  loadPixels();
  for(let y = 0; y < height; y++){
    for(let x = 0; x < width; x++){
      let minDist = Infinity

      for(let p of featurePoints){
        let d = dist(x, y, p.x, p.y);
        if(d < minDist){
          minDist = d;
        }
      }

      brightness = map(minDist, 0, 400, 255, 0);
      let index = (y * width + x) * 4
      pixels[index] = brightness 
      pixels[index + 1] = brightness 
      pixels[index + 2] = brightness 
      pixels[index + 3] = 255  // alpha
    }
  }

  updatePixels();
  print(frameCount);
}

function setPoints(numPoints){
let pointsList = [];
 for(let i = 0; i < numPoints; i++){
    let x = random(0, width);
    let y = random(0, height);

    pointsList.push(createVector(x, y));
 }
  return pointsList;

}

function mousePressed(){
  featurePoints = setPoints(50);
  redraw();
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

