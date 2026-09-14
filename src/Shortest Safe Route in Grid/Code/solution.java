
class Solution {
    int shortestPath(int[][] mat) {
        int n = mat.length;                         // Number of rows.
        int m = mat[0].length;                      // Number of columns.

        boolean[][] unsafe = new boolean[n][m];
        // unsafe[r][c] tells me whether this cell cannot be used.

        int[] dr = {-1, 1, 0, 0};
        // Row changes for up, down, left, and right.

        int[] dc = {0, 0, -1, 1};
        // Column changes for up, down, left, and right.

        // I first mark every landmine and its four direct neighbors as unsafe.
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < m; c++) {
                if (mat[r][c] == 0) {
                    unsafe[r][c] = true;
                    // The landmine itself is unsafe.

                    for (int d = 0; d < 4; d++) {
                        int nr = r + dr[d];
                        int nc = c + dc[d];
                        // Calculate one neighboring position.

                        if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                            unsafe[nr][nc] = true;
                            // Direct neighbors of a landmine are also unsafe.
                        }
                    }
                }
            }
        }

        boolean[][] visited = new boolean[n][m];
        // This prevents processing the same cell repeatedly.

        Queue<int[]> q = new ArrayDeque<>();
        // Each element stores row, column, and route length.

        // Every safe cell in the first column can be a starting point.
        // I use distance 1 because the starting cell counts in the route length.
        for (int r = 0; r < n; r++) {
            if (mat[r][0] == 1 && !unsafe[r][0]) {
                q.offer(new int[]{r, 0, 1});
                // Start the route with length 1.

                visited[r][0] = true;
                // Mark immediately to avoid duplicate queue entries.
            }
        }

        // BFS explores all shorter routes before longer routes.
        while (!q.isEmpty()) {
            int[] current = q.poll();
            // Remove the next cell from the queue.

            int r = current[0];                     // Current row.
            int c = current[1];                     // Current column.
            int dist = current[2];                  // Number of cells in the route so far.

            if (c == m - 1) {
                return dist;
                // The first rightmost-column cell reached gives the minimum route length.
            }

            // Try all four possible movements.
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                // Calculate the next cell.

                if (nr >= 0 && nr < n &&
                    nc >= 0 && nc < m &&
                    mat[nr][nc] == 1 &&
                    !unsafe[nr][nc] &&
                    !visited[nr][nc]) {

                    visited[nr][nc] = true;
                    // Mark before inserting so this cell is added only once.

                    q.offer(new int[]{nr, nc, dist + 1});
                    // The new cell increases the route length by one.
                }
            }
        }

        return -1;
        // BFS finished without finding a safe route to the last column.
    }
}

