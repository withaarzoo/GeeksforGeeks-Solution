class Solution {
  findCoverage(mat) {
    // Get matrix dimensions so I can traverse it cleanly.
    const n = mat.length;
    const m = mat[0].length;

    // colTotal[j] stores the total number of 1s in column j.
    const colTotal = new Array(m).fill(0);

    // First pass: count 1s in every column.
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        colTotal[j] += mat[i][j];
      }
    }

    // colPrefix[j] stores how many 1s I have already seen above the current row in column j.
    const colPrefix = new Array(m).fill(0);

    let ans = 0;

    // Second pass: compute coverage for each zero cell.
    for (let i = 0; i < n; i++) {
      // rowTotal stores total 1s in the current row.
      let rowTotal = 0;
      for (let j = 0; j < m; j++) {
        rowTotal += mat[i][j];
      }

      // leftOnes stores how many 1s are already on the left of the current cell.
      let leftOnes = 0;

      for (let j = 0; j < m; j++) {
        if (mat[i][j] === 0) {
          let coverage = 0;

          // Check left side.
          if (leftOnes > 0) coverage++;

          // Check right side.
          if (rowTotal - leftOnes > 0) coverage++;

          // Check upper side.
          if (colPrefix[j] > 0) coverage++;

          // Check lower side.
          if (colTotal[j] - colPrefix[j] > 0) coverage++;

          ans += coverage;
        } else {
          // A 1 helps future cells on the right side.
          leftOnes++;
        }
      }

      // Update column prefixes after the row is fully processed.
      // I do this here so the current row does not affect the "up" check.
      for (let j = 0; j < m; j++) {
        if (mat[i][j] === 1) {
          colPrefix[j]++;
        }
      }
    }

    return ans;
  }
}
