class Solution:
    
    # Function to calculate GCD
    def gcd(self, a, b):
        while b:
            a, b = b, a % b
        return a

    # Function to calculate LCM
    def lcm(self, a, b):
        return (a // self.gcd(a, b)) * b

    # Build segment tree
    def build(self, idx, low, high, arr):

        # Leaf node
        if low == high:
            self.seg[idx] = arr[low]
            return

        mid = (low + high) // 2

        # Build left subtree
        self.build(2 * idx + 1, low, mid, arr)

        # Build right subtree
        self.build(2 * idx + 2, mid + 1, high, arr)

        # Store LCM
        self.seg[idx] = self.lcm(
            self.seg[2 * idx + 1],
            self.seg[2 * idx + 2]
        )

    # Update one index
    def update(self, idx, low, high, pos, val):

        if low == high:
            self.seg[idx] = val
            return

        mid = (low + high) // 2

        if pos <= mid:
            self.update(2 * idx + 1, low, mid, pos, val)
        else:
            self.update(2 * idx + 2, mid + 1, high, pos, val)

        # Recalculate current node
        self.seg[idx] = self.lcm(
            self.seg[2 * idx + 1],
            self.seg[2 * idx + 2]
        )

    # Range query
    def query(self, idx, low, high, l, r):

        # Outside range
        if high < l or low > r:
            return 1

        # Completely inside
        if low >= l and high <= r:
            return self.seg[idx]

        mid = (low + high) // 2

        left = self.query(2 * idx + 1, low, mid, l, r)
        right = self.query(2 * idx + 2, mid + 1, high, l, r)

        return self.lcm(left, right)

    def RangeLCMQuery(self, arr, queries):

        n = len(arr)

        # Segment tree array
        self.seg = [1] * (4 * n)

        # Build tree
        self.build(0, 0, n - 1, arr)

        ans = []

        # Process queries
        for q in queries:

            # Update query
            if q[0] == 1:
                self.update(0, 0, n - 1, q[1], q[2])

            # Range query
            else:
                ans.append(
                    self.query(0, 0, n - 1, q[1], q[2])
                )

        return ans