from collections import deque

class Solution:
    def fill(self, grid):
        if not grid:
            return
        n, m = len(grid), len(grid[0])
        q = deque()

        def push_if_o(r, c):
            if 0 <= r < n and 0 <= c < m and grid[r][c] == 'O':
                grid[r][c] = 'T'
                q.append((r, c))

        # Step 1: Mark all border-connected 'O's
        for i in range(n):
            push_if_o(i, 0)
            push_if_o(i, m - 1)
        for j in range(m):
            push_if_o(0, j)
            push_if_o(n - 1, j)

        dirs = [(-1,0),(1,0),(0,-1),(0,1)]
        # Step 2: BFS
        while q:
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == 'O':
                    grid[nr][nc] = 'T'
                    q.append((nr, nc))

        # Step 3: Flip and restore
        for r in range(n):
            for c in range(m):
                if grid[r][c] == 'O':
                    grid[r][c] = 'X'
                elif grid[r][c] == 'T':
                    grid[r][c] = 'O'
