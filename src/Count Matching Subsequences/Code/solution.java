class Solution {
    public static int countWays(String s1, String s2) {

        // Mod value given in the problem
        final int MOD = 1000000007;

        int n = s1.length();
        int m = s2.length();

        // dp[i][j] stores the number of ways
        long[][] dp = new long[n + 1][m + 1];

        // Empty string can always be formed
        for (int i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        // Build the DP table
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {

                // Skip current character of s1
                dp[i][j] = dp[i - 1][j];

                // Include current character if both match
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % MOD;
                }
            }
        }

        // Return final answer
        return (int) dp[n][m];
    }
}