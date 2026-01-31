let movers = [];

function setup() {
  createCanvas(800, 800);
  build();
  strokeCap(SQUARE);
}

function build() {
  // let numMovers = floor(random(3, 7));
  let numMovers = 20;
  movers = [];
  for (let i = 0; i < numMovers; i++) {
    let size = random(200, 400);
    let x = random(0, width - size);
    let y = random(0, height - size);
    movers.push(new DMover(x, y, size, size));
  }
}

function draw() {
  background(255);

  for (let m of movers) {
    m.drawStack();
  }

  if(frameCount % 30 == 0){
    for (let m of movers) {
      m.toggle();
    }
  }

  if(frameCount % 180 == 0){
    build();
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function mousePressed(){
  build();
}

class DMover {
  constructor(x, y, w, h, numSides){
    // Bounding box position and size
    this.bx = x;
    this.by = y;
    this.bw = w;
    this.bh = h;

    this.numSides = numSides || floor(random(3, 6)) * 2; // must be even for 90° turns to close
    if (this.numSides % 2 !== 0) this.numSides++;

    // Keep padAmount fixed like original for shape generation and stack offset
    this.padAmount = 50;
    // Small padding relative to bounding box
    this.padding = min(this.bw, this.bh) * 0.05;
    this.color = color(0);

    this.verts = [];
    this.stack = floor(random(3, 10));

    this.generateShape();

    // this.currentVertIndex = 0; //this will animate
    this.currentVertIndex = this.verts.length; //this will animate
    this.toggler = random() > 0.5 ? true : false;
    this.stroke = color(random(0,255), random(0, 255), random(0, 255));
  }
   
  toggle() {
    this.toggler = !this.toggler;
  }

  generateShape() {
    let maxAttempts = 100;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      this.verts = [];

      let halfSides = this.numSides / 2;

      let hDisplacements = this.generateBalancedDisplacements(halfSides);
      let vDisplacements = this.generateBalancedDisplacements(halfSides);

      hDisplacements = shuffle(hDisplacements);
      vDisplacements = shuffle(vDisplacements);

      // Build vertices starting at origin (we'll translate later)
      let x = 0;
      let y = 0;
      this.verts.push(createVector(x, y));

      for (let i = 0; i < halfSides; i++) {
        x += hDisplacements[i];
        this.verts.push(createVector(x, y));

        y += vDisplacements[i];
        this.verts.push(createVector(x, y));
      }

      this.verts.pop();

      if (this.hasSelfIntersection()) {
        continue;
      }

      this.fitToCanvas();
      return;
    }

    // Fallback: simple rectangle (accounting for stack offset)
    let fallbackOffset = this.padAmount;
    this.verts = [
      createVector(this.bx + this.padding, this.by + this.padding),
      createVector(this.bx + this.bw - this.padding - fallbackOffset, this.by + this.padding),
      createVector(this.bx + this.bw - this.padding - fallbackOffset, this.by + this.bh - this.padding - fallbackOffset),
      createVector(this.bx + this.padding, this.by + this.bh - this.padding - fallbackOffset)
    ];
  }

  fitToCanvas() {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (let v of this.verts) {
      minX = min(minX, v.x);
      maxX = max(maxX, v.x);
      minY = min(minY, v.y);
      maxY = max(maxY, v.y);
    }

    let shapeW = maxX - minX;
    let shapeH = maxY - minY;

    let maxOffset = this.padAmount;
    // Simpler calculation - just account for padding and offset
    let availW = this.bw - this.padding * 2 - maxOffset;
    let availH = this.bh - this.padding * 2 - maxOffset;

    // Scale to fit
    let scale = min(availW / shapeW, availH / shapeH);
    if (scale < 0.1) scale = 0.1;

    for (let v of this.verts) {
      v.x = (v.x - minX) * scale + this.bx + this.padding;
      v.y = (v.y - minY) * scale + this.by + this.padding;
    }

    // Center in bounding box
    let newMinX = Infinity, newMaxX = -Infinity;
    let newMinY = Infinity, newMaxY = -Infinity;
    for (let v of this.verts) {
      newMinX = min(newMinX, v.x);
      newMaxX = max(newMaxX, v.x);
      newMinY = min(newMinY, v.y);
      newMaxY = max(newMaxY, v.y);
    }

    // Center the stack visually within bounding box
    let stackWidth = (newMaxX - newMinX) + maxOffset;
    let stackHeight = (newMaxY - newMinY) + maxOffset;
    let offsetX = (this.bx + (this.bw - stackWidth) / 2) - newMinX;
    let offsetY = (this.by + (this.bh - stackHeight) / 2) - newMinY;

    for (let v of this.verts) {
      v.x += offsetX;
      v.y += offsetY;
    }

    // Ensure all stack copies stay within bounding box margins
    let finalMinX = Infinity, finalMaxX = -Infinity;
    let finalMinY = Infinity, finalMaxY = -Infinity;
    for (let v of this.verts) {
      finalMinX = Math.min(finalMinX, v.x);
      finalMaxX = Math.max(finalMaxX, v.x);
      finalMinY = Math.min(finalMinY, v.y);
      finalMaxY = Math.max(finalMaxY, v.y);
    }

    let shiftX = 0, shiftY = 0;

    // First check right/bottom (last shape with maxOffset)
    if (finalMaxX + maxOffset > this.bx + this.bw - this.padding) {
      shiftX = (this.bx + this.bw - this.padding) - (finalMaxX + maxOffset);
    }
    if (finalMaxY + maxOffset > this.by + this.bh - this.padding) {
      shiftY = (this.by + this.bh - this.padding) - (finalMaxY + maxOffset);
    }

    // Then check left/top (first shape) - this takes priority
    if (finalMinX + shiftX < this.bx + this.padding) {
      shiftX = (this.bx + this.padding) - finalMinX;
    }
    if (finalMinY + shiftY < this.by + this.padding) {
      shiftY = (this.by + this.padding) - finalMinY;
    }

    for (let v of this.verts) {
      v.x += shiftX;
      v.y += shiftY;
    }
  }

  hasSelfIntersection() {
    let n = this.verts.length;

    for (let i = 0; i < n; i++) {
      let a1 = this.verts[i];
      let a2 = this.verts[(i + 1) % n];

      for (let j = i + 2; j < n; j++) {
        if (i === 0 && j === n - 1) continue;

        let b1 = this.verts[j];
        let b2 = this.verts[(j + 1) % n];

        if (this.segmentsIntersect(a1, a2, b1, b2)) {
          return true;
        }
      }
    }
    return false;
  }

  segmentsIntersect(a1, a2, b1, b2) {
    let aVertical = a1.x === a2.x;
    let bVertical = b1.x === b2.x;

    if (aVertical === bVertical) {
      if (aVertical) {
        if (a1.x !== b1.x) return false;
        let aMin = min(a1.y, a2.y), aMax = max(a1.y, a2.y);
        let bMin = min(b1.y, b2.y), bMax = max(b1.y, b2.y);
        return aMin < bMax && bMin < aMax;
      } else {
        if (a1.y !== b1.y) return false;
        let aMin = min(a1.x, a2.x), aMax = max(a1.x, a2.x);
        let bMin = min(b1.x, b2.x), bMax = max(b1.x, b2.x);
        return aMin < bMax && bMin < aMax;
      }
    }

    let vert = aVertical ? {v1: a1, v2: a2} : {v1: b1, v2: b2};
    let horz = aVertical ? {v1: b1, v2: b2} : {v1: a1, v2: a2};

    let vx = vert.v1.x;
    let vMinY = min(vert.v1.y, vert.v2.y);
    let vMaxY = max(vert.v1.y, vert.v2.y);

    let hy = horz.v1.y;
    let hMinX = min(horz.v1.x, horz.v2.x);
    let hMaxX = max(horz.v1.x, horz.v2.x);

    return vx > hMinX && vx < hMaxX && hy > vMinY && hy < vMaxY;
  }

  generateBalancedDisplacements(count) {
    let displacements = [];
    let sum = 0;

    for (let i = 0; i < count - 1; i++) {
      let d = floor(random(1, 6)) * this.padAmount * (random() > 0.5 ? 1 : -1);
      displacements.push(d);
      sum += d;
    }

    // Last displacement balances the sum to 0
    // If it would be 0, nudge it
    let last = -sum;
    if (last === 0) {
      last = this.padAmount * (random() > 0.5 ? 1 : -1);
      // Adjust a random earlier displacement to compensate
      let idx = floor(random(displacements.length));
      displacements[idx] -= last;
    }
    displacements.push(last);

    return displacements;
  }

  move(){
    // Total segments = verts.length (loop segments) + 1 (closing segment)
    let totalSegments = this.verts.length + 1;
    if (this.currentVertIndex < totalSegments) {
      this.currentVertIndex++;
    }
  }

  drawStack(){

    let stroke1 = this.toggler ? 1 : 4;
    let stroke2 = this.toggler ? 4 : 1;

    stroke(this.stroke);

    for(let j = 0; j < this.stack; j++){

      let offset = this.padAmount/this.stack * j;
      for(let i = 0; i < this.verts.length - 1; i++){
        let lv = this.verts[i];
        let v = this.verts[i + 1];

        if(lv.x == v.x){
          strokeWeight(stroke1);
        } else {
          strokeWeight(stroke2);
        }
        line(lv.x + offset, lv.y + offset, v.x + offset, v.y + offset);
      }

      let first = this.verts[0];
      let last = this.verts[this.verts.length - 1];
      if (first.x == last.x) {
        strokeWeight(stroke1);
      } else {
        strokeWeight(stroke2);
      }
      line(last.x + offset, last.y + offset, first.x + offset, first.y + offset);
    }
  }
}
