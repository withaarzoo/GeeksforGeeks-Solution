/**
 * @param {number} n
 * @returns {number}
 */
class Solution {
  findWays(n) {
    // Odd length can't form valid parentheses
    if (n % 2 !== 0) return 0;

    const pairs = n / 2;
    const dp = new Array(pairs + 1).fill(0);

    // Base case
    dp[0] = 1;

    // Compute Catalan numbers
    for (let i = 1; i <= pairs; i++) {
      for (let j = 0; j < i; j++) {
        dp[i] += dp[j] * dp[i - j - 1];
      }
    }

    return dp[pairs];
  }
}
