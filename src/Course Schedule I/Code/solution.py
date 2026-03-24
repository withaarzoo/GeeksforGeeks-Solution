from collections import deque

class Solution:
    def canFinish(self, n, prerequisites):
        adj = [[] for _ in range(n)]
        indegree = [0] * n

        # Build graph
        for x, y in prerequisites:
            adj[y].append(x)
            indegree[x] += 1

        q = deque()

        # Add nodes with 0 indegree
        for i in range(n):
            if indegree[i] == 0:
                q.append(i)

        count = 0

        # BFS
        while q:
            node = q.popleft()
            count += 1

            for nei in adj[node]:
                indegree[nei] -= 1
                if indegree[nei] == 0:
                    q.append(nei)

        return count == n