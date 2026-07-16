class Solution
{
public:
    int countWays(int n, int sum)
    {
        // Maximum possible digit sum for n digits is 9*n
        if (sum > 9 * n)
            return -1;

        // dp[i][j] = ways to form i digits with digit sum j
        vector<vector<int>> dp(n + 1, vector<int>(sum + 1, 0));

        // Base case: 0 digits with sum 0
        dp[0][0] = 1;

        // Build DP table
        for (int i = 0; i < n; i++)
        {
            for (int s = 0; s <= sum; s++)
            {
                if (dp[i][s] == 0)
                    continue;

                // Try every possible digit
                for (int d = 0; d <= 9; d++)
                {
                    if (s + d <= sum)
                    {
                        dp[i + 1][s + d] += dp[i][s];
                    }
                }
            }
        }

        // Total sequences (including leading zeroes)
        int total = dp[n][sum];

        // If there is only one digit, leading zero case does not exist
        if (n == 1)
            return total == 0 ? -1 : total;

        // DP for remaining n-1 digits (first digit fixed as 0)
        vector<vector<int>> dpZero(n, vector<int>(sum + 1, 0));
        dpZero[0][0] = 1;

        for (int i = 0; i < n - 1; i++)
        {
            for (int s = 0; s <= sum; s++)
            {
                if (dpZero[i][s] == 0)
                    continue;

                for (int d = 0; d <= 9; d++)
                {
                    if (s + d <= sum)
                    {
                        dpZero[i + 1][s + d] += dpZero[i][s];
                    }
                }
            }
        }

        // Remove numbers starting with 0
        int ans = total - dpZero[n - 1][sum];

        // If no valid number exists
        return ans == 0 ? -1 : ans;
    }
};