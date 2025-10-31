from collections import deque

class Solution:
    def shortCycle(self, V, edges):
        # build adjacency list
        adj = [[] for _ in range(V)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        ans = float('inf')

        # BFS from every vertex
        for s in range(V):
            dist = [-1] * V
            parent = [-1] * V
            dq = deque()
            dist[s] = 0
            dq.append(s)

            while dq:
                u = dq.popleft()
                for v in adj[u]:
                    if dist[v] == -1:
                        dist[v] = dist[u] + 1
                        parent[v] = u
                        dq.append(v)
                    elif parent[u] != v:
                        # visited and not parent => cycle found
                        cycle_len = dist[u] + dist[v] + 1
                        if cycle_len < ans:
                            ans = cycle_len

        return -1 if ans == float('inf') else ans
