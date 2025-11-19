import heapq

class Solution:
    def minCostPath(self, mat):
        n = len(mat)
        if n == 0:
            return 0
        m = len(mat[0])
        if n == 1 and m == 1:
            return 0
        
        INF = 10**18
        dist = [[INF]*m for _ in range(n)]
        dist[0][0] = 0
        # heap entries: (cost, r, c)
        heap = [(0, 0, 0)]
        dr = [1, -1, 0, 0]
        dc = [0, 0, 1, -1]
        
        while heap:
            cost, r, c = heapq.heappop(heap)
            # stale entry check
            if cost != dist[r][c]:
                continue
            if r == n-1 and c == m-1:
                return cost
            for k in range(4):
                nr, nc = r + dr[k], c + dc[k]
                if nr < 0 or nr >= n or nc < 0 or nc >= m:
                    continue
                edge = abs(mat[r][c] - mat[nr][nc])
                newCost = max(cost, edge)
                if newCost < dist[nr][nc]:
                    dist[nr][nc] = newCost
                    heapq.heappush(heap, (newCost, nr, nc))
        return dist[n-1][m-1]
