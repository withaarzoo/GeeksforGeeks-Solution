class Solution:
    def minHeightRoot(self, V, edges):
        if V == 1:
            return [0]

        from collections import deque

        adj = [[] for _ in range(V)]
        degree = [0] * V

        # Build graph
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            degree[u] += 1
            degree[v] += 1

        # Initial leaves
        q = deque()
        for i in range(V):
            if degree[i] == 1:
                q.append(i)

        remaining_nodes = V

        # Trim leaves
        while remaining_nodes > 2:
            size = len(q)
            remaining_nodes -= size

            for _ in range(size):
                leaf = q.popleft()

                for neighbor in adj[leaf]:
                    degree[neighbor] -= 1

                    if degree[neighbor] == 1:
                        q.append(neighbor)

        return list(q)