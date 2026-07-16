class Solution {
    public int countWays(int n, int sum) {

        // Maximum possible digit sum
        if (sum > 9 * n)
            return -1;

        // dp[i][j] = ways to form i digits with sum j
        int[][] dp = new int[n + 1][sum + 1];

        // Base case
        dp[0][0] = 1;

        // Fill DP table
        for (int i = 0; i < n; i++) {
            for (int s = 0; s <= sum; s++) {
                if (dp[i][s] == 0)
                    continue;

                // Try every digit
                for (int d = 0; d <= 9; d++) {
                    if (s + d <= sum) {
                        dp[i + 1][s + d] += dp[i][s];
                    }
                }
            }
        }

        int total = dp[n][sum];

        // Single digit case
        if (n == 1)
            return total == 0 ? -1 : total;

        // DP for numbers whose first digit is 0
        int[][] dpZero = new int[n][sum + 1];
        dpZero[0][0] = 1;

        for (int i = 0; i < n - 1; i++) {
            for (int s = 0; s <= sum; s++) {
                if (dpZero[i][s] == 0)
                    continue;

                for (int d = 0; d <= 9; d++) {
                    if (s + d <= sum) {
                        dpZero[i + 1][s + d] += dpZero[i][s];
                    }
                }
            }
        }

        int ans = total - dpZero[n - 1][sum];

        return ans == 0 ? -1 : ans;
    }
}