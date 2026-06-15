class Solution:
    def minimumCost(self, cost, w):

        # Large value representing unreachable state
        INF = 10**9

        # dp[i] = minimum cost to get exactly i kg
        dp = [INF] * (w + 1)

        # Base case
        dp[0] = 0

        n = len(cost)

        # Process every packet type
        for i in range(n):

            # Skip unavailable packets
            if cost[i] == -1:
                continue

            # Packet weight
            wt = i + 1

            # Unbounded knapsack transition
            for j in range(wt, w + 1):

                # If previous state is reachable,
                # try using current packet
                if dp[j - wt] != INF:
                    dp[j] = min(dp[j], dp[j - wt] + cost[i])

        # Return answer
        return -1 if dp[w] == INF else dp[w]