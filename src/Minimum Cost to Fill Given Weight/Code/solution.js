class Solution {
  minimumCost(cost, w) {
    // Large value representing unreachable state
    const INF = 1e9;

    // dp[i] = minimum cost to get exactly i kg
    const dp = new Array(w + 1).fill(INF);

    // Base case
    dp[0] = 0;

    const n = cost.length;

    // Process every packet type
    for (let i = 0; i < n; i++) {
      // Skip unavailable packets
      if (cost[i] === -1) continue;

      // Packet weight
      const wt = i + 1;

      // Unbounded knapsack transition
      for (let j = wt; j <= w; j++) {
        // If previous state is reachable
        if (dp[j - wt] !== INF) {
          dp[j] = Math.min(dp[j], dp[j - wt] + cost[i]);
        }
      }
    }

    // Return final answer
    return dp[w] === INF ? -1 : dp[w];
  }
}
