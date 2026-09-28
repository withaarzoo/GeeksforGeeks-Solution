class Solution:
    def processQueries(self, arr: list[int], queries: list[list[int]]) -> list[int]:
        n = len(arr)
        tree = [0] * (4 * n)

        def gcd(a, b):
            while b:
                a, b = b, a % b
            return a

        def build(node, start, end):
            if start == end:
                tree[node] = arr[start]
                return
            mid = (start + end) // 2
            build(2 * node, start, mid)
            build(2 * node + 1, mid + 1, end)
            tree[node] = gcd(tree[2 * node], tree[2 * node + 1])

        def update(node, start, end, idx, val):
            if start == end:
                tree[node] = val
                return
            mid = (start + end) // 2
            if idx <= mid:
                update(2 * node, start, mid, idx, val)
            else:
                update(2 * node + 1, mid + 1, end, idx, val)
            tree[node] = gcd(tree[2 * node], tree[2 * node + 1])

        def query(node, start, end, l, r):
            if r < start or end < l:
                return 0
            if l <= start and end <= r:
                return tree[node]
            mid = (start + end) // 2
            left = query(2 * node, start, mid, l, r)
            right = query(2 * node + 1, mid + 1, end, l, r)
            return gcd(left, right)

        build(1, 0, n - 1)
        ans = []
        for q in queries:
            if q[0] == 0:
                ans.append(query(1, 0, n - 1, q[1], q[2]))
            else:
                update(1, 0, n - 1, q[1], q[2])
        return ans