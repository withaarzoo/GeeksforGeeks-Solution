/**
 * @param {number} n
 * @param {number} k
 * @returns {number}
 */
class Solution {
  countStrings(n, k) {
    const MOD = 1000000007;

    // dp[length][pairs][lastBit]
    const dp = Array.from({ length: n + 1 }, () =>
      Array.from({ length: k + 1 }, () => [0, 0]),
    );

    // Base case
    dp[1][0][0] = 1;
    dp[1][0][1] = 1;

    // Build strings
    for (let len = 2; len <= n; len++) {
      for (let pairs = 0; pairs <= k; pairs++) {
        // Previous last bit was 0

        // Append 0
        dp[len][pairs][0] = (dp[len][pairs][0] + dp[len - 1][pairs][0]) % MOD;

        // Append 1
        dp[len][pairs][1] = (dp[len][pairs][1] + dp[len - 1][pairs][0]) % MOD;

        // Previous last bit was 1

        // Append 0
        dp[len][pairs][0] = (dp[len][pairs][0] + dp[len - 1][pairs][1]) % MOD;

        // Append 1 creates one new pair
        if (pairs > 0) {
          dp[len][pairs][1] =
            (dp[len][pairs][1] + dp[len - 1][pairs - 1][1]) % MOD;
        }
      }
    }

    return (dp[n][k][0] + dp[n][k][1]) % MOD;
  }
}
