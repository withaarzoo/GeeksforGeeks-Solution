class Solution
{
public:
    int maximumAmount(vector<int> &arr)
    {
        int n = (int)arr.size();
        // dp[i][j] -> max amount current player can collect
        // from subarray arr[i..j]
        vector<vector<long long>> dp(n, vector<long long>(n, 0));

        // gap = length - 1 of the current subarray
        for (int gap = 0; gap < n; ++gap)
        {
            for (int i = 0; i + gap < n; ++i)
            {
                int j = i + gap;

                if (i == j)
                {
                    // Only one coin
                    dp[i][j] = arr[i];
                }
                else if (j == i + 1)
                {
                    // Two coins: take the maximum one
                    dp[i][j] = max(arr[i], arr[j]);
                }
                else
                {
                    // x, y, z are the future gains after opponent's move
                    long long x = (i + 2 <= j) ? dp[i + 2][j] : 0;
                    long long y = (i + 1 <= j - 1) ? dp[i + 1][j - 1] : 0;
                    long long z = (i <= j - 2) ? dp[i][j - 2] : 0;

                    long long pickLeft = arr[i] + min(x, y);
                    long long pickRight = arr[j] + min(y, z);

                    dp[i][j] = max(pickLeft, pickRight);
                }
            }
        }

        return (int)dp[0][n - 1];
    }
};
