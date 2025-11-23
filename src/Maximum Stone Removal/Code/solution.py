class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def unite(self, a: int, b: int) -> None:
        a = self.find(a)
        b = self.find(b)
        if a == b:
            return

        if self.rank[a] < self.rank[b]:
            self.parent[a] = b
        elif self.rank[b] < self.rank[a]:
            self.parent[b] = a
        else:
            self.parent[b] = a
            self.rank[a] += 1


class Solution:
    def maxRemove(self, stones):
        n = len(stones)
        dsu = DSU(n)

        row_rep = {}
        col_rep = {}

        for i, (r, c) in enumerate(stones):
            if r in row_rep:
                dsu.unite(i, row_rep[r])
            else:
                row_rep[r] = i

            if c in col_rep:
                dsu.unite(i, col_rep[c])
            else:
                col_rep[c] = i

        components = 0
        for i in range(n):
            if dsu.find(i) == i:
                components += 1

        return n - components
