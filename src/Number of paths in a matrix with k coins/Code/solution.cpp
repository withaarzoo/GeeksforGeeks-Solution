class Solution
{
public:
    int numberOfPath(vector<vector<int>> &mat, int k)
    {
        int n = mat.size(), m = mat[0].size();
        // dp[i][j][s]: ways to reach (i,j) with sum s
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(m, vector<int>(k + 1, 0)));

        if (mat[0][0] <= k)
            dp[0][0][mat[0][0]] = 1;

        for (int i = 0; i < n; ++i)
        {
            for (int j = 0; j < m; ++j)
            {
                int val = mat[i][j];
                if (i == 0 && j == 0)
                    continue; // already initialized base case
                for (int s = val; s <= k; ++s)
                {
                    long long ways = 0;
                    if (i > 0)
                        ways += dp[i - 1][j][s - val]; // from top
                    if (j > 0)
                        ways += dp[i][j - 1][s - val]; // from left
                    dp[i][j][s] = (int)ways;           // problem guarantees fits in 32-bit
                }
            }
        }
        return dp[n - 1][m - 1][k];
    }
};
