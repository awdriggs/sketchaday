
let rects = []
let colors = ["#393e41","#3f88c5","#44bba4"];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  rects = gridPack(width, height, 15, 15);

  // rect.map(
  // Pass a function to map
  rects = rects.map((c) => {
    c.color = colors[floor(random(colors.length))]
    c.active = random() > 0.5 ? true : false
    return c;
  });
}

function draw() {
  background("#001B2E");

  for(let r of rects){
    if(r.active){
      fill(r.color);
      stroke(r.color);
      rect(r.x, r.y, r.w, r.h);
    }
  }

  if(frameCount % 60 == 0){
    rects = rects.map((c) => {
      c.active = random() > 0.5 ? true : false
      return c
    });
  }

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

