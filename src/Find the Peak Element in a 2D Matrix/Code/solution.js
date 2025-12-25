class Solution {
  findPeakGrid(mat) {
    let n = mat.length;
    let m = mat[0].length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        let curr = mat[i][j];

        let up = i > 0 ? mat[i - 1][j] : -Infinity;
        let down = i < n - 1 ? mat[i + 1][j] : -Infinity;
        let left = j > 0 ? mat[i][j - 1] : -Infinity;
        let right = j < m - 1 ? mat[i][j + 1] : -Infinity;

        if (curr >= up && curr >= down && curr >= left && curr >= right) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  }
}
