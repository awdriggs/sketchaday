function pack(width, height, numAgents = 4, numCols = 100, numRows = 100) {
  let grid = [];
  let emptyCells = [];
  let agents = [];
  let cellSize = width / numCols;

  // Internal Cell class
  class Cell {
    constructor(x, y, s) {
      this.x = x;
      this.y = y;
      this.size = s;
      this.fill = 255;
    }
  }

  // Internal Rectangle class
  class Rectangle {
    constructor(id) {
      this.color = id;
      this.init();
    }

    init() {
      let randomIndex = Math.floor(Math.random() * emptyCells.length);
      let cell = emptyCells[randomIndex];
      this.startX = cell[1];
      this.startY = cell[0];

      this.vLoc = cell[0];
      this.hLoc = cell[1];
      this.w = 1;
      this.h = 1;

      this.growX = true;
      this.growY = true;
      this.growXNeg = true;
      this.growYNeg = true;

      grid[this.vLoc][this.hLoc].fill = this.color;
    }

    grow() {
      // grow +x
      if (this.growX && this.hLoc + 1 < numCols) {
        let nextX = this.hLoc + 1;
        let addCol = true;
        let cellsToFlip = [];

        for (let i = 0; i < this.h; i++) {
          let cell = grid[this.startY + i][nextX];
          if (cell.fill == 255) {
            cellsToFlip.push(cell);
          } else {
            addCol = false;
            break;
          }
        }

        if (addCol) {
          this.hLoc++;
          this.w++;
          for (let c of cellsToFlip) {
            c.fill = this.color;
          }
        } else {
          this.growX = false;
        }
      }

      // grow +y
      if (this.growY && this.vLoc + 1 < numRows) {
        let nextY = this.vLoc + 1;
        let addRow = true;
        let cellsToFlip = [];

        for (let i = 0; i < this.w; i++) {
          let cell = grid[nextY][this.startX + i];
          if (cell.fill == 255) {
            cellsToFlip.push(cell);
          } else {
            addRow = false;
            break;
          }
        }

        if (addRow) {
          this.vLoc++;
          this.h++;
          for (let c of cellsToFlip) {
            c.fill = this.color;
          }
        } else {
          this.growY = false;
        }
      }

      // grow -x
      if (this.growXNeg && this.startX - 1 >= 0) {
        let nextX = this.startX - 1;
        let addCol = true;
        let cellsToFlip = [];

        for (let i = 0; i < this.h; i++) {
          let cell = grid[this.startY + i][nextX];
          if (cell.fill == 255) {
            cellsToFlip.push(cell);
          } else {
            addCol = false;
            break;
          }
        }

        if (addCol) {
          this.startX--;
          this.w++;
          for (let c of cellsToFlip) {
            c.fill = this.color;
          }
        } else {
          this.growXNeg = false;
        }
      }

      // grow -y
      if (this.growYNeg && this.startY - 1 >= 0) {
        let nextY = this.startY - 1;
        let addRow = true;
        let cellsToFlip = [];

        for (let i = 0; i < this.w; i++) {
          let cell = grid[nextY][this.startX + i];
          if (cell.fill == 255) {
            cellsToFlip.push(cell);
          } else {
            addRow = false;
            break;
          }
        }

        if (addRow) {
          this.startY--;
          this.h++;
          for (let c of cellsToFlip) {
            c.fill = this.color;
          }
        } else {
          this.growYNeg = false;
        }
      }
    }
  }

  // Build the grid
  for (let i = 0; i < numRows; i++) {
    let aRow = [];
    let y = i * cellSize;
    for (let j = 0; j < numCols; j++) {
      let x = j * cellSize;
      aRow.push(new Cell(x, y, cellSize));
      emptyCells.push([i, j]);
    }
    grid.push(aRow);
  }

  // Create agents
  for (let i = 0; i < numAgents; i++) {
    agents.push(new Rectangle(i + 1));
  }

  // Grow loop
  let growing = true;
  let lastNumEmpty;

  while (growing) {
    emptyCells = [];

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].fill == 255) {
          emptyCells.push([i, j]);
        }
      }
    }

    for (let a of agents) {
      if (a.growX || a.growY || a.growXNeg || a.growYNeg) {
        a.grow();
      }
    }

    if (lastNumEmpty == emptyCells.length) {
      growing = false;
    } else {
      lastNumEmpty = emptyCells.length;
    }
  }

  // Return bounding boxes
  let boundingBoxes = [];
  for (let a of agents) {
    boundingBoxes.push({
      x: a.startX * cellSize,
      y: a.startY * cellSize,
      w: a.w * cellSize,
      h: a.h * cellSize
    });
  }

  return boundingBoxes;
}
