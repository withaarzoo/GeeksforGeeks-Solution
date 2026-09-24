class Solution:
    def maxStackHeight(self, r, h):
        n = len(r)
        discs = [(r[i], h[i]) for i in range(n)]
        discs.sort(key=lambda x: (x[0], -x[1]))
        MAXH = 1001
        bit = [0] * (MAXH + 2)
        def update(idx, val):
            while idx <= MAXH:
                bit[idx] = max(bit[idx], val)
                idx += idx & -idx
        def query(idx):
            res = 0
            while idx > 0:
                res = max(res, bit[idx])
                idx -= idx & -idx
            return res
        ans = 0
        for rad, ht in discs:
            best = query(ht - 1)
            cur = best + ht
            ans = max(ans, cur)
            update(ht, cur)
        return ans