let offset;
let margin = 0;
let rowHeight = 100;
let rows = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  // createCanvas(300, 300);

  // let containerWidth = 800;
  // let containerHeight = 800;

  let containerWidth = width;
  let containerHeight = height;

  let numRows = floor(containerHeight/rowHeight);
  rowHeight = height/numRows; //make it exact!

  let numLines = 100;
  offset = containerWidth/numLines;

  for(let r = 0; r < numRows; r++){
    let lines = [];
    for(let i = 0; i < numLines; i++){
      lines.push({origin: i * offset + offset/2 + margin, direction: random() > 0.5 ? -1 : 1, color: randomColor()} );
      lines[i].x = lines[i].origin + random(-offset/2, offset/2);
      lines[i].y = r * rowHeight;
      lines[i].speed = random(0.5, 1.5);
    }
    rows.push(lines);
  }
  // print(lines);
}

function draw(){
  background(255);
  //rect(0 + margin, 0, 800, 100);
  for(let row of rows){
    for(let i = 0; i < row.length; i++){
      l = row[i];
      l.x += l.speed * l.direction;
      // stroke("red");
      // line(l.origin, l.y, l.origin, l.y+rowHeight);
      // strokeWeight(3);
      // stroke(l.color);
      noStroke();
      fill(l.color);

      // line(l.x, l.y, l.x, l.y+rowHeight);
      if(i != row.length -1){
        let next = row[i+1];
        let width = next.x - l.x;
        rect(l.x, l.y, width + 10, rowHeight);
      } else { //last item

      }

      if(l.x > l.origin + offset/2){
        l.x = l.origin + offset/2;
        l.speed = random(0.5, 1.5);
        l.direction*=-1;
      } else if(l.x < l.origin - offset/2){
        l.x = l.origin - offset/2;
        l.speed = random(0.5, 1.5);
        l.direction*=-1;
      }
    }
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function randomColor(){
  return color(random(255), random(255), random(255));
}
