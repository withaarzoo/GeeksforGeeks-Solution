from collections import deque

class Solution:
    # BFS from start: returns farthest node and list of nodes in the component
    def bfs_collect(self, start, adj):
        n = len(adj)
        dist = [-1] * n
        q = deque([start])
        dist[start] = 0
        farthest = start
        comp = []
        while q:
            u = q.popleft()
            comp.append(u)
            if dist[u] > dist[farthest]:
                farthest = u
            for v in adj[u]:
                if dist[v] == -1:
                    dist[v] = dist[u] + 1
                    q.append(v)
        return farthest, comp

    # BFS from src to compute maximum distance reachable (diameter endpoint distance)
    def bfs_maxdist(self, src, adj):
        n = len(adj)
        dist = [-1] * n
        q = deque([src])
        dist[src] = 0
        maxd = 0
        while q:
            u = q.popleft()
            if dist[u] > maxd:
                maxd = dist[u]
            for v in adj[u]:
                if dist[v] == -1:
                    dist[v] = dist[u] + 1
                    q.append(v)
        return maxd

    def diameter(self, V, edges):
        if V <= 1:
            return 0
        adj = [[] for _ in range(V)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        processed = [False] * V
        answer = 0
        for i in range(V):
            if processed[i]:
                continue
            u, comp_nodes = self.bfs_collect(i, adj)
            for node in comp_nodes:
                processed[node] = True
            comp_diam = self.bfs_maxdist(u, adj)
            if comp_diam > answer:
                answer = comp_diam
        return answer
