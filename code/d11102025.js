let numBoxes = 8;
let boxes = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  // colors = setColors();

  boxes = generateBoxes();

  noLoop();
  noStroke();
}

function draw() {
  background(255);

  for(let b of boxes){
    b.draw()
  }

}

function setColors(){
  let colors = [];
  // let allColors = [color("#D3A7A0"), color("#104E4E"), color("#8E6E3D"), color("#D36E22"), color("#0B0811"), color("#E4C09D"), color("#E4C09D"), color("#8F5D25")];
  let allColors = [color(255), color(0)];

  allColors = shuffle(allColors);

  //build the colors array from the options.
  //choose one, two, or three colors
  numColors = floor(random(1, 4));
  // numColors = 3

  if(numColors == 1){
    colors.push(allColors[0]);
  } else if(numColors == 2){
    colors.push(allColors[0]);
    colors.push(allColors[1]);
  } else {
    colors.push(allColors[0]);
    colors.push(allColors[1]);
    colors.push(allColors[0]);
  }

  console.log(colors);
  return colors;

}

function mousePressed(){
  boxes = generateBoxes();
  
  redraw();
}

function generateBoxes(){
  let boxes = [];
  let margin = width/10;

  for(let i = 0; i < numBoxes; i++){
    let w = random(width/4, width/2);
    let h = random(height/4, height/2);

    let x = random(margin, width - w - margin); //keep in in bounds
    let y = random(margin, height - h - margin);

    boxes.push(new gradientBox(x, y, w, h));
  }

  return boxes
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

class gradientBox {
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colors = setColors(); //call the global set colors function
    this.opacity = floor(random(128, 255))
  }
  // fill(red(c), green(c), blue(c), 128); // alpha 0-255

  draw(){
    //build a gradient from the colors array
    if(this.colors.length == 1){
      fill(this.colors[0]);
      rect(this.x, this.y, this.w, this.h);
    } else if(this.colors.length == 2){
      for(let i = 0; i < this.w; i++){
        fill(lerpColor(this.colors[0], this.colors[1], i/this.w));
        rect(this.x + i, this.y, 1.5, this.h);
      }
    } else if(this.colors.length == 3){
      for(let i = 0; i < this.w/2; i++){
        fill(lerpColor(this.colors[0], this.colors[1], i/(this.w/2)));
        rect(this.x + i, this.y, 1.5, this.h);
      }

      for(let i = this.w/2; i < this.w; i++){
        fill(lerpColor(this.colors[1], this.colors[0], (i-this.w/2)/(this.w/2)));
        rect(this.x + i, this.y, 1.5, this.h);
      }
    }
  }
}

