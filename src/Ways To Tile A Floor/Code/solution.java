class Solution {
    public int numberOfWays(int n) {
        // Base cases
        if (n <= 2)
            return n; // 1 -> 1, 2 -> 2

        int prev2 = 1; // dp[1]
        int prev1 = 2; // dp[2]

        for (int i = 3; i <= n; i++) {
            int cur = prev1 + prev2; // dp[i] = dp[i-1] + dp[i-2]
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1; // dp[n]
    }
};
