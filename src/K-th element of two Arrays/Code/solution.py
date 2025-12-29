class Solution:
    def kthElement(self, a, b, k):

        # Always binary search on smaller array
        if len(a) > len(b):
            return self.kthElement(b, a, k)

        n, m = len(a), len(b)
        low = max(0, k - m)
        high = min(k, n)

        while low <= high:
            cutA = (low + high) // 2
            cutB = k - cutA

            leftA  = float('-inf') if cutA == 0 else a[cutA - 1]
            leftB  = float('-inf') if cutB == 0 else b[cutB - 1]
            rightA = float('inf') if cutA == n else a[cutA]
            rightB = float('inf') if cutB == m else b[cutB]

            if leftA <= rightB and leftB <= rightA:
                return max(leftA, leftB)
            elif leftA > rightB:
                high = cutA - 1
            else:
                low = cutA + 1

        return -1
