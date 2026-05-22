class Solution {

    // DFS function to mark connected 1s
    void dfs(int row, int col,
            int[][] grid,
            boolean[][] vis,
            int n, int m) {

        // Mark current cell visited
        vis[row][col] = true;

        // Direction arrays
        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        // Explore all 4 directions
        for (int i = 0; i < 4; i++) {

            int nr = row + dr[i];
            int nc = col + dc[i];

            // Check valid unvisited 1
            if (nr >= 0 && nr < n &&
                    nc >= 0 && nc < m &&
                    grid[nr][nc] == 1 &&
                    !vis[nr][nc]) {

                dfs(nr, nc, grid, vis, n, m);
            }
        }
    }

    int cntOnes(int[][] grid) {

        int n = grid.length;
        int m = grid[0].length;

        // Visited matrix
        boolean[][] vis = new boolean[n][m];

        // Check first and last column
        for (int i = 0; i < n; i++) {

            if (grid[i][0] == 1 && !vis[i][0]) {
                dfs(i, 0, grid, vis, n, m);
            }

            if (grid[i][m - 1] == 1 && !vis[i][m - 1]) {
                dfs(i, m - 1, grid, vis, n, m);
            }
        }

        // Check first and last row
        for (int j = 0; j < m; j++) {

            if (grid[0][j] == 1 && !vis[0][j]) {
                dfs(0, j, grid, vis, n, m);
            }

            if (grid[n - 1][j] == 1 && !vis[n - 1][j]) {
                dfs(n - 1, j, grid, vis, n, m);
            }
        }

        int count = 0;

        // Count trapped 1s
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {

                if (grid[i][j] == 1 && !vis[i][j]) {
                    count++;
                }
            }
        }

        return count;
    }
}