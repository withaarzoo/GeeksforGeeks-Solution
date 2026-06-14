class Solution {
  exitPoint(mat) {
    const n = mat.length;
    const m = mat[0].length;

    // Current position
    let row = 0,
      col = 0;

    // 0=Right, 1=Down, 2=Left, 3=Up
    let dir = 0;

    // Continue while inside matrix
    while (row >= 0 && row < n && col >= 0 && col < m) {
      // If current cell contains 1
      if (mat[row][col] === 1) {
        // Turn right
        dir = (dir + 1) % 4;

        // Convert 1 into 0
        mat[row][col] = 0;
      }

      // Move according to direction
      if (dir === 0) col++;
      else if (dir === 1) row++;
      else if (dir === 2) col--;
      else row--;
    }

    // Move back to last valid position
    if (dir === 0) col--;
    else if (dir === 1) row--;
    else if (dir === 2) col++;
    else row++;

    return [row, col];
  }
}
