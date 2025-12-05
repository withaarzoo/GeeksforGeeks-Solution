#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int minCost(vector<vector<int>> &costs)
    {
        int n = costs.size();
        if (n == 0)
            return 0;
        int k = costs[0].size();

        // If only one color and more than 1 wall -> impossible
        if (k == 1)
        {
            if (n == 1)
                return costs[0][0];
            return -1;
        }

        // prev[j] will store min cost to paint up to previous wall,
        // if previous wall is painted with color j
        vector<long long> prev(k), curr(k);

        // Base case: for the first wall, cost is just costs[0][j]
        for (int j = 0; j < k; j++)
        {
            prev[j] = costs[0][j];
        }

        // Process walls from 2nd (index 1) to last
        for (int i = 1; i < n; i++)
        {
            // Find smallest and second smallest in prev
            long long min1 = LLONG_MAX, min2 = LLONG_MAX;
            int idx1 = -1, idx2 = -1;

            for (int j = 0; j < k; j++)
            {
                long long val = prev[j];
                if (val < min1)
                {
                    // shift current min1 to min2
                    min2 = min1;
                    idx2 = idx1;
                    // update min1
                    min1 = val;
                    idx1 = j;
                }
                else if (val < min2)
                {
                    min2 = val;
                    idx2 = j;
                }
            }

            // Now compute current row
            for (int j = 0; j < k; j++)
            {
                // If I choose same color as idx1, I must take min2
                long long bestPrev = (j == idx1) ? min2 : min1;
                curr[j] = costs[i][j] + bestPrev;
            }

            // Move curr to prev for next iteration
            prev = curr;
        }

        // Answer is minimum in the last row
        long long ans = LLONG_MAX;
        for (int j = 0; j < k; j++)
        {
            ans = min(ans, prev[j]);
        }

        return (int)ans;
    }
};
