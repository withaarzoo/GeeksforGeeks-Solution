/**
 * @param {number[][]} mat
 * @return {number}
 */

class Solution {
  zigzagSequence(mat) {
    const n = mat.length;

    let dp = new Array(n);

    for (let j = 0; j < n; j++) {
      dp[j] = mat[0][j];
    }

    for (let i = 1; i < n; i++) {
      let max1 = -1;
      let max2 = -1;
      let max1Col = -1;

      for (let j = 0; j < n; j++) {
        if (dp[j] > max1) {
          max2 = max1;
          max1 = dp[j];
          max1Col = j;
        } else if (dp[j] > max2) {
          max2 = dp[j];
        }
      }

      const next = new Array(n);

      for (let j = 0; j < n; j++) {
        let bestPrevious;

        if (j !== max1Col) {
          bestPrevious = max1;
        } else {
          bestPrevious = max2;
        }

        next[j] = mat[i][j] + bestPrevious;
      }

      dp = next;
    }

    return Math.max(...dp);
  }
}
