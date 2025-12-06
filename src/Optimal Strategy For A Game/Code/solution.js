// User function Template for javascript
/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
  maximumAmount(arr) {
    const n = arr.length;
    // dp[i][j] -> max amount current player can collect from arr[i..j]
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    for (let gap = 0; gap < n; gap++) {
      for (let i = 0; i + gap < n; i++) {
        const j = i + gap;

        if (i === j) {
          // Only one coin
          dp[i][j] = arr[i];
        } else if (j === i + 1) {
          // Two coins
          dp[i][j] = Math.max(arr[i], arr[j]);
        } else {
          const x = i + 2 <= j ? dp[i + 2][j] : 0;
          const y = i + 1 <= j - 1 ? dp[i + 1][j - 1] : 0;
          const z = i <= j - 2 ? dp[i][j - 2] : 0;

          const pickLeft = arr[i] + Math.min(x, y);
          const pickRight = arr[j] + Math.min(y, z);

          dp[i][j] = Math.max(pickLeft, pickRight);
        }
      }
    }

    return dp[0][n - 1];
  }
}
