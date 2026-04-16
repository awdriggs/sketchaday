//keeping a mistake

let zs = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  zs = makeShapes(10, 10);

}

function draw() {
  background(255);


  for(let p of zs){
    p.draw();
  }

  if(frameCount % 60 == 0){
    zs = makeShapes(10, 10);
  }
}



function makeShapes(cols, rows){
  let shapes = [];
  // let numZs = 4;
  let margin = width/40;
  let xBins = (width - margin*2)/cols;
  let yBins = (height - margin*2)/rows;

  for(let j = 0; j < cols; j++){
    for(let i = 0; i < cols; i++){
      let randomColor = color(random(255), random(255), random(255));
      // let randomColor = random() < 0.5 ? "yellow" : "orange"
      let x = random(i * xBins, i * xBins + xBins * 0.2) + margin;
      let y = random(j * yBins, j * yBins + yBins * 0.2) + margin;
      let w = (i + 1) * xBins + margin - x;
      // let h = (j + 1) * yBins + margin - y;
      let h = height - 2 * y; // mirror top margin at bottom → centered
      // debugger;
      shapes.push(new Poly(x, y, w, h, randomColor));
    }
  }

  return shapes
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

class Poly {
  constructor(sx, sy, w, h, c){
    this.squares = this.buildSquares(sx, sy, w, h);
    this.color = c;
  }

  buildSquares(sx, sy, w, h){
    let squares = [];

    let minW = w * 0.2;
    let minH = h * 0.2;

    //x offsets — cut the remainder, then add minW back to each piece
    let remW = w - 3 * minW;
    let x1 = random(remW);
    let x2 = random(remW);
    if (x1 > x2) [x1, x2] = [x2, x1];

    //widths — each guaranteed >= minW
    let a = x1 + minW;
    let b = (x2 - x1) + minW;
    let c = (remW - x2) + minW;

    //y offsets — same trick
    let remH = h - 3 * minH;
    let y1 = random(remH);
    let y2 = random(remH);
    if (y1 > y2) [y1, y2] = [y2, y1];

    //heights — each guaranteed >= minH
    let e = y1 + minH;
    let f = (y2 - y1) + minH;
    let g = (remH - y2) + minH;

    squares.push({x: sx, y: sy, w: a, h:e})
    squares.push({x: sx + a, y: sy, w: b, h: h}) //h = e + f + g
    squares.push({x: sx + a + b, y: sy + e + f, w: c, h: g})

    return squares;
  }

  draw() {
    fill(this.color);
    stroke(this.color);
    for(let s of this.squares){
      rect(s.x, s.y, s.w, s.h)
    }
  }
}

