#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int mergeStones(vector<int> &stones, int k)
    {
        int n = stones.size();
        // If we cannot reduce to 1 pile because of modular constraint
        if ((n - 1) % (k - 1) != 0)
            return -1;

        // prefix sums for interval sums in O(1)
        vector<int> pref(n + 1, 0);
        for (int i = 0; i < n; ++i)
            pref[i + 1] = pref[i] + stones[i];

        auto rangeSum = [&](int i, int j)
        { return pref[j + 1] - pref[i]; };

        const long long INF = 1e15;
        vector<vector<long long>> dp(n, vector<long long>(n, 0));

        // len = interval length
        for (int len = 2; len <= n; ++len)
        {
            for (int i = 0; i + len - 1 < n; ++i)
            {
                int j = i + len - 1;
                dp[i][j] = INF;
                // We try splits: m is the last index of left segment.
                // Step by k-1 to ensure valid intermediate pile counts.
                for (int m = i; m < j; m += (k - 1))
                {
                    dp[i][j] = min(dp[i][j], dp[i][m] + dp[m + 1][j]);
                }
                // If current length can be merged into one pile, add the sum
                if ((len - 1) % (k - 1) == 0)
                    dp[i][j] += rangeSum(i, j);
            }
        }
        return (int)dp[0][n - 1];
    }
};
