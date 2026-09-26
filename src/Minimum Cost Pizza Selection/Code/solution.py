class Solution:
    def minimumCost(self, x, s, m, l, cs, cm, cl):
        mx = max(s, m, l)
        MAX = x + mx
        INF = 10**9
        dp = [INF] * (MAX + 1)
        dp[0] = 0
        for i in range(MAX + 1):
            if dp[i] == INF:
                continue
            if i + s <= MAX:
                dp[i + s] = min(dp[i + s], dp[i] + cs)
            if i + m <= MAX:
                dp[i + m] = min(dp[i + m], dp[i] + cm)
            if i + l <= MAX:
                dp[i + l] = min(dp[i + l], dp[i] + cl)
        ans = INF
        for i in range(x, MAX + 1):
            ans = min(ans, dp[i])
        return ans