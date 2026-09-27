class Solution:
    def longestPath(self, s, edges):
        n = len(s)
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        red_max = [0] * (n + 1)
        blue_max = [0] * (n + 1)
        vis = [False] * (n + 1)
        def process(col, mx):
            for i in range(1, n + 1):
                vis[i] = False
            for i in range(1, n + 1):
                if vis[i] or s[i - 1] != col:
                    continue
                comp = []
                st = [i]
                vis[i] = True
                while st:
                    u = st.pop()
                    comp.append(u)
                    for v in adj[u]:
                        if not vis[v] and s[v - 1] == col:
                            vis[v] = True
                            st.append(v)
                sz = len(comp)
                id_map = {comp[j]: j for j in range(sz)}
                ladj = [[] for _ in range(sz)]
                for u in comp:
                    for v in adj[u]:
                        if s[v - 1] == col and v in id_map:
                            ladj[id_map[u]].append(id_map[v])
                def bfs(start):
                    dist = [-1] * sz
                    q = [start]
                    dist[start] = 0
                    far = start
                    head = 0
                    while head < len(q):
                        u = q[head]
                        head += 1
                        if dist[u] > dist[far]:
                            far = u
                        for v in ladj[u]:
                            if dist[v] == -1:
                                dist[v] = dist[u] + 1
                                q.append(v)
                    return far, dist
                far1, _ = bfs(0)
                far2, d2 = bfs(far1)
                far3, d3 = bfs(far2)
                for j in range(sz):
                    mx[comp[j]] = max(d2[j], d3[j])
        process('R', red_max)
        process('B', blue_max)
        ans = 1
        for i in range(1, n + 1):
            if s[i - 1] == 'R':
                ans = max(ans, red_max[i] + 1)
            else:
                ans = max(ans, blue_max[i] + 1)
        for u, v in edges:
            if s[u - 1] != s[v - 1]:
                if s[u - 1] == 'R':
                    ans = max(ans, red_max[u] + 1 + blue_max[v] + 1)
                else:
                    ans = max(ans, blue_max[u] + 1 + red_max[v] + 1)
        return ans