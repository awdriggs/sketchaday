let cutSections = [];
let numRows, numCols;
let rowHeight, colHeight
let yOffset;


function setup() {
  createCanvas(800, 800);
  numRows = 10;
  numCols = 20;

  colWidth = width/numCols;
  rowHeight = height/numRows;

  yOffset = height/19;

  generateCuts();

  // createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(255);
  for(let l of cutSections){
    l.draw();
  }

  for(let i = 0; i < numRows; i++){
    line(0, i * rowHeight, width, i * rowHeight);

  }

  if(frameCount % 30 == 0 && random() > 0.5){
    generateCuts();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function generateCuts(){
  cutSections = [];
  let index = 0;

  let minDisplacement = colWidth * 0.25;
  let maxDisplacement = colWidth * 0.75;

  while(index < numCols){
    if(random() > 0.75){// cutSections.push(new CutSection(i * colWidth, random(0, height), random(minDisplacement, maxDisplacement)));
      let startY = random(yOffset, height - yOffset); //chose the start y location, keep some margin
      let cutLength = yOffset * floor(random(4, 8));
      let count = floor(random(2, 4));
      let displaceBy = random(minDisplacement, maxDisplacement);

      for(let i = 0; i < count; i++){
        cutSections.push(new CutSection(index * colWidth + i * colWidth, startY + yOffset * i, displaceBy, cutLength));
      }

      index += count;
    } else {
      cutSections.push(new CutSection(index * colWidth, random(0, height), 0, 0));
      index++;
    }
  }

}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class CutSection {
  constructor(x, cutStart, displacement, cutLength){
    this.x = x;
    this.cutStart = cutStart
    this.cutEnd = this.cutStart + cutLength
    this.displacement = displacement
  }

  draw(){
    line(this.x, 0, this.x, this.cutStart);
    line(this.x + this.displacement, this.cutStart,  this.x + this.displacement, this.cutEnd);

    if(this.cutEnd < height){
      line(this.x, this.cutEnd, this.x, height)
    }
  }

}
