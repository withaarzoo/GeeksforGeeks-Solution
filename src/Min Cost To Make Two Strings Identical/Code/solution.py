class Solution:
    def findMinCost(self, s1: str, s2: str, costS1: int, costS2: int) -> int:
        n, m = len(s1), len(s2)
        if n < m:
            s1, s2 = s2, s1
            n, m = m, n
            costS1, costS2 = costS2, costS1
        prev = [0] * (m + 1)
        curr = [0] * (m + 1)
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s1[i - 1] == s2[j - 1]:
                    curr[j] = prev[j - 1] + 1
                else:
                    curr[j] = max(prev[j], curr[j - 1])
            prev, curr = curr, prev
        lcs = prev[m]
        return (n - lcs) * costS1 + (m - lcs) * costS2