class Solution:
    def longIncPath(self, matrix, n, m):
        memo = [[0] * m for _ in range(n)]
        dirs = [(-1,0),(1,0),(0,-1),(0,1)]
        def dfs(i, j):
            if memo[i][j] != 0:
                return memo[i][j]
            best = 1
            for di, dj in dirs:
                ni, nj = i + di, j + dj
                if 0 <= ni < n and 0 <= nj < m and matrix[ni][nj] > matrix[i][j]:
                    best = max(best, 1 + dfs(ni, nj))
            memo[i][j] = best
            return best
        ans = 0
        for i in range(n):
            for j in range(m):
                ans = max(ans, dfs(i, j))
        return ans