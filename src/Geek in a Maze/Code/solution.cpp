class Solution {
  public:
    int numberOfCells(int r, int c, int u, int d, vector<vector<char>> &mat) {
        // Store the number of rows and columns for easy access.
        int n = mat.size();
        int m = mat[0].size();

        // If the starting cell itself is blocked, Geek cannot visit any cell.
        if (mat[r][c] == '#') {
            return 0;
        }

        // INF represents a cell that has not been reached yet.
        const int INF = 1e9;

        // dist[i][j] stores the minimum number of upward moves
        // needed to reach cell (i, j).
        vector<vector<int>> dist(n, vector<int>(m, INF));

        // A deque is used for 0-1 BFS because every edge has cost 0 or 1.
        deque<pair<int, int>> dq;

        // Geek starts here without making any upward move.
        dist[r][c] = 0;
        dq.push_front({r, c});

        // Direction arrays for up, down, left, and right.
        int dr[] = {-1, 1, 0, 0};
        int dc[] = {0, 0, -1, 1};

        // Process cells until there are no more reachable states.
        while (!dq.empty()) {
            // Take the cell with the current smallest useful upward cost.
            auto [x, y] = dq.front();
            dq.pop_front();

            // Try all four adjacent cells.
            for (int dir = 0; dir < 4; dir++) {
                int nx = x + dr[dir];
                int ny = y + dc[dir];

                // Ignore cells outside the maze.
                if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
                    continue;
                }

                // Geek cannot move through an obstacle.
                if (mat[nx][ny] == '#') {
                    continue;
                }

                // Only an upward move increases the number of upward moves.
                int cost = (dir == 0 ? 1 : 0);

                // Update the cell only if this path uses fewer upward moves.
                if (dist[x][y] + cost < dist[nx][ny]) {
                    dist[nx][ny] = dist[x][y] + cost;

                    // Cost 0 edges are processed first to maintain 0-1 BFS order.
                    if (cost == 0) {
                        dq.push_front({nx, ny});
                    } else {
                        // Cost 1 edges are processed after all current cost 0 paths.
                        dq.push_back({nx, ny});
                    }
                }
            }
        }

        // Count every cell that satisfies both movement limits.
        int answer = 0;

        // Check all cells in the maze.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                // Skip unreachable cells and obstacles.
                if (mat[i][j] == '#' || dist[i][j] == INF) {
                    continue;
                }

                // dist[i][j] is the minimum number of upward moves.
                long long upMoves = dist[i][j];

                // Vertical displacement determines downward moves.
                long long downMoves = upMoves + (i - r);

                // Count the cell only if both limits are respected.
                if (upMoves <= u && downMoves <= d) {
                    answer++;
                }
            }
        }

        // Return the number of distinct reachable empty cells.
        return answer;
    }
};