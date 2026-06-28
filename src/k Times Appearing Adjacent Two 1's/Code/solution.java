class Solution {
    public int countStrings(int n, int k) {

        final int MOD = 1000000007;

        // dp[length][pairs][lastBit]
        long[][][] dp = new long[n + 1][k + 1][2];

        // Base case
        dp[1][0][0] = 1;
        dp[1][0][1] = 1;

        // Build the answer
        for (int len = 2; len <= n; len++) {
            for (int pairs = 0; pairs <= k; pairs++) {

                // Previous last bit was 0

                // Append 0
                dp[len][pairs][0] = (dp[len][pairs][0] + dp[len - 1][pairs][0]) % MOD;

                // Append 1
                dp[len][pairs][1] = (dp[len][pairs][1] + dp[len - 1][pairs][0]) % MOD;

                // Previous last bit was 1

                // Append 0
                dp[len][pairs][0] = (dp[len][pairs][0] + dp[len - 1][pairs][1]) % MOD;

                // Append 1 creates one more "11"
                if (pairs > 0) {
                    dp[len][pairs][1] = (dp[len][pairs][1] + dp[len - 1][pairs - 1][1]) % MOD;
                }
            }
        }

        return (int) ((dp[n][k][0] + dp[n][k][1]) % MOD);
    }
}