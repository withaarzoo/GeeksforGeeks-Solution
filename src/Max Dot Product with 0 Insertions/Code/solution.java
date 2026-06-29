class Solution {
    public int maxDotProduct(int[] a, int[] b) {

        int n = a.length;
        int m = b.length;

        // Impossible state
        int NEG = -(int) 1e9;

        // DP array
        int[] dp = new int[m + 1];

        // Initialize all states as impossible
        for (int i = 1; i <= m; i++) {
            dp[i] = NEG;
        }

        // Using zero elements from b gives 0
        dp[0] = 0;

        // Process every element of a
        for (int i = 1; i <= n; i++) {

            // Copy previous row
            int[] ndp = dp.clone();

            // Try every possible match
            for (int j = 1; j <= Math.min(i, m); j++) {

                // Skip current a
                ndp[j] = Math.max(ndp[j], dp[j]);

                // Match current a with current b
                if (dp[j - 1] != NEG) {
                    ndp[j] = Math.max(
                            ndp[j],
                            dp[j - 1] + a[i - 1] * b[j - 1]);
                }
            }

            // Update DP
            dp = ndp;
        }

        // Final answer
        return dp[m];
    }
}