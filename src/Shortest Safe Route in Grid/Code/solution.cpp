
class Solution {
  public:
    int shortestPath(vector<vector<int>> &mat) {
        int n = mat.size();                         // Number of rows.
        int m = mat[0].size();                      // Number of columns.

        vector<vector<int>> unsafe(n, vector<int>(m, 0));
        // unsafe[r][c] = 1 means this cell cannot be used in the route.

        int dr[4] = {-1, 1, 0, 0};
        // Row changes for up, down, left, and right.

        int dc[4] = {0, 0, -1, 1};
        // Column changes for up, down, left, and right.

        // I first find every landmine and mark it and its direct neighbors unsafe.
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < m; c++) {
                if (mat[r][c] == 0) {
                    unsafe[r][c] = 1;
                    // The landmine itself cannot be used.

                    for (int d = 0; d < 4; d++) {
                        int nr = r + dr[d];
                        int nc = c + dc[d];
                        // Calculate one of the four neighboring cells.

                        if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                            unsafe[nr][nc] = 1;
                            // A cell directly adjacent to a landmine is also unsafe.
                        }
                    }
                }
            }
        }

        vector<vector<int>> visited(n, vector<int>(m, 0));
        // visited prevents the same cell from being added to BFS more than once.

        queue<tuple<int, int, int>> q;
        // Each item stores row, column, and route length.

        // I can start from any safe cell in the first column.
        // The starting cell counts as part of the route, so its distance is 1.
        for (int r = 0; r < n; r++) {
            if (mat[r][0] == 1 && !unsafe[r][0]) {
                q.push({r, 0, 1});
                // Distance 1 means the starting cell itself is counted.

                visited[r][0] = 1;
                // Mark it immediately so it is not inserted again.
            }
        }

        // BFS explores routes in increasing order of their length.
        while (!q.empty()) {
            auto [r, c, dist] = q.front();
            q.pop();
            // Take the next cell and its current route length.

            if (c == m - 1) {
                return dist;
                // The first last-column cell reached has the shortest route.
            }

            // Try moving in all four directions.
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                // Calculate the neighboring cell.

                if (nr >= 0 && nr < n &&
                    nc >= 0 && nc < m &&
                    mat[nr][nc] == 1 &&
                    !unsafe[nr][nc] &&
                    !visited[nr][nc]) {

                    visited[nr][nc] = 1;
                    // Mark before inserting so the cell enters the queue only once.

                    q.push({nr, nc, dist + 1});
                    // Moving to this cell adds one cell to the route length.
                }
            }
        }

        return -1;
        // No safe route could reach the rightmost column.
    }
};
