class Solution:
    def articulationPoints(self, V, edges):
        adj = [[] for _ in range(V)]

        # Build adjacency list
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        visited = [False] * V
        tin = [-1] * V
        low = [-1] * V
        mark = [False] * V
        timer = [0]

        def dfs(node, parent):
            visited[node] = True
            tin[node] = low[node] = timer[0]
            timer[0] += 1
            child_count = 0

            for neighbor in adj[node]:

                # Ignore parent edge
                if neighbor == parent:
                    continue

                # Already visited node
                if visited[neighbor]:
                    low[node] = min(low[node], tin[neighbor])
                else:
                    dfs(neighbor, node)

                    # Update low value
                    low[node] = min(low[node], low[neighbor])

                    # Articulation point condition for non-root
                    if low[neighbor] >= tin[node] and parent != -1:
                        mark[node] = True

                    child_count += 1

            # Root node condition
            if parent == -1 and child_count > 1:
                mark[node] = True

        # DFS for disconnected graph
        for i in range(V):
            if not visited[i]:
                dfs(i, -1)

        ans = []

        for i in range(V):
            if mark[i]:
                ans.append(i)

        return ans if ans else [-1]