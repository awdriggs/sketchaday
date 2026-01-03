
function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}



//thanks https://editor.p5js.org/xiao2202/sketches/vkHJQX4gy
var fibs = [1, 1];

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  initFibs()
  noFill();
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  for(let j = 0; j < 1000; j++){
    push()
    rotate(j * 1);
    for (i = 0; i < fibs.length; i++) {
      const fib = fibs[i];
      // rect(0, 0, fib, fib);
      arc(fib, 0, 2 * fib, 2 * fib, 90, 180);
      translate(fib, fib);
      rotate(-90);
    }
    pop();
  }
}

function addFib(){
  const fibLen = fibs.length;
  fibs.push(fibs[fibLen-1]+fibs[fibLen-2])
}

function initFibs(){
  for (let i =0; i < 100; i++){
    addFib();
  }
}

