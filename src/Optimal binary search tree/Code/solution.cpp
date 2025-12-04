class Solution
{
public:
    int minCost(vector<int> &keys, vector<int> &freq)
    {
        int n = keys.size();
        if (n == 0)
            return 0;

        // dp[i][j] = minimum cost of optimal BST using keys[i..j]
        vector<vector<int>> dp(n, vector<int>(n, 0));

        // prefixFreq[k] = sum of freq[0..k-1]
        vector<int> prefixFreq(n + 1, 0);
        for (int i = 0; i < n; ++i)
        {
            prefixFreq[i + 1] = prefixFreq[i] + freq[i];
        }

        // Helper lambda to get sum of freq from i to j inclusive
        auto rangeSum = [&](int i, int j)
        {
            return prefixFreq[j + 1] - prefixFreq[i];
        };

        // Base case: single key
        for (int i = 0; i < n; ++i)
        {
            dp[i][i] = freq[i];
        }

        // length from 2 to n
        for (int len = 2; len <= n; ++len)
        {
            for (int i = 0; i + len - 1 < n; ++i)
            {
                int j = i + len - 1;
                dp[i][j] = INT_MAX;

                int sumFreq = rangeSum(i, j); // constant extra cost for this segment

                // Try every key as root
                for (int r = i; r <= j; ++r)
                {
                    int left = (r > i) ? dp[i][r - 1] : 0;
                    int right = (r < j) ? dp[r + 1][j] : 0;

                    int cost = left + right + sumFreq;
                    if (cost < dp[i][j])
                    {
                        dp[i][j] = cost;
                    }
                }
            }
        }

        return dp[0][n - 1];
    }
};
