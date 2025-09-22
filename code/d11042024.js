let offset;
let margin = 0;
let rowHeight = 100;
let rows = [];

function setup(){
  createCanvas(windowWidth, windowHeight);

  // let containerWidth = 800;
  // let containerHeight = 800;

  let containerWidth = width;
  let containerHeight = height;

  let numRows = containerHeight/rowHeight;


  let numLines = 100;
  offset = containerWidth/numLines;

  for(let r = 0; r < numRows; r++){
    let lines = [];
    for(let i = 0; i < numLines; i++){
      lines.push({origin: i * offset + offset/2 + margin, direction: random() > 0.5 ? -1 : 1} );
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
    for(let l of row){
      l.x += l.speed * l.direction;
      // stroke("red");
      // line(l.origin, l.y, l.origin, l.y+rowHeight);
      stroke("black");

      line(l.x, l.y, l.x, l.y+rowHeight);

      // if(abs(l.origin - l.x) > offset/2){
      // }
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