class Solution
{
public:
    int maxChocolate(vector<vector<int>> &grid)
    {
        int n = grid.size();
        int m = grid[0].size();

        // dp[c1][c2] -> max chocolates at current row
        vector<vector<int>> dp(m, vector<int>(m, 0)), temp;

        // Base case (last row)
        for (int c1 = 0; c1 < m; c1++)
        {
            for (int c2 = 0; c2 < m; c2++)
            {
                if (c1 == c2)
                    dp[c1][c2] = grid[n - 1][c1];
                else
                    dp[c1][c2] = grid[n - 1][c1] + grid[n - 1][c2];
            }
        }

        // Bottom-up DP
        for (int row = n - 2; row >= 0; row--)
        {
            temp = vector<vector<int>>(m, vector<int>(m, 0));

            for (int c1 = 0; c1 < m; c1++)
            {
                for (int c2 = 0; c2 < m; c2++)
                {

                    int maxi = 0;

                    for (int d1 = -1; d1 <= 1; d1++)
                    {
                        for (int d2 = -1; d2 <= 1; d2++)
                        {

                            int nc1 = c1 + d1;
                            int nc2 = c2 + d2;

                            if (nc1 >= 0 && nc1 < m && nc2 >= 0 && nc2 < m)
                            {
                                int value = dp[nc1][nc2];

                                if (c1 == c2)
                                    value += grid[row][c1];
                                else
                                    value += grid[row][c1] + grid[row][c2];

                                maxi = max(maxi, value);
                            }
                        }
                    }

                    temp[c1][c2] = maxi;
                }
            }
            dp = temp;
        }

        return dp[0][m - 1];
    }
};