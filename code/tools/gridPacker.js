function gridPack(canvasWidth, canvasHeight, numCols = 10, numRows = 10) {
  let cellW = canvasWidth / numCols;
  let cellH = canvasHeight / numRows;

  // build grid
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push({ filled: false });
    }
    grid.push(row);
  }

  function markFilled(x, y, w, h) {
    for (let i = y; i < y + h; i++) {
      for (let j = x; j < x + w; j++) {
        grid[i][j].filled = true;
      }
    }
  }

  function makeRect(x, y) {
    let w = floor(random(1, min(numCols / 2, numCols - x) + 1));
    let h = floor(random(1, min(numRows / 2, numRows - y) + 1));

    let valid = true;
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (grid[y + i][x + j].filled) {
          valid = false;
          break;
        }
      }
    }

    if (!valid) {
      w = 1;
      h = 1;
    }

    markFilled(x, y, w, h);
    return { x: x * cellW, y: y * cellH, w: w * cellW, h: h * cellH };
  }

  let rects = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (!grid[i][j].filled) {
        rects.push(makeRect(j, i));
      }
    }
  }

  return rects;
}
