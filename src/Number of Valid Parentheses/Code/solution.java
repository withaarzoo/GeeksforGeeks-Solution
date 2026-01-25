class Solution {
    int findWays(int n) {
        // Odd length cannot form valid parentheses
        if (n % 2 != 0)
            return 0;

        int pairs = n / 2;
        long[] dp = new long[pairs + 1];

        // Base case
        dp[0] = 1;

        // Catalan DP
        for (int i = 1; i <= pairs; i++) {
            for (int j = 0; j < i; j++) {
                dp[i] += dp[j] * dp[i - j - 1];
            }
        }

        return (int) dp[pairs];
    }
}
