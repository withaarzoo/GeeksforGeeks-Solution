class Solution {
  public:
    int countStrings(int n, int k) {
        const int MOD = 1000000007;

        // dp[length][pairs][lastBit]
        vector<vector<vector<long long>>> dp(
            n + 1,
            vector<vector<long long>>(k + 1, vector<long long>(2, 0))
        );

        // Base case: strings of length 1
        dp[1][0][0] = 1; // "0"
        dp[1][0][1] = 1; // "1"

        // Build strings from length 2 to n
        for (int len = 2; len <= n; len++) {
            for (int pairs = 0; pairs <= k; pairs++) {

                // Previous string ended with 0

                // Append 0 -> still ends with 0, pair count unchanged
                dp[len][pairs][0] =
                    (dp[len][pairs][0] + dp[len - 1][pairs][0]) % MOD;

                // Append 1 -> ends with 1, no new "11" pair
                dp[len][pairs][1] =
                    (dp[len][pairs][1] + dp[len - 1][pairs][0]) % MOD;

                // Previous string ended with 1

                // Append 0 -> pair count unchanged
                dp[len][pairs][0] =
                    (dp[len][pairs][0] + dp[len - 1][pairs][1]) % MOD;

                // Append 1 -> creates one new adjacent "11" pair
                if (pairs > 0) {
                    dp[len][pairs][1] =
                        (dp[len][pairs][1] + dp[len - 1][pairs - 1][1]) % MOD;
                }
            }
        }

        // Strings ending with either 0 or 1
        return (dp[n][k][0] + dp[n][k][1]) % MOD;
    }
};