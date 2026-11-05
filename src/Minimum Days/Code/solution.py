class Solution:
    def getMinimumDays(self, s: str, p: list[int]) -> int:
        n = len(s)
        day = [0] * n
        for i in range(n):
            day[p[i]] = i + 1
        ans = 0
        for i in range(n - 1):
            if s[i] == s[i + 1]:
                ans = max(ans, min(day[i], day[i + 1]))
        return ans