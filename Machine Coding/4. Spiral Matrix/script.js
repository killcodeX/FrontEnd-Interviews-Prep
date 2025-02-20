const grid = document.querySelector(".grid");

let matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

// Build the grid
function gridBuilding() {
  for (let i = 0; i < matrix.length; i++) {
    const newRow = document.createElement("div");
    newRow.className = "row";
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("cell-row", i);
      cell.setAttribute("cell-col", j);
      cell.innerHTML = matrix[i][j];
      newRow.append(cell);
    }
    grid.append(newRow);
  }
}

gridBuilding();

// Function to add a class to a specific cell
function addClass(row, col) {
  const rows = Array.from(grid.children);
  if (rows[row]) {
    const cells = Array.from(rows[row].children);
    if (cells[col]) {
      cells[col].classList.add("highlight"); // Add the highlight class
    }
  }
}

// Function to remove the highlight class after a delay
function removeClass(row, col) {
  const rows = Array.from(grid.children);
  if (rows[row]) {
    const cells = Array.from(rows[row].children);
    if (cells[col]) {
      setTimeout(() => {
        cells[col].classList.remove("highlight"); // Remove the highlight class
      }, 500); // Delay before removing the highlight
    }
  }
}

// Delay function using Promises
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Generate the spiral with animation
async function generateSpiral() {
  let row = 0;
  let rowEnd = matrix.length - 1;

  let col = 0;
  let colEnd = matrix[0].length - 1;

  while (row <= rowEnd && col <= colEnd) {
    // Move right
    for (let i = col; i <= colEnd; i++) {
      addClass(row, i);
      await delay(300); // Delay between each step
    }
    row++;

    // Move down
    for (let i = row; i <= rowEnd; i++) {
      addClass(i, colEnd);
      await delay(300); // Delay between each step
    }
    colEnd--;

    // Move left
    if (row <= rowEnd) {
      for (let i = colEnd; i >= col; i--) {
        addClass(rowEnd, i);
        await delay(300); // Delay between each step
      }
      rowEnd--;
    }

    // Move up
    if (col <= colEnd) {
      for (let i = rowEnd; i >= row; i--) {
        addClass(i, col);
        await delay(300); // Delay between each step
      }
      col++;
    }
  }
}

// Start the spiral animation
generateSpiral();
