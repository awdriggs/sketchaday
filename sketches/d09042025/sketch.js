//repeating chevron pattern
let numCols, colWidth, numRows, rowHeight, bandHeight;
let colors = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols = 20;
  colWidth = width/numCols;
  numRows = 10;
  rowHeight = height/numRows
  bandHeight = rowHeight/2;

  // strokeWeight(4);
  noStroke();
  fill(0);


  for(let i = 0; i < numRows; i++){
    colors.push(randomColor());
  }
}

function draw() {
  background(255);

  for(let i = 0; i < numRows; i++){
    let y = i * rowHeight;
    for(let j = 0; j < numCols; j++){
      let x = j * colWidth;

      let dir = j % 2 == 0 ? "forward" : "back";
      fill(colors[i]);
      drawBand(x, y, dir);
    }


  }

  if(frameCount % 20 == 0){
    rotateColors();
  }

}

function drawBand(x, y, type){
  beginShape();

  if(type == "forward"){
    vertex(x, y + rowHeight);
    vertex(x, y + rowHeight - bandHeight);
    vertex(x + colWidth, y);
    vertex(x + colWidth, y + bandHeight);
  } else if(type == "back"){
    vertex(x,y);
    vertex(x, y + bandHeight);
    vertex(x + colWidth, y + rowHeight);
    vertex(x + colWidth, y + rowHeight - bandHeight);
  }

  endShape(CLOSE);
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

function rotateColors(){
  let first = colors.shift();
  // colors.push(first);
  colors.push(randomColor());

}

function randomColor(){

  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);

  return color(r,g,b);
}

