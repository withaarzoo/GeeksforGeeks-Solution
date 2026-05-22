class Solution:
    
    # DFS function to mark connected 1s
    def dfs(self, row, col, grid, vis, n, m):
        
        # Mark current cell visited
        vis[row][col] = True
        
        # Direction arrays
        dr = [-1, 1, 0, 0]
        dc = [0, 0, -1, 1]
        
        # Explore all 4 directions
        for i in range(4):
            
            nr = row + dr[i]
            nc = col + dc[i]
            
            # Check boundaries and valid unvisited 1
            if (0 <= nr < n and
                0 <= nc < m and
                grid[nr][nc] == 1 and
                not vis[nr][nc]):
                
                self.dfs(nr, nc, grid, vis, n, m)
    
    def cntOnes(self, grid):
        
        n = len(grid)
        m = len(grid[0])
        
        # Visited matrix
        vis = [[False for _ in range(m)] for _ in range(n)]
        
        # Traverse first and last column
        for i in range(n):
            
            if grid[i][0] == 1 and not vis[i][0]:
                self.dfs(i, 0, grid, vis, n, m)
            
            if grid[i][m - 1] == 1 and not vis[i][m - 1]:
                self.dfs(i, m - 1, grid, vis, n, m)
        
        # Traverse first and last row
        for j in range(m):
            
            if grid[0][j] == 1 and not vis[0][j]:
                self.dfs(0, j, grid, vis, n, m)
            
            if grid[n - 1][j] == 1 and not vis[n - 1][j]:
                self.dfs(n - 1, j, grid, vis, n, m)
        
        count = 0
        
        # Count all trapped 1s
        for i in range(n):
            for j in range(m):
                
                if grid[i][j] == 1 and not vis[i][j]:
                    count += 1
        
        return count