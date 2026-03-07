class Solution
{
public:
    int noOfWays(int m, int n, int x)
    {
        // dp[j] will store number of ways to get sum j
        vector<long long> dp(x + 1, 0);

        // Base case: 1 way to get sum 0 using 0 dice
        dp[0] = 1;

        // Iterate for each dice
        for (int dice = 1; dice <= n; dice++)
        {

            // Temporary array for current dice calculations
            vector<long long> temp(x + 1, 0);

            for (int sum = 1; sum <= x; sum++)
            {

                // Try every possible face value
                for (int face = 1; face <= m; face++)
                {

                    if (sum - face >= 0)
                    {
                        temp[sum] += dp[sum - face];
                    }
                }
            }

            // Move temp results to dp
            dp = temp;
        }

        return dp[x];
    }
};