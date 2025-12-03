class Solution:
    def tsp(self, cost):
        n = len(cost)
        N = 1 << n
        INF = 10**9
        
        # dp[mask][u] = min cost to start at 0, visit 'mask', and end at u
        dp = [[INF] * n for _ in range(N)]
        
        dp[1][0] = 0  # only city 0 visited, we are at city 0
        
        for mask in range(N):
            for u in range(n):
                if not (mask & (1 << u)):
                    continue  # city u must be included in mask
                cur_cost = dp[mask][u]
                if cur_cost == INF:
                    continue  # unreachable state
                
                # try going to each not-visited city v
                for v in range(n):
                    if mask & (1 << v):
                        continue  # already visited
                    new_mask = mask | (1 << v)
                    new_cost = cur_cost + cost[u][v]
                    if new_cost < dp[new_mask][v]:
                        dp[new_mask][v] = new_cost
        
        full_mask = N - 1
        ans = INF
        
        # finish at any city u and return to 0
        for u in range(n):
            if dp[full_mask][u] == INF:
                continue
            ans = min(ans, dp[full_mask][u] + cost[u][0])
        
        return ans
