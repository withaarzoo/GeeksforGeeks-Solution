class Solution
{
public:
    int findWays(int n)
    {
        // If n is odd, valid parentheses are impossible
        if (n % 2 != 0)
            return 0;

        int pairs = n / 2;
        vector<long long> dp(pairs + 1, 0);

        // Base case: empty string
        dp[0] = 1;

        // Calculate Catalan numbers using DP
        for (int i = 1; i <= pairs; i++)
        {
            for (int j = 0; j < i; j++)
            {
                dp[i] += dp[j] * dp[i - j - 1];
            }
        }

        return dp[pairs];
    }
};
