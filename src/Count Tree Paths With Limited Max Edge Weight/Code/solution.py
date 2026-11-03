class Solution:
    def maximumWeight(self, n, edges, queries):
        edges.sort(key=lambda e: e[2])
        q = len(queries)
        sortedQ = [(queries[i], i) for i in range(q)]
        sortedQ.sort()
        parent = list(range(n + 1))
        sz = [1] * (n + 1)
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        paths = 0
        ans = [0] * q
        j = 0
        for x, idx in sortedQ:
            while j < len(edges) and edges[j][2] <= x:
                u, v = edges[j][0], edges[j][1]
                pu, pv = find(u), find(v)
                if pu != pv:
                    paths += sz[pu] * sz[pv]
                    if sz[pu] < sz[pv]:
                        pu, pv = pv, pu
                    parent[pv] = pu
                    sz[pu] += sz[pv]
                j += 1
            ans[idx] = paths
        return ans