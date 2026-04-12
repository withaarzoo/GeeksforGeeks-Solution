/**
 * @param {number[][]} mat
 * @return {boolean}
 */
class Solution {
  isToeplitz(mat) {
    let rows = mat.length;
    let cols = mat[0].length;

    // Start from second row and second column
    for (let i = 1; i < rows; i++) {
      for (let j = 1; j < cols; j++) {
        // Compare current element with top-left diagonal element
        if (mat[i][j] !== mat[i - 1][j - 1]) {
          return false;
        }
      }
    }

    return true;
  }
}
