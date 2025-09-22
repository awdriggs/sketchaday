let cells = [];
let pattern = [];
let numCols, numRows, cellSize;
let drawingPattern = true;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols = 20;
  numRows = 20;

  cellSize = width/numCols;

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      cells.push(new Cell(j * cellSize, i * cellSize, cellSize, "green", [j, i], 0));
    }
  }


}

function draw() {
  background(255);

  if(drawingPattern){
    for(let c of cells){
      c.draw();
    }

  } else {
    animatedPattern();
  }

}

function mousePressed(){

  for(let i = 0; i < cells.length; i++){
    let c = cells[i];
    c.clicked(mouseX, mouseY);

  }

}

function mouseReleased(){
  if(drawingPattern){

  let patternText = "";

  for(let i = 0; i < cells.length; i++){
    let c = cells[i];
    patternText += `${c.state}, `;

    if((i+1) % numCols == 0){
      patternText += "</br>";
    }

  }

    document.querySelector("#pattern").innerHTML = patternText;
  }
}



function animatedPattern(){

  //cycle through the pattern and draw it to the canvas
  //no stroke
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Cell {
  constructor(x, y, s, c, id, state){
    this.x = x;
    this.y = y;
    this.size = s;
    this.fill = c;
    this.id = id;
    this.state = state
  }

  draw(){
    if(this.state){
      fill(this.fill);
    } else {
      fill(255);
    }
    rect(this.x, this.y, this.size);
  }

  clicked(mx, my){
    // let clicked = false;

    if(mx > this.x && mx < this.x + this.size && my > this.y && my < this.y + this.size){
      print(this.id);
      if(this.state == 1){
        this.state = 0;
      } else {
        this.state = 1;
      }
    }

  }

  draggedOver(mx, my){
    if(dragging == true){
      
    }
  }
}