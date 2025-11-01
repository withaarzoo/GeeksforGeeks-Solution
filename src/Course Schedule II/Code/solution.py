from collections import deque

class Solution:
    def findOrder(self, n, prerequisites):
        # adjacency list and indegree
        adj = [[] for _ in range(n)]
        indeg = [0] * n
        for x, y in prerequisites:
            # to take x, must finish y first -> y -> x
            adj[y].append(x)
            indeg[x] += 1

        # start with all courses having indegree 0
        q = deque([i for i in range(n) if indeg[i] == 0])
        order = []

        while q:
            node = q.popleft()
            order.append(node)
            for nei in adj[node]:
                indeg[nei] -= 1
                if indeg[nei] == 0:
                    q.append(nei)

        # if we scheduled all courses, return order; else a cycle exists
        return order if len(order) == n else []
