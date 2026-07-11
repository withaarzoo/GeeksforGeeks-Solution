class Solution {

    int n, m;

    // Four possible directions
    int[] dx = { -1, 1, 0, 0 };
    int[] dy = { 0, 0, -1, 1 };

    // DFS returns longest distance from current cell
    int dfs(int[][] mat, boolean[][] vis, int x, int y, int xd, int yd) {

        // Destination reached
        if (x == xd && y == yd)
            return 0;

        // Mark current cell as visited
        vis[x][y] = true;

        int ans = -1;

        // Explore all four directions
        for (int k = 0; k < 4; k++) {

            int nx = x + dx[k];
            int ny = y + dy[k];

            // Check whether next cell is valid
            if (nx >= 0 && nx < n &&
                    ny >= 0 && ny < m &&
                    mat[nx][ny] == 1 &&
                    !vis[nx][ny]) {

                int cur = dfs(mat, vis, nx, ny, xd, yd);

                // Update answer if destination is reachable
                if (cur != -1)
                    ans = Math.max(ans, cur + 1);
            }
        }

        // Backtrack
        vis[x][y] = false;

        return ans;
    }

    public int longestPath(int[][] mat, int xs, int ys, int xd, int yd) {

        n = mat.length;
        m = mat[0].length;

        // Source or destination is blocked
        if (mat[xs][ys] == 0 || mat[xd][yd] == 0)
            return -1;

        boolean[][] vis = new boolean[n][m];

        return dfs(mat, vis, xs, ys, xd, yd);
    }
}