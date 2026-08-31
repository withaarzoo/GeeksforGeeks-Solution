class Solution {
    public int minCost(int n, int i, int d, int c) {
        // dp[x] stores the minimum cost needed to get exactly x characters.
        int[] dp = new int[n + 1];

        // The screen starts empty, so the cost for 0 characters is zero.
        dp[0] = 0;

        // Build the DP values from smaller lengths to larger lengths.
        for (int x = 1; x <= n; x++) {
            // Insert one character after reaching x - 1 characters.
            dp[x] = dp[x - 1] + i;

            if (x % 2 == 0) {
                // For an even length, copy x / 2 characters to get exactly x.
                dp[x] = Math.min(dp[x], dp[x / 2] + c);
            } else {
                // Start with floor(x / 2), copy, then insert one character.
                dp[x] = Math.min(dp[x], dp[x / 2] + c + i);

                // Start with ceil(x / 2), copy to x + 1, then delete one.
                dp[x] = Math.min(dp[x], dp[x / 2 + 1] + c + d);
            }
        }

        // Return the minimum cost for exactly n characters.
        return dp[n];
    }
}