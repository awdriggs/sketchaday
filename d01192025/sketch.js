//bridget riley inspo
let widths = [];
let xs = []
let sqSize;


function setup() {
  createCanvas(800, 800);

  let numColumns = 27;
  let step = PI / numColumns;

  for(let i = 0; i < PI; i+=step){
    // let w = map(sin(i), -1, 1, 100, 10);
    let w = cos(i) + 0.2;
    widths.push(w);
  }

  console.log(widths.length);
  console.log(widths);
  sqSize = width/numColumns;
  // for(let i = 0; i < 100
}

function draw() {
  background(255);

  let alt = 0;
  for(let h = 0; h < widths.length; h++){
    let x = 0;
    for(let i = 0; i < widths.length; i++){
      let w = abs(widths[i] * sqSize);

      if(alt % 2 == 0){
        fill(0);
      } else {
        fill(255);
      }
      rect(x, h * sqSize, w, sqSize);
      x += w;
      alt++;
    }
  }

  // print(x);

}

