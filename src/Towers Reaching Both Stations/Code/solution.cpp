class Solution
{
public:
    int countCoordinates(vector<vector<int>> &mat)
    {
        // Store the number of rows and columns.
        int n = mat.size();
        int m = mat[0].size();

        // reachP[i][j] is true if this tower can reach Station P.
        // reachQ[i][j] is true if this tower can reach Station Q.
        vector<vector<bool>> reachP(n, vector<bool>(m, false));
        vector<vector<bool>> reachQ(n, vector<bool>(m, false));

        // These four pairs represent down, up, right, and left movement.
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};

        // This lambda runs reverse DFS from all boundary cells of one station.
        auto dfs = [&](vector<pair<int, int>> &sources,
                       vector<vector<bool>> &visited)
        {
            // I use a vector as an explicit stack to avoid recursion depth problems.
            vector<pair<int, int>> st;

            // Add every source cell once.
            for (auto [r, c] : sources)
            {
                if (!visited[r][c])
                {
                    visited[r][c] = true;
                    st.push_back({r, c});
                }
            }

            // Process cells until there are no reachable cells left.
            while (!st.empty())
            {
                auto [r, c] = st.back();
                st.pop_back();

                // Check all four neighbouring cells.
                for (int d = 0; d < 4; d++)
                {
                    int nr = r + dr[d];
                    int nc = c + dc[d];

                    // Skip cells outside the matrix.
                    if (nr < 0 || nr >= n || nc < 0 || nc >= m)
                        continue;

                    // Skip cells already found for this station.
                    if (visited[nr][nc])
                        continue;

                    // In reverse, I can move only to an equal or higher tower.
                    if (mat[nr][nc] < mat[r][c])
                        continue;

                    // This tower can also reach the same station.
                    visited[nr][nc] = true;
                    st.push_back({nr, nc});
                }
            }
        };

        // Collect the top row and left column for Station P.
        vector<pair<int, int>> sourcesP;
        for (int j = 0; j < m; j++)
            sourcesP.push_back({0, j});
        for (int i = 0; i < n; i++)
            sourcesP.push_back({i, 0});

        // Collect the bottom row and right column for Station Q.
        vector<pair<int, int>> sourcesQ;
        for (int j = 0; j < m; j++)
            sourcesQ.push_back({n - 1, j});
        for (int i = 0; i < n; i++)
            sourcesQ.push_back({i, m - 1});

        // Find all towers that can reach each station.
        dfs(sourcesP, reachP);
        dfs(sourcesQ, reachQ);

        // Count towers that can reach both stations.
        int answer = 0;
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                if (reachP[i][j] && reachQ[i][j])
                    answer++;
            }
        }

        return answer;
    }
};