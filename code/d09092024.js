// after Kitty van der Mijll Dekker
// https://www.stedelijk.nl/nl/collectie/16410-kitty-van-der-mijll-dekker-glasdoek-progressieve-randen-in-geel-en-groen-%28dessinnr.-400%29#content

console.log("hello");

function setup() {
  // createCanvas(300, 300);
  createCanvas(windowWidth, windowHeight);

  
}

function draw() {
  background(255);
  
  for(let i = 1; i < width/3; i+= i * 0.5){
    stroke('gold');
    line(i, 0, i, height);
    // line(0, i, width, i);
    stroke('green');
    line(width - i, 0, width - i, height);
  }

  for(let i = 1; i < height/3; i += i * 0.5){
    stroke('gold');
    line(0, i, width, i);
    // line(i, 0, i, height);
    stroke('green');
    line(0, height - i, width, height - i);
  }
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