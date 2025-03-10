let pattern = "";
let dirs = ["l", "r", "u", "d"]
function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

}

function draw() {
  let input = document.querySelector("#pattern");
  background(255);

  let pattern = "";

  for(let i = 0; i < input.value.length; i++){
    let letter = input.value[i];
    if(dirs.includes(letter)){
      pattern += letter;
    }
  }

  text(pattern, 50, 50);
  
  input.value = pattern;

}

// function keyPressed(){
//   if(key == "g"){
//     saveGif('thumb', floor(random(3, 7)));
//   } else if(key == "p"){
//     saveCanvas('thumb', "jpg");
//   }
// }

