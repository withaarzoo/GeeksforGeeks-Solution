import heapq

class Solution:
    def countPaths(self, V, edges):
        """
        Count number of shortest paths from node 0 to node V-1 in an undirected weighted graph.
        edges: list of [u, v, w]
        """
        MOD = 10**9 + 7
        INF = 10**30
        # build adjacency list
        adj = [[] for _ in range(V)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))
        dist = [INF] * V
        ways = [0] * V
        dist[0] = 0
        ways[0] = 1
        heap = [(0, 0)]  # (distance, node)
        while heap:
            d, node = heapq.heappop(heap)
            if d > dist[node]:
                continue
            for nei, w in adj[node]:
                nd = d + w
                if nd < dist[nei]:
                    dist[nei] = nd
                    ways[nei] = ways[node]
                    heapq.heappush(heap, (nd, nei))
                elif nd == dist[nei]:
                    ways[nei] = (ways[nei] + ways[node]) % MOD
        return ways[V-1] % MOD
