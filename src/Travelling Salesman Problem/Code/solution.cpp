class Solution
{
public:
    int tsp(vector<vector<int>> &cost)
    {
        int n = cost.size();
        int N = 1 << n;      // total masks
        const int INF = 1e9; // large number for initialization

        // dp[mask][u] = min cost to start at 0, visit 'mask', and end at u
        vector<vector<int>> dp(N, vector<int>(n, INF));

        dp[1][0] = 0; // only city 0 visited, and we are at city 0

        for (int mask = 0; mask < N; mask++)
        {
            for (int u = 0; u < n; u++)
            {
                if (!(mask & (1 << u)))
                    continue; // city u must be in mask
                int curCost = dp[mask][u];
                if (curCost == INF)
                    continue; // unreachable state

                // try going to every not-visited city v
                for (int v = 0; v < n; v++)
                {
                    if (mask & (1 << v))
                        continue; // already visited
                    int newMask = mask | (1 << v);
                    int newCost = curCost + cost[u][v];
                    if (newCost < dp[newMask][v])
                    {
                        dp[newMask][v] = newCost;
                    }
                }
            }
        }

        int fullMask = N - 1;
        int ans = INF;

        // end at any city u and return to 0
        for (int u = 0; u < n; u++)
        {
            if (dp[fullMask][u] == INF)
                continue;
            ans = min(ans, dp[fullMask][u] + cost[u][0]);
        }

        return ans;
    }
};
