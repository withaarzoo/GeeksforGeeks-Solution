class Solution {
  minCost(n, i, d, c) {
    // dp[x] stores the minimum cost needed to get exactly x characters.
    const dp = new Array(n + 1).fill(0);

    // The screen is initially empty, so the cost for 0 characters is zero.
    dp[0] = 0;

    // Calculate the minimum cost for every length from 1 to n.
    for (let x = 1; x <= n; x++) {
      // Insert one character after reaching x - 1 characters.
      dp[x] = dp[x - 1] + i;

      if (x % 2 === 0) {
        // If x is even, copying x / 2 characters gives exactly x.
        dp[x] = Math.min(dp[x], dp[x / 2] + c);
      } else {
        // Copy floor(x / 2) characters and insert the remaining one.
        dp[x] = Math.min(dp[x], dp[Math.floor(x / 2)] + c + i);

        // Copy ceil(x / 2) characters to get x + 1,
        // then delete one character to reach exactly x.
        dp[x] = Math.min(dp[x], dp[Math.floor(x / 2) + 1] + c + d);
      }
    }

    // dp[n] is the minimum cost required to get exactly n characters.
    return dp[n];
  }
}
