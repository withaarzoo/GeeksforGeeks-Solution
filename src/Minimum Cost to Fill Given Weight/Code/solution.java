class Solution {
    public int minimumCost(int[] cost, int w) {

        // Large value representing unreachable state
        int INF = (int) 1e9;

        // dp[i] = minimum cost to get exactly i kg
        int[] dp = new int[w + 1];

        // Initialize all states as unreachable
        Arrays.fill(dp, INF);

        // Base case
        dp[0] = 0;

        int n = cost.length;

        // Process every packet type
        for (int i = 0; i < n; i++) {

            // Skip unavailable packets
            if (cost[i] == -1)
                continue;

            // Packet weight
            int wt = i + 1;

            // Unbounded knapsack transition
            for (int j = wt; j <= w; j++) {

                // If previous weight is reachable
                if (dp[j - wt] != INF) {
                    dp[j] = Math.min(dp[j], dp[j - wt] + cost[i]);
                }
            }
        }

        // Return answer
        return dp[w] == INF ? -1 : dp[w];
    }
}