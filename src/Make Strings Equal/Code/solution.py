class Solution:
    def minCost(self, s: str, t: str, transform: list, cost: list) -> int:
        ALPHA = 26
        INF = 10**12
        # dist[u][v] = min cost to transform u->v
        dist = [[INF]*ALPHA for _ in range(ALPHA)]
        for i in range(ALPHA):
            dist[i][i] = 0
        # add transforms
        for i in range(len(transform)):
            a = transform[i][0]
            b = transform[i][1]
            u = ord(a) - ord('a')
            v = ord(b) - ord('a')
            dist[u][v] = min(dist[u][v], cost[i])
        # Floyd-Warshall
        for k in range(ALPHA):
            for i in range(ALPHA):
                if dist[i][k] == INF: 
                    continue
                for j in range(ALPHA):
                    if dist[k][j] == INF:
                        continue
                    via = dist[i][k] + dist[k][j]
                    if via < dist[i][j]:
                        dist[i][j] = via
        if len(s) != len(t):
            return -1
        ans = 0
        for i in range(len(s)):
            if s[i] == t[i]:
                continue
            u = ord(s[i]) - ord('a')
            v = ord(t[i]) - ord('a')
            best = INF
            # try all possible final characters
            for c in range(ALPHA):
                if dist[u][c] < INF and dist[v][c] < INF:
                    best = min(best, dist[u][c] + dist[v][c])
            if best == INF:
                return -1
            ans += best
        return ans
