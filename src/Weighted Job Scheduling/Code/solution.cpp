#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int maxProfit(vector<vector<int>> &jobs)
    {
        int n = jobs.size();
        // Sort by end time
        sort(jobs.begin(), jobs.end(), [](const auto &a, const auto &b)
             { return a[1] < b[1]; });

        vector<int> ends(n);
        for (int i = 0; i < n; ++i)
            ends[i] = jobs[i][1];

        // Use long long internally to be safe with sums
        vector<long long> dp(n, 0);
        for (int i = 0; i < n; ++i)
        {
            long long take = jobs[i][2];
            // Find rightmost job j with ends[j] <= jobs[i][0]
            int j = upper_bound(ends.begin(), ends.begin() + i, jobs[i][0]) - ends.begin() - 1;
            if (j >= 0)
                take += dp[j];

            long long skip = (i ? dp[i - 1] : 0);
            dp[i] = max(skip, take);
        }
        return (int)dp.back();
    }
};
