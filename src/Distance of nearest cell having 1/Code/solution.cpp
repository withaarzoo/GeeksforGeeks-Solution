#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    vector<vector<int>> nearest(vector<vector<int>> &grid)
    {
        int m = grid.size();
        if (m == 0)
            return {};
        int n = grid[0].size();
        vector<vector<int>> dist(m, vector<int>(n, -1));
        queue<pair<int, int>> q;

        // Initialize queue with all 1 cells
        for (int i = 0; i < m; ++i)
        {
            for (int j = 0; j < n; ++j)
            {
                if (grid[i][j] == 1)
                {
                    dist[i][j] = 0;
                    q.push({i, j});
                }
            }
        }

        // Directions (up, down, left, right)
        int dr[4] = {-1, 1, 0, 0};
        int dc[4] = {0, 0, -1, 1};

        // BFS
        while (!q.empty())
        {
            auto [r, c] = q.front();
            q.pop();
            for (int k = 0; k < 4; ++k)
            {
                int nr = r + dr[k];
                int nc = c + dc[k];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] == -1)
                {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }

        return dist;
    }
};
