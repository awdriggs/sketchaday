let numCols = 20;
let numRows = 20;
let rectSize;
let rowHeight;
let rows = [];

function setup() {
  createCanvas(800, 800);

  rectSize = width / (numCols - 1);
  rowHeight = height/numRows;

  for(let h = 0; h < numRows; h++){
    let row = [];
    for(let i = 0; i < numCols; i++){
      if(i == 0){ //first
        row.push([{x: 0, dir: 0, o: 0}, {x: 0, dir: 0, o: 0}, randomColor()]);
      } else if(i == numCols - 1) { //last
        row.push([{x: width, dir: 0, o: width}, {x:width, dir: 0, o: width}, randomColor()]);
      } else { //middle cols
        // let offset1 = random(-rectSize/2, rectSize/2);
        // let offset2 = random(-rectSize/2, rectSize/2);
        let dir1 = random() > 0.5 ? 1 : -1;
        let dir2 = random() > 0.5 ? 1 : -1;
        row.push([{x: i * rectSize, dir: dir1, o: i * rectSize}, {x: i * rectSize, dir: dir2, o: i * rectSize}, randomColor()]);
      }
    }

// debugger;
    rows.push(row);
  }
}

function draw() {
  background(255);

  for(let i = 0; i < rows.length; i++){
    let row = rows[i];
    let y = rowHeight * i;
    for(let l of row){
      for(let p of l){
        p.x += p.dir * random(0.5);
        //bounds check

        if (p.x < p.o - rectSize / 2) {
          p.x = p.o - rectSize / 2; // Reset to the left edge
          p.dir *= -1;
        } else if (p.x > p.o + rectSize / 2) {
          p.x = p.o + rectSize / 2; // Reset to the right edge
          p.dir *= -1;
        }
      }

      // noFill();
      // stroke(0, 255, 0);
      // rect(l[0].o - rectSize/2, y, rectSize, y + rowHeight);
      // stroke(255, 0, 0);
      // line(l[0].o, y, l[1].o, y + rowHeight);
      // stroke(0);
      // line(l[0].x, y, l[1].x, y + rowHeight);
    }

    //after row is updated, loop over again to draw, otherwise there will be gaps and overlaps
    for(let j = 0; j < row.length - 1; j++){
      let leftLine = row[j];
      let rightLine = row[j + 1];

      //poly shit
      fill(leftLine[2]); //color is in the third array position for each line 

      beginShape();
      vertex(leftLine[0].x, y);
      vertex(rightLine[0].x, y);
      vertex(rightLine[1].x, y + rowHeight);
      vertex(leftLine[1].x, y + rowHeight);
      vertex(leftLine[0].x, y);
      endShape();

    }
  }
}

function randomColor(){
  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);

  return color(r, g, b);
}
