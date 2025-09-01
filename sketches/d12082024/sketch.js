let base;
let flip = 1;
let numTris = 10;
let bgColor, fillColor;
function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);


  b = width/numTris; //make it exact
  h = b/2;
  noStroke();
}

function draw() {
  
  if(flip > 0){
    bgColor = 255;
    fillColor = 0;
  } else {
    bgColor = 0;
    fillColor = 255;
  } 
  

  background(bgColor);
  fill(fillColor)


  for(let c = numTris; c > 0; c--){
    let offset = (numTris - c) * b/2;

    let y = offset;
    // let y = 0;
    //horziontal
    for(let i = 0; i < c; i++){
      let x = b*i - b/2;

      if(i!=0){
        triangle(x + offset, y + h, x + b/2 + offset, y, x + b + offset, y+h);
        triangle(x + offset,height - y - h, x + b/2 + offset, height - y, x + b + offset, height - y-h);
      }

    }
    //vertical
    let x = offset;
    // let x = 0;
    for(let i = 0; i < c; i++){
      let y = b*i;
      triangle(x, y + offset, x + h, y + b/2 + offset, x, y + b + offset);
      triangle(width - x, y + offset, width - x - h, y + b/2 + offset,width - x, y + b + offset);
    }
  }

  if(frameCount % 100 == 0){
    flip *= -1;
    console.log("flip");
  } 

}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

