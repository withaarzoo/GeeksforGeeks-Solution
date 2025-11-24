class Solution:
    def secondMST(self, V, edges):
        E = len(edges)
        if E == 0:
            return -1

        # Copy edges into a simple list (u, v, w)
        arr = [(u, v, w) for (u, v, w) in edges]

        # DSU (Union-Find)
        parent = list(range(V))
        rank = [0] * V

        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def unite(a, b):
            a, b = find(a), find(b)
            if a == b:
                return False
            if rank[a] < rank[b]:
                a, b = b, a
            parent[b] = a
            if rank[a] == rank[b]:
                rank[a] += 1
            return True

        # Sort edges by weight
        arr.sort(key=lambda e: e[2])

        # First MST
        mst_weight = 0
        mst_indices = []

        for i, (u, v, w) in enumerate(arr):
            if unite(u, v):
                mst_weight += w
                mst_indices.append(i)

        if len(mst_indices) != V - 1:
            return -1  # graph disconnected

        INF = 10**18
        best = INF

        # For every MST edge, recompute MST without it
        for banned in mst_indices:
            # fresh DSU
            parent = list(range(V))
            rank = [0] * V

            def find2(x):
                if parent[x] != x:
                    parent[x] = find2(parent[x])
                return parent[x]

            def unite2(a, b):
                a, b = find2(a), find2(b)
                if a == b:
                    return False
                if rank[a] < rank[b]:
                    a, b = b, a
                parent[b] = a
                if rank[a] == rank[b]:
                    rank[a] += 1
                return True

            cur_weight = 0
            used = 0

            for i, (u, v, w) in enumerate(arr):
                if i == banned:
                    continue
                if unite2(u, v):
                    cur_weight += w
                    used += 1
                    if cur_weight >= best:
                        break

            if used == V - 1 and cur_weight > mst_weight:
                best = min(best, cur_weight)

        return -1 if best == INF else best
