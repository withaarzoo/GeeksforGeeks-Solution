class Solution:
    def ways(self, x: int, y: int) -> int:
        MOD = 10**9 + 7
        dp = [[0] * (y + 1) for _ in range(x + 1)]
        for i in range(x + 1):
            dp[i][0] = 1
        for j in range(y + 1):
            dp[0][j] = 1
        for i in range(1, x + 1):
            for j in range(1, y + 1):
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD
        return dp[x][y]