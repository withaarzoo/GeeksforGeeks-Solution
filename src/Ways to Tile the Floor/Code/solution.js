/**
 * @param {number} n
 * @param {number} m
 * @returns {number}
 */
class Solution {
  countWays(n, m) {
    // Mod value given in the problem
    const MOD = 1000000007;

    // dp[i] stores number of ways for i x m floor
    const dp = new Array(n + 1).fill(0);

    // Empty floor has one valid arrangement
    dp[0] = 1;

    // Compute DP from smaller floors
    for (let i = 1; i <= n; i++) {
      // Place one horizontal tile
      dp[i] = dp[i - 1];

      // Add ways after placing m vertical tiles
      if (i >= m) {
        dp[i] = (dp[i] + dp[i - m]) % MOD;
      }
    }

    // Final answer
    return dp[n];
  }
}
