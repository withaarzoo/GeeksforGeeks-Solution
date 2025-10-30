import java.util.*;

class Solution {
    public void fill(char[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        Queue<int[]> q = new LinkedList<>();

        // Helper to push a cell into queue if it’s 'O'
        voidPush(grid, n, m, q, 0, 0); // dummy call for syntax clarity, not used

        // Step 1: Push all border 'O's
        for (int i = 0; i < n; i++) {
            pushIfO(grid, n, m, q, i, 0);
            pushIfO(grid, n, m, q, i, m - 1);
        }
        for (int j = 0; j < m; j++) {
            pushIfO(grid, n, m, q, 0, j);
            pushIfO(grid, n, m, q, n - 1, j);
        }

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        // Step 2: BFS from all border-connected 'O's
        while (!q.isEmpty()) {
            int[] cell = q.poll();
            int r = cell[0], c = cell[1];
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 'O') {
                    grid[nr][nc] = 'T';
                    q.offer(new int[] { nr, nc });
                }
            }
        }

        // Step 3: Flip surrounded O -> X and restore T -> O
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 'O')
                    grid[i][j] = 'X';
                else if (grid[i][j] == 'T')
                    grid[i][j] = 'O';
            }
        }
    }

    private void pushIfO(char[][] grid, int n, int m, Queue<int[]> q, int r, int c) {
        if (r >= 0 && r < n && c >= 0 && c < m && grid[r][c] == 'O') {
            grid[r][c] = 'T';
            q.offer(new int[] { r, c });
        }
    }
}
