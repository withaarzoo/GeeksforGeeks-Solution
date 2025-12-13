/**
 * @param {number[][]} mat
 */
class Solution {
  swapDiagonal(mat) {
    const n = mat.length;

    // Loop through each row
    for (let i = 0; i < n; i++) {
      // Swap diagonal elements
      let temp = mat[i][i];
      mat[i][i] = mat[i][n - 1 - i];
      mat[i][n - 1 - i] = temp;
    }
  }
}
