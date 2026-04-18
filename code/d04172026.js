let zs = [];
let numCols, numRows

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numCols = 20;
  numRows = 20;

  zs = makeShapes(numCols, numRows);

}

function draw() {
  background(255);


  for(let p of zs){
    p.draw();
  }

  if(frameCount % 60 == 0){
    zs = makeShapes(numCols, numRows);
  }
}



function makeShapes(cols, rows){
  let shapes = [];
  let margin = width/200;
  // let margin = 0;
  let xBins = (width - margin*2)/cols;
  let yBins = (height - margin*2)/rows;

  for(let j = 0; j < cols; j++){
    for(let i = 0; i < cols; i++){
      // let randomColor = color(random(255), random(255), random(255));
      let randomColor = 0;
      let insetX = random(xBins * 0.05, xBins * 0.15);
      let insetY = random(yBins * 0.05, yBins * 0.15);
      let x = i * xBins + insetX + margin;
      let y = j * yBins + insetY + margin;
      let w = xBins - 2 * insetX;
      let h = yBins - 2 * insetY;
      // let h = yBins - 2 * y; // mirror top margin at bottom → centered
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
    this.vertices = this.buildVertices(sx, sy, w, h);
    this.color = c;
  }

  buildVertices(sx, sy, w, h){
    let minW = w * 0.2;
    let minH = h * 0.2;

    let remW = w - 3 * minW;
    let x1 = random(remW);
    let x2 = random(remW);
    if (x1 > x2) [x1, x2] = [x2, x1];

    let a = x1 + minW;
    let b = (x2 - x1) + minW;
    let c = (remW - x2) + minW;

    let remH = h - 3 * minH;
    let y1 = random(remH);
    let y2 = random(remH);
    if (y1 > y2) [y1, y2] = [y2, y1];

    let e = y1 + minH;
    let f = (y2 - y1) + minH;
    let g = (remH - y2) + minH;

    let right  = sx + a + b + c;
    let bottom = sy + e + f + g;

    let type = floor(random(0, 4));

    if(type == 0){
      // Z-shape: top-left bump, middle column, bottom-right bump
      return [
        {x: sx,         y: sy},
        {x: sx+a+b,     y: sy},
        {x: sx+a+b,     y: sy+e+f},
        {x: right,      y: sy+e+f},
        {x: right,      y: bottom},
        {x: sx+a,       y: bottom},
        {x: sx+a,       y: sy+e},
        {x: sx,         y: sy+e},
      ];
    } else if(type == 1){
      // reverse-Z: bottom-left bump, middle column, top-right bump
      return [
        {x: sx+a,       y: sy},
        {x: right,      y: sy},
        {x: right,      y: sy+e},
        {x: sx+a+b,     y: sy+e},
        {x: sx+a+b,     y: bottom},
        {x: sx,         y: bottom},
        {x: sx,         y: sy+e+f},
        {x: sx+a,       y: sy+e+f},
      ];
    } else if(type == 2){
      // L-shape: bottom-left bump + middle column
      return [
        {x: sx+a,       y: sy},
        {x: sx+a+b,     y: sy},
        {x: sx+a+b,     y: bottom},
        {x: sx,         y: bottom},
        {x: sx,         y: sy+e+f},
        {x: sx+a,       y: sy+e+f},
      ];
    } else {
      // L-shape: middle column + top-right bump
      return [
        {x: sx+a,       y: sy},
        {x: right,      y: sy},
        {x: right,      y: sy+e},
        {x: sx+a+b,     y: sy+e},
        {x: sx+a+b,     y: bottom},
        {x: sx+a,       y: bottom},
      ];
    }
  }

  draw() {
    noFill();
    stroke(this.color);
    beginShape();
    for(let v of this.vertices){
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}

