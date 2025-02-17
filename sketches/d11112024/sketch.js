// let x1, y1, x2, y2, x3, y3, x4, y4;
// x1, first anchor point
// y1, first anchor point
// x2, x-coordinate of the first control point.
// y2, y-coordinate of the first control point.
// x3, x-coordinate of the second control point.
// y3, y-coordinate of the second control point.
// x4, x-coordinate of the anchor point.
// y4, y-coordinate of the anchor point.

// wave
let waveHeight;

let bumps, spread;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bumps = 10;
  spread = width/bumps;
  noStroke();
 
}

function draw() {
  background(255);
    
  let verticalOffset = spread/4
  let verticalRepeat = height/verticalOffset;

  for(let h = 0; h < verticalRepeat; h++){
    fill(map(h, 0, verticalRepeat, 255, 0));
    beginShape();

    let y = h * verticalOffset - verticalOffset;
    vertex(0, y)

    for(let i = 0; i < bumps; i+=2){
      bezierVertex(i * spread + spread, spread + y, i * spread + spread, spread * -1 + y, spread * i + spread * 2, y);
    }
    vertex(width, y + spread/2 + 50);
    vertex(0, y + spread/2 + 50);

    endShape();
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
