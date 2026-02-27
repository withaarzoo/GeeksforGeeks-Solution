class Solution {
  countSquare(mat, x) {
    let n = mat.length;
    let m = mat[0].length;

    let prefix = Array.from({ length: n }, () => Array(m).fill(0));

    // Build prefix matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        prefix[i][j] = mat[i][j];

        if (i > 0) prefix[i][j] += prefix[i - 1][j];
        if (j > 0) prefix[i][j] += prefix[i][j - 1];
        if (i > 0 && j > 0) prefix[i][j] -= prefix[i - 1][j - 1];
      }
    }

    let count = 0;

    // Try all squares
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        for (let size = 1; i + size - 1 < n && j + size - 1 < m; size++) {
          let r = i + size - 1;
          let c = j + size - 1;

          let sum = prefix[r][c];

          if (i > 0) sum -= prefix[i - 1][c];
          if (j > 0) sum -= prefix[r][j - 1];
          if (i > 0 && j > 0) sum += prefix[i - 1][j - 1];

          if (sum === x) count++;
        }
      }
    }

    return count;
  }
}
