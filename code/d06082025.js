// let origin;
let worms = [];
let baseDirs = [];
let numWorms = 5;
let angle = 0.001;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  // origin = createVector(width/2, height/2); //center point
  // origin = createVector(0, 0); //center point

  for(let i = 0; i < numWorms; i++){
    let randomPoint = createVector(random(10, width-10), random(10, height-10));
    let worm = generateWormPath(randomPoint);

    worms.push(worm);
  }

  // fill(0, 255, 0);
  // noFill();

  fill(0)
  // strokeWeight(2);

}

function draw() {

  background(255);
  // fill("red")

  for(let worm of worms){
    updateWormPath(worm)

    // beginShape(); //starts the line
    for(let p of worm){
      // vertex(p.x, p.y);
      ellipse(p.x,p.y, 100, 100);
    }
    // endShape(OPEN);
  }

}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function generateWormPath(origin){
  let path = [];
  let wormLength = 20;

  let angle = random(0, TWO_PI);

  //direction from random angle
  let dir = p5.Vector.fromAngle(angle);

  //start at center

  for(let i = 0; i < wormLength; i++){
    path.push(origin.copy()); //put a bunch of verts at the same location
  }
  return path;
}

function updateWormPath(worm){
  for(let i = 0; i < worm.length; i++){
    let randomVect = p5.Vector.random2D();
    randomVect.mult(0.2);
    // debugger;
    let point = worm[i];

    point.add(randomVect);
  }
}