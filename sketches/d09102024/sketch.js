//playing with colorblending modes
//taking more inspiration from Kitty van der mijll dekker 
//https://www.stedelijk.nl/nl/collectie/30278-kitty-van-der-mijll-dekker-staal-monster

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
    
  noStroke();
  blendMode(BLEND); 
}

function draw() {
  background('magenta');

  
  fill('lightgreen');
  fill(144, 238, 144, 200)
  for(let x = 0, w=80; x < width; x += 100, w/=1.5){
    rect(x, 0, w, height);
  }

  let s = width/5; 
  fill(255, 0, 0, 127);
  rect(0, mouseY - s/2, width, s); 
  fill(0, 0, 255, 127);
  rect(mouseX - s/2, 0, s, height); 
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

