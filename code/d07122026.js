const DEVICE_ID = 'bkny01';
let days = 1;
let LIMIT = days * 1400;

let colorReading = {};
let socketConnected = false;
let bars = [];

let offset = 100; //bleed noise readings

// WebSocket for live readings
const protocol = 'wss:';
const url = 'micro-api.awdokku.site/';
const ws = new WebSocket(`${protocol}//${url}`);

ws.onopen = () => {
  console.log('Connected to server');
  ws.send(JSON.stringify({ type: 'join', stream: 'shades-of-blue' }));
};

ws.onclose = () => {
  console.log('Disconnected from server');
  socketConnected = false;
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    if (data.type === 'joined') {
      socketConnected = true;
    }

    if (data.type === 'data' && data.values && data.device_id === DEVICE_ID) {
      colorReading = data.values;
      bars.unshift({ values: data.values });
      if (bars.length > LIMIT * 2) bars.pop(); // keep max 2 days
      redraw();
    }
  } catch (error) {
    console.error('Error parsing message:', error);
  }
};

// p5 sketch
function preload() {
  loadJSON(
    `https://micro-api.awdokku.site/api/readings/shades-of-blue?limit=${LIMIT}&device=${DEVICE_ID}`,
    (data) => { bars = data.readings; }
  );
}

function setup() {
  createCanvas(800, 800);
  noLoop();
  noFill();
  noStroke();
}

function draw() {
  background(255);

  if (bars.length === 0) return;

  let cx = width / 2;
  let cy = height / 2;
  let r = width * 0.45;
  let sw = (TWO_PI * r) / LIMIT;

  strokeWeight(sw);

  for (let i = offset; i < bars.length - offset; i++) {
    let angle = map(i, offset, LIMIT - offset, -HALF_PI, -HALF_PI + TWO_PI);
    let rgb = bars[i].values;
    // stroke(rgb.r, rgb.g, rgb.b);
    fill(rgb.r, rgb.g, rgb.b);
     
     
    arc(cx, cy, r * 2, r * 2, angle, angle + 0.02);
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}
