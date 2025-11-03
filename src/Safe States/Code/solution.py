from collections import deque

class Solution:
    def safeNodes(self, V, edges):
        revGraph = [[] for _ in range(V)]
        outdeg = [0] * V
        # Build reverse graph and out-degree counts
        for e in edges:
            u, v = e[0], e[1]
            if u < 0 or u >= V or v < 0 or v >= V:
                continue
            revGraph[v].append(u)
            outdeg[u] += 1
        q = deque()
        for i in range(V):
            if outdeg[i] == 0:
                q.append(i)
        safe = []
        while q:
            node = q.popleft()
            safe.append(node)
            for parent in revGraph[node]:
                outdeg[parent] -= 1
                if outdeg[parent] == 0:
                    q.append(parent)
        safe.sort()
        return safe
