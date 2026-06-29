class Solution {
  maxDotProduct(a, b) {
    const n = a.length;
    const m = b.length;

    // Impossible state
    const NEG = -1e9;

    // DP array
    let dp = new Array(m + 1).fill(NEG);

    // Using zero elements from b gives 0
    dp[0] = 0;

    // Process every element of a
    for (let i = 1; i <= n; i++) {
      // Copy previous row
      let ndp = [...dp];

      // Try every possible match
      for (let j = 1; j <= Math.min(i, m); j++) {
        // Skip current a
        ndp[j] = Math.max(ndp[j], dp[j]);

        // Match current a with current b
        if (dp[j - 1] !== NEG) {
          ndp[j] = Math.max(ndp[j], dp[j - 1] + a[i - 1] * b[j - 1]);
        }
      }

      // Update DP
      dp = ndp;
    }

    // Final answer
    return dp[m];
  }
}
