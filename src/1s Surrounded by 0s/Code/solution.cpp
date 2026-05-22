class Solution
{
public:
    // DFS function to mark all connected 1s
    void dfs(int row, int col,
             vector<vector<int>> &grid,
             vector<vector<int>> &vis,
             int n, int m)
    {

        // Mark current cell as visited
        vis[row][col] = 1;

        // Direction arrays for moving
        int dr[] = {-1, 1, 0, 0};
        int dc[] = {0, 0, -1, 1};

        // Explore all 4 directions
        for (int i = 0; i < 4; i++)
        {
            int nr = row + dr[i];
            int nc = col + dc[i];

            // Check boundaries and valid unvisited 1
            if (nr >= 0 && nr < n &&
                nc >= 0 && nc < m &&
                grid[nr][nc] == 1 &&
                !vis[nr][nc])
            {

                dfs(nr, nc, grid, vis, n, m);
            }
        }
    }

    int cntOnes(vector<vector<int>> &grid)
    {

        int n = grid.size();
        int m = grid[0].size();

        // Visited matrix
        vector<vector<int>> vis(n, vector<int>(m, 0));

        // Traverse first and last column
        for (int i = 0; i < n; i++)
        {

            // First column
            if (grid[i][0] == 1 && !vis[i][0])
            {
                dfs(i, 0, grid, vis, n, m);
            }

            // Last column
            if (grid[i][m - 1] == 1 && !vis[i][m - 1])
            {
                dfs(i, m - 1, grid, vis, n, m);
            }
        }

        // Traverse first and last row
        for (int j = 0; j < m; j++)
        {

            // First row
            if (grid[0][j] == 1 && !vis[0][j])
            {
                dfs(0, j, grid, vis, n, m);
            }

            // Last row
            if (grid[n - 1][j] == 1 && !vis[n - 1][j])
            {
                dfs(n - 1, j, grid, vis, n, m);
            }
        }

        int count = 0;

        // Count all unvisited 1s
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {

                // These cells are trapped inside
                if (grid[i][j] == 1 && !vis[i][j])
                {
                    count++;
                }
            }
        }

        return count;
    }
};