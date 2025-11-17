#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int maxSumIS(vector<int> &arr)
    {
        int n = arr.size();
        if (n == 0)
            return 0;
        // dp[i] = max sum of increasing subsequence ending at i
        vector<int> dp(n);
        int ans = 0;
        for (int i = 0; i < n; ++i)
        {
            dp[i] = arr[i]; // at least the element itself
            // try to extend subsequence that ends at j (< i)
            for (int j = 0; j < i; ++j)
            {
                if (arr[j] < arr[i])
                {
                    dp[i] = max(dp[i], dp[j] + arr[i]);
                }
            }
            ans = max(ans, dp[i]);
        }
        return ans;
    }
};
