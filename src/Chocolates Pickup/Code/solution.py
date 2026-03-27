class Solution:
    def maxChocolate(self, grid):
        n = len(grid)
        m = len(grid[0])
        
        dp = [[0]*m for _ in range(m)]
        
        # Base case
        for c1 in range(m):
            for c2 in range(m):
                if c1 == c2:
                    dp[c1][c2] = grid[n-1][c1]
                else:
                    dp[c1][c2] = grid[n-1][c1] + grid[n-1][c2]
        
        # Bottom-up DP
        for row in range(n-2, -1, -1):
            temp = [[0]*m for _ in range(m)]
            
            for c1 in range(m):
                for c2 in range(m):
                    
                    maxi = 0
                    
                    for d1 in [-1, 0, 1]:
                        for d2 in [-1, 0, 1]:
                            
                            nc1 = c1 + d1
                            nc2 = c2 + d2
                            
                            if 0 <= nc1 < m and 0 <= nc2 < m:
                                val = dp[nc1][nc2]
                                
                                if c1 == c2:
                                    val += grid[row][c1]
                                else:
                                    val += grid[row][c1] + grid[row][c2]
                                
                                maxi = max(maxi, val)
                    
                    temp[c1][c2] = maxi
            
            dp = temp
        
        return dp[0][m-1]