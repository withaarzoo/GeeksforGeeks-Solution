#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    void fill(vector<vector<char>> &grid)
    {
        int n = grid.size();
        int m = grid[0].size();
        queue<pair<int, int>> q;

        auto pushIfO = [&](int r, int c)
        {
            if (r >= 0 && r < n && c >= 0 && c < m && grid[r][c] == 'O')
            {
                grid[r][c] = 'T';
                q.push({r, c});
            }
        };

        // Step 1: Mark all border 'O's and their connected region
        for (int i = 0; i < n; ++i)
        {
            pushIfO(i, 0);
            pushIfO(i, m - 1);
        }
        for (int j = 0; j < m; ++j)
        {
            pushIfO(0, j);
            pushIfO(n - 1, j);
        }

        // BFS for all border-connected 'O's
        int dr[4] = {-1, 1, 0, 0};
        int dc[4] = {0, 0, -1, 1};
        while (!q.empty())
        {
            auto [r, c] = q.front();
            q.pop();
            for (int k = 0; k < 4; ++k)
            {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 'O')
                {
                    grid[nr][nc] = 'T';
                    q.push({nr, nc});
                }
            }
        }

        // Step 2: Flip and restore
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                if (grid[i][j] == 'O')
                    grid[i][j] = 'X';
                else if (grid[i][j] == 'T')
                    grid[i][j] = 'O';
            }
        }
    }
};
