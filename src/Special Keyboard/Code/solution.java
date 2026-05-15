class Solution {
    public int optimalKeys(int n) {

        // dp[i] stores maximum number of A's
        // possible using exactly i key presses
        int[] dp = new int[n + 1];

        // Base case:
        // Best option initially is pressing 'A'
        for (int i = 1; i <= n; i++) {
            dp[i] = i;
        }

        // Build answers for all values
        for (int i = 1; i <= n; i++) {

            // Try every possible breakpoint
            for (int j = 1; j <= i - 3; j++) {

                // Use copy-paste strategy
                dp[i] = Math.max(dp[i], dp[j] * (i - j - 1));
            }
        }

        // Return final answer
        return dp[n];
    }
}