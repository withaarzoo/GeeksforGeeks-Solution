class Solution:
    def minTime(self, duration, dependencies):
        n = len(duration)
        adj = [[] for _ in range(n)]
        indeg = [0] * n
        for u, v in dependencies:
            adj[u].append(v)
            indeg[v] += 1
        finish = duration[:]
        from collections import deque
        q = deque(i for i in range(n) if indeg[i] == 0)
        cnt = 0
        while q:
            u = q.popleft()
            cnt += 1
            for v in adj[u]:
                finish[v] = max(finish[v], finish[u] + duration[v])
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        if cnt < n:
            return -1
        return max(finish)