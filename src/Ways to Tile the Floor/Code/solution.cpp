class Solution {
  public:
    int countWays(int n, int m) {
        // Mod value given in the problem
        const int MOD = 1000000007;

        // dp[i] = number of ways to tile i x m floor
        vector<long long> dp(n + 1, 0);

        // Base case: empty floor has one valid way
        dp[0] = 1;

        // Build answer from smaller floors
        for (int i = 1; i <= n; i++) {

            // Always possible to place one horizontal tile
            dp[i] = dp[i - 1];

            // Vertical placement is possible only when at least m rows exist
            if (i >= m) {
                dp[i] = (dp[i] + dp[i - m]) % MOD;
            }
        }

        // Return final answer
        return dp[n];
    }
};