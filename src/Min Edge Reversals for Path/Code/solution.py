class Solution:
    def minimumEdgeReversal(self, edges: list[list[int]], n: int, src: int, dst: int) -> int:
        # adjacency list: each entry is (neighbor, cost)
        adj = [[] for _ in range(n+1)]
        
        # for every original edge u->v add both directions
        for u, v in edges:
            adj[u].append((v, 0))  # keep original, cost 0
            adj[v].append((u, 1))  # reverse it, cost 1
        
        # distance array, INF means unreachable
        INF = 10**9
        dist = [INF] * (n+1)
        dist[src] = 0
        
        # 0-1 BFS deque
        from collections import deque
        dq = deque([src])
        
        while dq:
            u = dq.popleft()
            
            for v, cost in adj[u]:
                if dist[u] + cost < dist[v]:
                    dist[v] = dist[u] + cost
                    # cost 0 → push front, cost 1 → push back
                    if cost == 0:
                        dq.appendleft(v)
                    else:
                        dq.append(v)
        
        # if dst still INF we cannot reach it
        return -1 if dist[dst] == INF else dist[dst]