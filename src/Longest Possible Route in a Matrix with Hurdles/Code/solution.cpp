class Solution
{
public:
    int n, m;

    // Directions: Up, Down, Left, Right
    int dx[4] = {-1, 1, 0, 0};
    int dy[4] = {0, 0, -1, 1};

    // DFS returns the longest distance from (x, y) to destination
    int dfs(vector<vector<int>> &mat, vector<vector<bool>> &vis,
            int x, int y, int xd, int yd)
    {

        // Destination reached
        if (x == xd && y == yd)
            return 0;

        // Mark current cell as visited
        vis[x][y] = true;

        int ans = -1;

        // Try all four directions
        for (int k = 0; k < 4; k++)
        {

            int nx = x + dx[k];
            int ny = y + dy[k];

            // Check whether next cell is valid
            if (nx >= 0 && nx < n &&
                ny >= 0 && ny < m &&
                mat[nx][ny] == 1 &&
                !vis[nx][ny])
            {

                // Explore further
                int cur = dfs(mat, vis, nx, ny, xd, yd);

                // If destination is reachable through this path
                if (cur != -1)
                    ans = max(ans, cur + 1);
            }
        }

        // Backtrack so this cell can be reused
        vis[x][y] = false;

        return ans;
    }

    int longestPath(vector<vector<int>> &mat, int xs, int ys, int xd, int yd)
    {

        n = mat.size();
        m = mat[0].size();

        // If source or destination is blocked
        if (mat[xs][ys] == 0 || mat[xd][yd] == 0)
            return -1;

        // Visited matrix to avoid revisiting cells
        vector<vector<bool>> vis(n, vector<bool>(m, false));

        return dfs(mat, vis, xs, ys, xd, yd);
    }
};