import heapq

class Solution:
    def shortestPath(self, V, a, b, edges):
        """
        edges: list of [u, v, w1, w2]
        """
        INF = 10**30
        N = 2 * V
        adj = [[] for _ in range(N)]

        # Build the layered graph
        for u, v, w1, w2 in edges:
            # straight edges
            adj[u].append((v, w1))
            adj[v].append((u, w1))
            adj[u + V].append((v + V, w1))
            adj[v + V].append((u + V, w1))
            # curved edges (from layer0 to layer1)
            adj[u].append((v + V, w2))
            adj[v].append((u + V, w2))

        # Dijkstra
        dist = [INF] * N
        dist[a] = 0
        pq = [(0, a)]
        while pq:
            d, node = heapq.heappop(pq)
            if d != dist[node]:
                continue
            for nxt, w in adj[node]:
                nd = d + w
                if nd < dist[nxt]:
                    dist[nxt] = nd
                    heapq.heappush(pq, (nd, nxt))

        ans = min(dist[b], dist[b + V])
        return -1 if ans >= INF else ans
