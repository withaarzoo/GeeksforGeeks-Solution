class Solution:
    def getMaxWeight(self, s):
        n = len(s)
        if n == 0:
            return 0
        m = n - 1
        gain = [1 if s[i] == s[i + 1] else 2 for i in range(m)]
        dp = [0] * (m + 1)
        for i in range(1, m + 1):
            dp[i] = max(dp[i - 1], (dp[i - 2] if i >= 2 else 0) + gain[i - 1])
        return n + dp[m]