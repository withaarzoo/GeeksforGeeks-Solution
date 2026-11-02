class Solution:
    def largestSumCycle(self, edge):
        n = len(edge)
        indeg = [0] * n
        for i in range(n):
            if edge[i] != -1:
                indeg[edge[i]] += 1
        from collections import deque
        q = deque()
        vis = [False] * n
        for i in range(n):
            if indeg[i] == 0:
                q.append(i)
                vis[i] = True
        while q:
            u = q.popleft()
            v = edge[u]
            if v != -1:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
                    vis[v] = True
        ans = -1
        for i in range(n):
            if not vis[i]:
                s = 0
                cur = i
                while not vis[cur]:
                    vis[cur] = True
                    s += cur
                    cur = edge[cur]
                ans = max(ans, s)
        return ans