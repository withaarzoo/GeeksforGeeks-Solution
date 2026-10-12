class Solution:
    def minSquares(self, n, m):
        if n < m:
            n, m = m, n
        ans = 0
        while m > 0:
            ans += n // m
            n, m = m, n % m
        return ans