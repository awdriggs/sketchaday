let row = [];
let numCols = 20;
let rectSize;

function setup() {
  createCanvas(800, 800);

  rectSize = width / (numCols - 1);

  for(let i = 0; i < numCols; i++){
    if(i == 0){ //first
      row.push([{x: 0, dir: 0, o: 0}, {x: 0, dir: 0, o: 0}]);
    } else if(i == numCols - 1) { //last
      row.push([{x: width, dir: 0, o: width}, {x:width, dir: 0, o: width}]);
    } else { //middle cols
      // let offset1 = random(-rectSize/2, rectSize/2);
      // let offset2 = random(-rectSize/2, rectSize/2);
      let dir1 = random() > 0.5 ? 1 : -1;
      let dir2 = random() > 0.5 ? 1 : -1;
      row.push([{x: i * rectSize, dir: dir1, o: i * rectSize}, {x: i * rectSize, dir: dir2, o: i * rectSize}]);
    }
  }
}

function draw() {
  background(255);


  for(let l of row){
    for(let p of l){
      p.x += p.dir * random(0.5);
      //bounds check
      if(abs(p.o - p.x) > rectSize/2){
        p.dir *= -1;
      }
    }

    line(l[0].x, 0, l[1].x, height);
  }
}

function randomColor(){
  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);

  return color(r, g, b);
}




