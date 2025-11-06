/**
 * @param {number} n
 * @return {number}
 */

class Solution {
  numberOfWays(n) {
    // Base cases for n = 1 or 2
    if (n <= 2) return n;

    // prev2 = dp[1], prev1 = dp[2]
    let prev2 = 1,
      prev1 = 2;

    // Build up using Fibonacci-like transition
    for (let i = 3; i <= n; i++) {
      const cur = prev1 + prev2; // dp[i]
      prev2 = prev1;
      prev1 = cur;
    }
    return prev1; // dp[n]
  }
}
