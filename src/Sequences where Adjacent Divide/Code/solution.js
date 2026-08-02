/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */

class Solution {
  count(n, m) {
    const MOD = 1000000007;

    // Store divisors for every value
    const divisors = Array.from({ length: m + 1 }, () => []);

    // Precompute divisor lists
    for (let d = 1; d <= m; d++) {
      for (let multiple = d; multiple <= m; multiple += d) {
        divisors[multiple].push(d);
      }
    }

    // DP table
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    // Base case
    for (let v = 1; v <= m; v++) {
      dp[1][v] = 1;
    }

    // Build DP
    for (let len = 2; len <= n; len++) {
      for (let v = 1; v <= m; v++) {
        // Add all divisors
        for (const d of divisors[v]) {
          dp[len][v] = (dp[len][v] + dp[len - 1][d]) % MOD;
        }

        // Add all multiples
        for (let mult = v; mult <= m; mult += v) {
          dp[len][v] = (dp[len][v] + dp[len - 1][mult]) % MOD;
        }

        // Remove duplicate count
        dp[len][v] = (dp[len][v] - dp[len - 1][v] + MOD) % MOD;
      }
    }

    let ans = 0;

    // Sum every ending value
    for (let v = 1; v <= m; v++) {
      ans = (ans + dp[n][v]) % MOD;
    }

    return ans;
  }
}
