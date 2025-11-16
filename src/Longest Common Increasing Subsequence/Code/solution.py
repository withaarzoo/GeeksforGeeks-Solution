class Solution:
    def LCIS(self, a, b):
        # a: list[int], b: list[int]
        n, m = len(a), len(b)
        if n == 0 or m == 0:
            return 0

        # dp[j] = length of LCIS that ends with b[j]
        dp = [0] * m

        for i in range(n):
            current = 0  # best LCIS length for values < a[i]
            for j in range(m):
                if a[i] == b[j]:
                    # extend any sequence that ended with smaller value
                    if current + 1 > dp[j]:
                        dp[j] = current + 1
                elif a[i] > b[j]:
                    # b[j] is a candidate prefix
                    if dp[j] > current:
                        current = dp[j]
                # if a[i] < b[j], do nothing

        return max(dp) if dp else 0
