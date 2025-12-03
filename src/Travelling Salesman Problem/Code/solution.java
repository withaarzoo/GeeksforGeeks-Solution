class Solution {
    public int tsp(int[][] cost) {
        int n = cost.length;
        int N = 1 << n;
        final int INF = (int) 1e9;

        // dp[mask][u] = min cost to start at 0, visit 'mask', and end at u
        int[][] dp = new int[N][n];
        for (int i = 0; i < N; i++) {
            Arrays.fill(dp[i], INF);
        }

        dp[1][0] = 0; // only city 0 visited, and we are at city 0

        for (int mask = 0; mask < N; mask++) {
            for (int u = 0; u < n; u++) {
                if ((mask & (1 << u)) == 0)
                    continue; // city u must be in mask
                int curCost = dp[mask][u];
                if (curCost == INF)
                    continue; // unreachable

                // try going to every not-visited city v
                for (int v = 0; v < n; v++) {
                    if ((mask & (1 << v)) != 0)
                        continue; // already visited
                    int newMask = mask | (1 << v);
                    int newCost = curCost + cost[u][v];
                    if (newCost < dp[newMask][v]) {
                        dp[newMask][v] = newCost;
                    }
                }
            }
        }

        int fullMask = N - 1;
        int ans = INF;

        // end at any city u and return to 0
        for (int u = 0; u < n; u++) {
            if (dp[fullMask][u] == INF)
                continue;
            ans = Math.min(ans, dp[fullMask][u] + cost[u][0]);
        }

        return ans;
    }
}
