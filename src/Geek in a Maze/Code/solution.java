import java.util.*;

class Solution {
    public int numberOfCells(int r, int c, int u, int d, char[][] mat) {
        // Store the maze dimensions.
        int n = mat.length;
        int m = mat[0].length;

        // Geek cannot start from an obstacle.
        if (mat[r][c] == '#') {
            return 0;
        }

        // INF marks cells that have not been reached.
        final int INF = Integer.MAX_VALUE / 2;

        // dist[i][j] stores the minimum upward moves needed to reach (i, j).
        int[][] dist = new int[n][m];

        // Initialize every cell as unreachable.
        for (int i = 0; i < n; i++) {
            Arrays.fill(dist[i], INF);
        }

        // ArrayDeque works as the deque required by 0-1 BFS.
        Deque<Integer> deque = new ArrayDeque<>();

        // Start with zero upward moves.
        dist[r][c] = 0;
        deque.offerFirst(r * m + c);

        // Direction arrays for up, down, left, and right.
        int[] dr = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};

        // Run 0-1 BFS.
        while (!deque.isEmpty()) {
            // Decode the row and column from the stored cell index.
            int id = deque.pollFirst();
            int x = id / m;
            int y = id % m;

            // Try all four adjacent cells.
            for (int dir = 0; dir < 4; dir++) {
                int nx = x + dr[dir];
                int ny = y + dc[dir];

                // Ignore positions outside the maze.
                if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
                    continue;
                }

                // Obstacles cannot be visited.
                if (mat[nx][ny] == '#') {
                    continue;
                }

                // Moving upward costs 1, while every other move costs 0.
                int cost = (dir == 0) ? 1 : 0;

                // Relax the path if fewer upward moves are required.
                if (dist[x][y] + cost < dist[nx][ny]) {
                    dist[nx][ny] = dist[x][y] + cost;

                    // Put cost 0 moves at the front for immediate processing.
                    if (cost == 0) {
                        deque.offerFirst(nx * m + ny);
                    } else {
                        // Put cost 1 moves at the back.
                        deque.offerLast(nx * m + ny);
                    }
                }
            }
        }

        // Store the number of cells Geek can actually visit.
        int answer = 0;

        // Check every cell after shortest paths are known.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                // Skip blocked or unreachable cells.
                if (mat[i][j] == '#' || dist[i][j] == INF) {
                    continue;
                }

                // Get the minimum number of upward moves.
                long upMoves = dist[i][j];

                // Calculate downward moves from the final row displacement.
                long downMoves = upMoves + (i - r);

                // Count the cell only when both movement limits are satisfied.
                if (upMoves <= u && downMoves <= d) {
                    answer++;
                }
            }
        }

        // Return the final count.
        return answer;
    }
}