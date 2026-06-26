class Solution {
  countWays(s1, s2) {
    // Mod value given in the problem
    const MOD = 1000000007;

    const n = s1.length;
    const m = s2.length;

    // Create DP table filled with 0
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    // Empty string can always be formed
    for (let i = 0; i <= n; i++) {
      dp[i][0] = 1;
    }

    // Fill the DP table
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        // Skip current character
        dp[i][j] = dp[i - 1][j];

        // Include current character if it matches
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % MOD;
        }
      }
    }

    // Final answer
    return dp[n][m];
  }
}
