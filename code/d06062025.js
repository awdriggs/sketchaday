let origin;
let worms = [];
let baseDirs = [];
let numWorms = 50;
let angle = 0.001;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  origin = createVector(width/2, height/2); //center point
  // origin = createVector(0, 0); //center point

  //test data worm drawing
  // for(let i = 0; i < 10; i++){
  //   let x = random(100, width - 100);
  //   let y = random(100, height - 100);

  //   worm.push(createVector(x, y));
  // }
  for(let i = 0; i < numWorms; i++){

    let worm = generateWormPath();

    worms.push(worm);
  }

  // fill(0, 255, 0);
  noFill();
  strokeWeight(10);

}

function draw() {

  background(255);
  // fill("red")
  
  for(let worm of worms){
    updateWormPath(worm)    

    beginShape(); //starts the line
    for(let p of worm){
      vertex(p.x, p.y);
    }
    endShape(OPEN);
  }



  // angle += 0.001;

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


function generateWormPath(){
  let path = [];
  let wormLength = 20;

  let angle = random(0, TWO_PI);

  //direction from random angle
  let dir = p5.Vector.fromAngle(angle);

  //start at center

  for(let i = 0; i < wormLength; i++){
    
    if(i == 0){
      path.push(origin); //start at the middle of the canvas
    } else {
      let lastPoint = path[i-1];
      let newDir = dir.copy(); //copies the vecotr
      newDir.rotate(random(-PI/10, PI/10)) //rotates the vector by a random small amoutn
      newDir.setMag(width * 0.025);
      let newPoint = p5.Vector.add(lastPoint, newDir);
      path.push(newPoint);
    }
    //move some distance in direction
    //add a point to the path
    //move direction by a random amount

  }
  return path;
}

function updateWormPath(worm){
  for(let i = 0; i < worm.length; i++){
    let randomVect = p5.Vector.random2D();
    randomVect.mult(0.09);
    // debugger; 
    let point = worm[i];


    
    point.add(randomVect);
    // point.setMag(10);

    // point.rotate(random(-PI/10, PI/10)) //rotates the vector by a random small amoutn
  }
}