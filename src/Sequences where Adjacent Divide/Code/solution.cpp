class Solution {
public:
    int count(int n, int m) {
        const int MOD = 1000000007;

        // Store all divisors for every number
        std::vector<std::vector<int>> divisors(m + 1);

        // Build divisor lists using sieve idea
        for (int d = 1; d <= m; d++) {
            for (int multiple = d; multiple <= m; multiple += d) {
                divisors[multiple].push_back(d);
            }
        }

        // dp[len][value] = number of valid arrays
        std::vector<std::vector<long long>> dp(n + 1,
                                               std::vector<long long>(m + 1, 0));

        // Every value can start a sequence
        for (int v = 1; v <= m; v++)
            dp[1][v] = 1;

        // Build DP
        for (int len = 2; len <= n; len++) {
            for (int v = 1; v <= m; v++) {

                // Previous value is a divisor of v
                for (int d : divisors[v]) {
                    dp[len][v] = (dp[len][v] + dp[len - 1][d]) % MOD;
                }

                // Previous value is a multiple of v
                for (int mult = v; mult <= m; mult += v) {
                    dp[len][v] = (dp[len][v] + dp[len - 1][mult]) % MOD;
                }

                // v was counted twice
                dp[len][v] = (dp[len][v] - dp[len - 1][v] + MOD) % MOD;
            }
        }

        // Sum all sequences ending with any value
        long long ans = 0;
        for (int v = 1; v <= m; v++) {
            ans = (ans + dp[n][v]) % MOD;
        }

        return (int)ans;
    }
};