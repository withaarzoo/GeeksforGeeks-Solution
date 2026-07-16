/**
 * @param {number} n
 * @param {number} sum
 * @return {number}
 */

class Solution {
  countWays(n, sum) {
    // Impossible if required sum is larger than maximum possible
    if (sum > 9 * n) return -1;

    // DP table
    let dp = Array.from({ length: n + 1 }, () => Array(sum + 1).fill(0));

    // Base case
    dp[0][0] = 1;

    // Build DP
    for (let i = 0; i < n; i++) {
      for (let s = 0; s <= sum; s++) {
        if (dp[i][s] === 0) continue;

        // Try every digit
        for (let d = 0; d <= 9; d++) {
          if (s + d <= sum) {
            dp[i + 1][s + d] += dp[i][s];
          }
        }
      }
    }

    let total = dp[n][sum];

    // Single digit case
    if (n === 1) return total === 0 ? -1 : total;

    // DP after fixing first digit as 0
    let dpZero = Array.from({ length: n }, () => Array(sum + 1).fill(0));

    dpZero[0][0] = 1;

    for (let i = 0; i < n - 1; i++) {
      for (let s = 0; s <= sum; s++) {
        if (dpZero[i][s] === 0) continue;

        for (let d = 0; d <= 9; d++) {
          if (s + d <= sum) {
            dpZero[i + 1][s + d] += dpZero[i][s];
          }
        }
      }
    }

    let ans = total - dpZero[n - 1][sum];

    return ans === 0 ? -1 : ans;
  }
}
