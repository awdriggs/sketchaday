let colors = [];
let numColors;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  colors = setColors();
  noLoop();
  noStroke();

}

function draw() {
  background(255);

  //build a gradient from the colors array
  if(colors.length == 1){
    fill(colors[0]);
    rect(0,0, width, height);
  } else if(colors.length == 2){

    for(let i = 0; i < width; i++){
      fill(lerpColor(colors[0], colors[1], i/width));
      rect(i, 0, 1, height);
    }
  } else if(colors.length == 3){

    for(let i = 0; i < width/2; i++){
      fill(lerpColor(colors[0], colors[1], i/(width/2)));
      rect(i, 0, 1, height);
    }
    
    for(let i = width/2; i < width; i++){
      fill(lerpColor(colors[1], colors[0], (i-width/2)/(width/2)));
      rect(i, 0, 1, height);
    }
  }
}

function setColors(){
  let colors = [];
  let allColors = [color("#D3A7A0"), color("#104E4E"), color("#8E6E3D"), color("#D36E22"), color("#0B0811"), color("#E4C09D"), color("#E4C09D"), color("#8F5D25")];

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
  colors = setColors();
  redraw();
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}


