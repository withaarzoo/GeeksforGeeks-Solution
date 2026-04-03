/**
 * @param {number[][]} mat
 * @returns {number[]}
 */

class Solution {
  diagView(mat) {
    let n = mat.length;
    let ans = [];

    // Total anti-diagonals = 2*n - 1
    for (let d = 0; d <= 2 * n - 2; d++) {
      // Valid row range for current diagonal
      let rowStart = Math.max(0, d - n + 1);
      let rowEnd = Math.min(n - 1, d);

      // Traverse current diagonal
      for (let i = rowStart; i <= rowEnd; i++) {
        let j = d - i;
        ans.push(mat[i][j]);
      }
    }

    return ans;
  }
}
