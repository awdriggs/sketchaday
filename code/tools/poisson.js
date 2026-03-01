//bridson's algorithm for Poisson disc sampling...
function poisson(w, h, r, t = "points", _k = 30){
  let grid = [];
  let width = w;
  let height = h;
  let radius = r;
  let k = _k;
  let type = t;
  let points = poissonDiskSampling(radius, k);

  // radius: minimum distance between any two points
  // k: how many candidate points to try before giving up on an active point
  function poissonDiskSampling(radius, k){
    let N = 2; // number of dimensions (2D)
    let points = []; // final list of all accepted points
    let active = []; // "frontier" — points that can still spawn new neighbors

    // The grid is a spatial lookup structure.
    // Each cell is sized so its diagonal equals 'radius', which guarantees
    // each cell holds at most one point and any two points within 'radius'
    // of each other must be in adjacent cells.
    let cellSize = radius / sqrt(N); // radius / sqrt(2)
    let numCols = ceil(width / cellSize) + 1;
    let numRows = ceil(height / cellSize) + 1;

    // Initialize empty 2D grid (rows = y, cols = x)
    grid = [];
    for(let i = 0; i < numRows; i++){
      let row = [];
      for(let j = 0; j < numCols; j++){
        row.push(null);
      }
      grid.push(row);
    }

    // Step 1: seed the algorithm with a random starting point
    let p0 = createVector(random(width), random(height));
    insertPoint(grid, p0, cellSize);
    points.push(p0);
    active.push(p0);

    // Step 2: keep going as long as there are active points to expand from
    while(active.length > 0) {
      // Pick a random point from the active list to try spawning from
      let random_index = floor(random(active.length));
      let p = active[random_index];

      // Try up to k times to find a valid neighbor of p
      let found = false;
      for(let tries = 0; tries < k; tries++) {
        // Generate a random point in the annulus between radius and 2*radius from p.
        // Too close (< radius) would violate the min distance. Too far (> 2*radius)
        // and it's unlikely to connect the point cloud smoothly.
        let theta = random(TWO_PI);
        let newRadius = random(radius, 2 * radius);
        let newPointX = p.x + newRadius * cos(theta);
        let newPointY = p.y + newRadius * sin(theta);
        let newPoint = createVector(newPointX, newPointY);

        // Accept the candidate if it's on screen and far enough from all existing points
        if(isPointValid(grid, cellSize, numCols, numRows, newPoint, radius)){
          points.push(newPoint);
          insertPoint(grid, newPoint, cellSize);
          active.push(newPoint); // new point becomes active too — it can spawn its own neighbors
          found = true;
          break;
        }
      }

      // If all k attempts failed, this point is "exhausted" — remove it from active
      if(!found) {
        active.splice(random_index, 1);
      }
    }

    return points;
  }

  // Store a point in its grid cell so we can look it up quickly later
  function insertPoint(grid, point, cellSize){
    let xIndex = floor(point.x / cellSize);
    let yIndex = floor(point.y / cellSize);
    grid[yIndex][xIndex] = point; // grid is [row][col] = [y][x]
  }

  function isPointValid(grid, cellSize, gridWidth, gridHeight, p, radius){
    // Reject if out of bounds
    if(p.x < 0 || p.x >= width || p.y < 0 || p.y >= height){
      return false;
    }

    let xIndex = floor(p.x / cellSize);
    let yIndex = floor(p.y / cellSize);

    // Check the 5x5 neighborhood of cells around p.
    // With cellSize = radius/sqrt(2), a point within distance radius can be
    // up to 2 cells away (ceil(radius/cellSize) = ceil(sqrt(2)) = 2).
    let i0 = max(yIndex - 2, 0);
    let i1 = min(yIndex + 2, gridHeight - 1);
    let j0 = max(xIndex - 2, 0);
    let j1 = min(xIndex + 2, gridWidth - 1);

    for(let i = i0; i <= i1; i++){
      for(let j = j0; j <= j1; j++){
        if(grid[i][j] != null){
          let testPoint = grid[i][j];
          if(dist(testPoint.x, testPoint.y, p.x, p.y) < radius){
            return false; // too close to an existing point
          }
        }
      }
    }

    return true;
  }

  //return based on type requested in function call
  if(type == "points"){
    return points;
  } else {
    return grid;
  }
}
