//repeating chevron pattern
let numCols, colWidth, numRows, rowHeight, bandHeight;

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
}

function draw() {
  background(255);

  for(let i = 0; i < numRows; i++){
    let y = i * rowHeight;
    for(let j = 0; j < numCols; j++){
      let x = j * colWidth;
      
      let dir = j % 2 == 0 ? "forward" : "back";

      drawBand(x, y, dir);
    }


  }

  ////draw one half chevron
  ////even row

  //let x = width/2 - colWidth/2; //top left corner
  //let y = height/2 - rowHeight/2;
  //let bandHeight = rowHeight/2;
  //fill(255, 0, 0);
  //rect(x,y, colWidth, rowHeight);

  //fill(0);
  //beginShape();
  //vertex(x, y + rowHeight);
  //// point(x,y);
  //vertex(x, y + rowHeight - bandHeight);
  //// point(x, y - rowHeight/4);
  //vertex(x + colWidth, y);
  //vertex(x + colWidth, y + bandHeight);
  //endShape(CLOSE);

  //fill(255);
  //////odd row
  //beginShape();
  //vertex(x,y);
  //vertex(x, y + bandHeight);
  //vertex(x + colWidth, y + rowHeight);
  //vertex(x + colWidth, y + rowHeight - bandHeight);
  //endShape(CLOSE);


  // ellipse(width/2, height/2, 20, 20)
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