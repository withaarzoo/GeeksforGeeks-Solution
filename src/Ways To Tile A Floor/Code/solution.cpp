class Solution
{
public:
    int numberOfWays(int n)
    {
        // Handle small boards directly
        if (n <= 2)
            return n; // dp[1]=1, dp[2]=2

        // prev2 -> dp[i-2], prev1 -> dp[i-1]
        int prev2 = 1; // dp[1]
        int prev1 = 2; // dp[2]

        // Iteratively compute dp up to n using Fibonacci relation
        for (int i = 3; i <= n; ++i)
        {
            int cur = prev1 + prev2; // dp[i] = dp[i-1] + dp[i-2]
            prev2 = prev1;           // shift window
            prev1 = cur;
        }
        return prev1; // dp[n]
    }
};
