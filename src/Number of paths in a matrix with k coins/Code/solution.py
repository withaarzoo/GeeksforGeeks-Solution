class Solution:
    def numberOfPath(self, mat, k):
        n, m = len(mat), len(mat[0])
        # dp[i][j][s] = ways to reach (i,j) with sum s
        dp = [[[0]*(k+1) for _ in range(m)] for __ in range(n)]
        
        if mat[0][0] <= k:
            dp[0][0][mat[0][0]] = 1
        
        for i in range(n):
            for j in range(m):
                val = mat[i][j]
                if i == 0 and j == 0:
                    continue
                for s in range(val, k+1):
                    ways = 0
                    if i > 0:
                        ways += dp[i-1][j][s - val]  # from top
                    if j > 0:
                        ways += dp[i][j-1][s - val]  # from left
                    dp[i][j][s] = ways
        return dp[n-1][m-1][k]
