class Solution {
    public int countWays(int n, int m) {

        // Mod value given in the problem
        final int MOD = 1000000007;

        // dp[i] stores number of ways for i x m floor
        long[] dp = new long[n + 1];

        // Empty floor has one valid arrangement
        dp[0] = 1;

        // Compute answers iteratively
        for (int i = 1; i <= n; i++) {

            // Place one horizontal tile first
            dp[i] = dp[i - 1];

            // If vertical placement is possible, add those ways
            if (i >= m) {
                dp[i] = (dp[i] + dp[i - m]) % MOD;
            }
        }

        // Return answer after modulo
        return (int) dp[n];
    }
}