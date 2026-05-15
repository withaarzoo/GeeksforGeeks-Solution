class Solution {
  optimalKeys(n) {
    // dp[i] stores maximum number of A's
    // possible with exactly i key presses
    let dp = new Array(n + 1).fill(0);

    // Base case:
    // Press 'A' directly
    for (let i = 1; i <= n; i++) {
      dp[i] = i;
    }

    // Compute answers for all states
    for (let i = 1; i <= n; i++) {
      // Try every possible breakpoint
      for (let j = 1; j <= i - 3; j++) {
        // Apply copy-paste optimization
        dp[i] = Math.max(dp[i], dp[j] * (i - j - 1));
      }
    }

    // Final result
    return dp[n];
  }
}
