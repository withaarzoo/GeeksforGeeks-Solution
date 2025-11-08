/**
 * @param {number[][]} mat
 * @param {number} k
 * @returns {number}
 */
class Solution {
  numberOfPath(mat, k) {
    const n = mat.length,
      m = mat[0].length;
    // dp[i][j][s]
    const dp = Array.from({ length: n }, () =>
      Array.from({ length: m }, () => new Array(k + 1).fill(0))
    );

    if (mat[0][0] <= k) dp[0][0][mat[0][0]] = 1;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const val = mat[i][j];
        if (i === 0 && j === 0) continue;
        for (let s = val; s <= k; s++) {
          let ways = 0;
          if (i > 0) ways += dp[i - 1][j][s - val]; // from top
          if (j > 0) ways += dp[i][j - 1][s - val]; // from left
          dp[i][j][s] = ways;
        }
      }
    }
    return dp[n - 1][m - 1][k];
  }
}
