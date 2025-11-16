/**
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */

class Solution {
  LCIS(a, b) {
    let n = a.length,
      m = b.length;
    if (n === 0 || m === 0) return 0;

    // dp[j] = length of LCIS that ends with b[j]
    const dp = new Array(m).fill(0);

    for (let i = 0; i < n; ++i) {
      let current = 0; // best LCIS length for values < a[i]
      for (let j = 0; j < m; ++j) {
        if (a[i] === b[j]) {
          // extend sequences that end with smaller values
          dp[j] = Math.max(dp[j], current + 1);
        } else if (a[i] > b[j]) {
          // candidate prefix
          current = Math.max(current, dp[j]);
        }
        // else ignore
      }
    }

    return Math.max(...dp);
  }
}
