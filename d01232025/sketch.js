let distances = [];

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight, WEBGL);
  // lights(); 
  let startVect = createVector(0,0,0);
  for(let i = 0; i < 100; i++){
    // let distVector = createVector();
    let v = p5.Vector.random3D();
    // v.normalize();
    // v.mult(2);
    startVect.add(v);
    
    distances.push(p5.Vector.copy(startVect));
  }
  
    print(distances);
  // noStroke();
}

function draw() {
  background(50);
  orbitControl();

  // Turn on the lights.
  ambientLight(128, 128, 128);
  directionalLight(128, 128, 128, 0, 0, -1);

  for(d of distances){
    push();
    // translate(d.mult(5));
    translate(p5.Vector.mult(d, 50));
    box();
    pop();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
