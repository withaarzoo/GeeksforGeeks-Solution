class Solution:
    def countSquare(self, mat, x):
        n = len(mat)
        m = len(mat[0])
        
        # Build prefix sum matrix
        prefix = [[0]*m for _ in range(n)]
        
        for i in range(n):
            for j in range(m):
                prefix[i][j] = mat[i][j]
                
                if i > 0:
                    prefix[i][j] += prefix[i-1][j]
                if j > 0:
                    prefix[i][j] += prefix[i][j-1]
                if i > 0 and j > 0:
                    prefix[i][j] -= prefix[i-1][j-1]
        
        count = 0
        
        # Try all square sizes
        for i in range(n):
            for j in range(m):
                size = 1
                while i + size - 1 < n and j + size - 1 < m:
                    r = i + size - 1
                    c = j + size - 1
                    
                    total = prefix[r][c]
                    
                    if i > 0:
                        total -= prefix[i-1][c]
                    if j > 0:
                        total -= prefix[r][j-1]
                    if i > 0 and j > 0:
                        total += prefix[i-1][j-1]
                    
                    if total == x:
                        count += 1
                        
                    size += 1
        
        return count