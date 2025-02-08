//gen day 6 2025, landcape with only primitive shapes
//let make a wave using ovals?
let g = 0;
let n = 0.0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  noStroke();

}

function draw() {
  background(255);
  

  for(let j = 0; j < 20; j++){
    for(let i = 0; i < 20; i++){
      let r = (map(j, 0, 20, 0, 255));
      let b = (map(i, 0, 20, 0, 255));
      fill(r, g, b);
      // let x = j * 100 + noise(i/100, j/100, n) * 100 - 100;
      let x = j * 100 + cos(n) * i * 2 - 100;
      let y = 50 * i + noise(i/100, j/100, n) * 100 - 100;
      if(i % 2 == 0){
        x+=50;
      }
      ellipse(x, y, 100, 100);
    }
  n+=0.0005;
  }

  // g += 0.5;

  // if(g > 255){
  //   // dir *= -1
  // // }
  //   g = 0;
  // }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
