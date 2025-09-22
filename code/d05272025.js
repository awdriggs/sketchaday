let numCols, numRows;
let cellWidth, cellHeight;
let imageCells = [];

let graphic;

function setup() {
  createCanvas(800, 800);


  numCols = 10;
  numRows = 10;

  cellWidth = width/numCols;
  cellHeight = height/numRows;

  //create the graphic to split
  graphic = generateGraphics();

  //split the graphic into images
  // stroke("red")
  // strokeWeight(1);
  for(let i = 0; i < numRows; i++){
    let y = cellHeight * i;
    // line(0, y, width, y);
    for(let j = 0; j < numCols; j++){
      let x = cellWidth * j;
      // line(x, 0, x, height);
      imageCells.push(graphic.get(x, y, cellWidth, cellHeight));
    }
  }

  //shuffle the list
  imageCells = shuffle(imageCells);

  // noLoop();
}

function draw() {
  background(255);

  //draw the shuffled images
  for (let i = 0; i < imageCells.length; i++) {
    let x = (i % numCols) * cellWidth;
    let y = floor(i / numCols) * cellHeight;
    image(imageCells[i], x, y, cellWidth, cellHeight);
  }

  if(frameCount % 120 == 0){
    imageCells = shuffle(imageCells);
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

//hatch
function generateGraphics(){
  let pg = createGraphics(width, height);
  let hCount = 4;
  let hOffset = pg.width / hCount;

  //draw it!

  pg.background(255);

  pg.strokeWeight(30);
  pg.stroke(0);
  for(let i = -hCount; i < hCount; i++){
    let x = i * hOffset;

    pg.line(x, 0, width + x, height);
    pg.line(x, height, width + x, 0);
  }

  return pg;
}