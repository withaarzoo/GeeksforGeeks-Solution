/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
class Solution {
  // Function to calculate determinant
  determinant(mat, size) {
    let det = 1;

    for (let i = 0; i < size; i++) {
      let pivot = i;

      // Find non-zero pivot row
      for (let j = i; j < size; j++) {
        if (Math.abs(mat[j][i]) > 1e-9) {
          pivot = j;
          break;
        }
      }

      // Determinant becomes 0
      if (Math.abs(mat[pivot][i]) < 1e-9) return 0;

      // Swap rows
      if (pivot !== i) {
        [mat[pivot], mat[i]] = [mat[i], mat[pivot]];
        det *= -1;
      }

      // Multiply diagonal value
      det *= mat[i][i];

      // Eliminate rows below
      for (let j = i + 1; j < size; j++) {
        let factor = mat[j][i] / mat[i][i];

        for (let k = i; k < size; k++) {
          mat[j][k] -= factor * mat[i][k];
        }
      }
    }

    return Math.round(det);
  }

  countSpanTree(n, edges) {
    // Single node graph
    if (n === 1) return 1;

    // Create Laplacian matrix
    let lap = Array.from({ length: n }, () => Array(n).fill(0));

    // Build matrix
    for (let [u, v] of edges) {
      lap[u][u]++;
      lap[v][v]++;

      lap[u][v]--;
      lap[v][u]--;
    }

    // Create cofactor matrix
    let cof = Array.from({ length: n - 1 }, () => Array(n - 1).fill(0));

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        cof[i][j] = lap[i][j];
      }
    }

    // Determinant gives answer
    return this.determinant(cof, n - 1);
  }
}
