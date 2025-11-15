#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int minCutCost(int n, vector<int> &cuts)
    {
        // Add endpoints and sort
        cuts.push_back(0);
        cuts.push_back(n);
        sort(cuts.begin(), cuts.end());
        int m = cuts.size();
        // dp[i][j] = min cost to cut between cuts[i] and cuts[j] (exclusive)
        vector<vector<int>> dp(m, vector<int>(m, 0));
        // length is the number of positions between i and j (interval size)
        for (int len = 2; len < m; ++len)
        { // len is j - i
            for (int i = 0; i + len < m; ++i)
            {
                int j = i + len;
                int best = INT_MAX;
                // try each possible first cut k between i and j
                for (int k = i + 1; k < j; ++k)
                {
                    int cost = cuts[j] - cuts[i] + dp[i][k] + dp[k][j];
                    if (cost < best)
                        best = cost;
                }
                dp[i][j] = (best == INT_MAX) ? 0 : best;
            }
        }
        return dp[0][m - 1];
    }
};
