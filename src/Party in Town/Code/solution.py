from collections import deque

class Solution:
    def partyHouse(self, adj: list[list[int]]) -> int:
        n = len(adj)
        if n == 1:
            return 0
        
        # returns (farthest node index, distance)
        def bfs(start):
            dist = [-1] * n
            q = deque([start])
            dist[start] = 0
            far = start
            while q:
                u = q.popleft()
                for v in adj[u]:
                    idx = v - 1               # convert 1-based house number to 0-based index
                    if dist[idx] == -1:
                        dist[idx] = dist[u] + 1
                        q.append(idx)
                        if dist[idx] > dist[far]:
                            far = idx
            return far, dist[far]
        
        u, _ = bfs(0)
        _, diameter = bfs(u)
        return (diameter + 1) // 2