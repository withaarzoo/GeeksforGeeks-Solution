class Solution {
    public int countCoordinates(int[][] mat) {
        // Store the number of rows and columns.
        int n = mat.length;
        int m = mat[0].length;

        // These matrices store which towers can reach each station.
        boolean[][] reachP = new boolean[n][m];
        boolean[][] reachQ = new boolean[n][m];

        // These four pairs represent down, up, right, and left movement.
        int[] dr = { 1, -1, 0, 0 };
        int[] dc = { 0, 0, 1, -1 };

        // Build the source cells for Station P.
        java.util.ArrayDeque<int[]> stackP = new java.util.ArrayDeque<>();

        // Add every cell from the top row.
        for (int j = 0; j < m; j++) {
            if (!reachP[0][j]) {
                reachP[0][j] = true;
                stackP.push(new int[] { 0, j });
            }
        }

        // Add every cell from the left column.
        for (int i = 0; i < n; i++) {
            if (!reachP[i][0]) {
                reachP[i][0] = true;
                stackP.push(new int[] { i, 0 });
            }
        }

        // Run reverse DFS for Station P.
        while (!stackP.isEmpty()) {
            int[] cell = stackP.pop();
            int r = cell[0];
            int c = cell[1];

            // Check all four neighbouring cells.
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];

                // Skip invalid coordinates.
                if (nr < 0 || nr >= n || nc < 0 || nc >= m)
                    continue;

                // Skip cells already visited for Station P.
                if (reachP[nr][nc])
                    continue;

                // Reverse movement is allowed only to an equal or higher tower.
                if (mat[nr][nc] < mat[r][c])
                    continue;

                // This tower can also reach Station P.
                reachP[nr][nc] = true;
                stackP.push(new int[] { nr, nc });
            }
        }

        // Build the source cells for Station Q.
        java.util.ArrayDeque<int[]> stackQ = new java.util.ArrayDeque<>();

        // Add every cell from the bottom row.
        for (int j = 0; j < m; j++) {
            if (!reachQ[n - 1][j]) {
                reachQ[n - 1][j] = true;
                stackQ.push(new int[] { n - 1, j });
            }
        }

        // Add every cell from the right column.
        for (int i = 0; i < n; i++) {
            if (!reachQ[i][m - 1]) {
                reachQ[i][m - 1] = true;
                stackQ.push(new int[] { i, m - 1 });
            }
        }

        // Run reverse DFS for Station Q.
        while (!stackQ.isEmpty()) {
            int[] cell = stackQ.pop();
            int r = cell[0];
            int c = cell[1];

            // Check all four neighbouring cells.
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];

                // Skip invalid coordinates.
                if (nr < 0 || nr >= n || nc < 0 || nc >= m)
                    continue;

                // Skip cells already visited for Station Q.
                if (reachQ[nr][nc])
                    continue;

                // Reverse movement is allowed only to an equal or higher tower.
                if (mat[nr][nc] < mat[r][c])
                    continue;

                // This tower can also reach Station Q.
                reachQ[nr][nc] = true;
                stackQ.push(new int[] { nr, nc });
            }
        }

        // Count towers that can reach both stations.
        int answer = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (reachP[i][j] && reachQ[i][j])
                    answer++;
            }
        }

        return answer;
    }
}