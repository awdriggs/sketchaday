//shades of blue tester
//a single device, circular
let bars = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  addDay();

  noStroke();
  // strokeWeight(10);
}

function draw() {
  background(255);

  let dia = width * 0.8;

  fill(0);
  ellipse(width/2, height/2, dia, dia)

  let sliceSize = TWO_PI/bars.length;
  // print(sliceSize);
  for(let i = 0; i < bars.length; i++){
    // print(i);
    for(let j = bars[i].length - 1; j > 0; j--){
      // console.log("day", j);
      // debugger;
      let c = bars[i][j].levels
      // console.log("color", c);

      fill(c[0], c[1], c[2], c[3]);
      stroke(c[0], c[1], c[2], c[3]);
      // let length = dia/
      let length = dia/bars[i].length * (j+1);

      arc(width/2, height/2, length, length, i * sliceSize, i * sliceSize + sliceSize); //1 degree width + rotation
    }
  }

  addDay();
}

function addDay(){
  if(bars.length == 0 || bars[bars.length-1].length == 360){ //first push if no bars are present
    bars.push([]);
  }
  

  let day = bars[bars.length-1];
  console.log("day", bars[bars.length-1].length);

  let spread = map(cos(map(bars.length, 0, 365, 0, TWO_PI)), 1, -1, 2.5, 0.8);

  let r = random(80, 110);
  let g = random(60, 80)
  let b = 125;

  let d = day.length / 360;
  let t = pow(d, spread);
  let finalR = lerp(0, r, t);
  let finalG = lerp(0, g, t);
  let finalB = lerp(0, b, t);

  day.push(color(finalR, finalG, finalB));
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

