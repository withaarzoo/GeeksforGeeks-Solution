class Solution {
    public int count(int n, int m) {
        final int MOD = 1000000007;

        // Store divisors for every number
        java.util.ArrayList<Integer>[] divisors = new java.util.ArrayList[m + 1];
        for (int i = 0; i <= m; i++) {
            divisors[i] = new java.util.ArrayList<>();
        }

        // Precompute divisors
        for (int d = 1; d <= m; d++) {
            for (int multiple = d; multiple <= m; multiple += d) {
                divisors[multiple].add(d);
            }
        }

        // DP table
        long[][] dp = new long[n + 1][m + 1];

        // Base case
        for (int v = 1; v <= m; v++) {
            dp[1][v] = 1;
        }

        // Fill DP
        for (int len = 2; len <= n; len++) {
            for (int v = 1; v <= m; v++) {

                // Add all divisors
                for (int d : divisors[v]) {
                    dp[len][v] = (dp[len][v] + dp[len - 1][d]) % MOD;
                }

                // Add all multiples
                for (int mult = v; mult <= m; mult += v) {
                    dp[len][v] = (dp[len][v] + dp[len - 1][mult]) % MOD;
                }

                // Remove duplicate count
                dp[len][v] = (dp[len][v] - dp[len - 1][v] + MOD) % MOD;
            }
        }

        long ans = 0;

        // Sum final answers
        for (int v = 1; v <= m; v++) {
            ans = (ans + dp[n][v]) % MOD;
        }

        return (int) ans;
    }
}