class Solution
{
public:
    int minimumCost(vector<int> &cost, int w)
    {

        // Large value representing an unreachable state
        const int INF = 1e9;

        // dp[i] = minimum cost to get exactly i kg
        vector<int> dp(w + 1, INF);

        // Base case: 0 kg requires 0 cost
        dp[0] = 0;

        int n = cost.size();

        // Process every packet type
        for (int i = 0; i < n; i++)
        {

            // Skip unavailable packets
            if (cost[i] == -1)
                continue;

            // Packet weight is (i + 1)
            int wt = i + 1;

            // Unbounded knapsack transition
            for (int j = wt; j <= w; j++)
            {

                // If previous state is reachable,
                // try taking this packet
                if (dp[j - wt] != INF)
                {
                    dp[j] = min(dp[j], dp[j - wt] + cost[i]);
                }
            }
        }

        // If still unreachable, answer is -1
        return dp[w] == INF ? -1 : dp[w];
    }
};