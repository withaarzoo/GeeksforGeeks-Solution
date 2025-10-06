#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Return an n x n matrix where each cell contains the step index when visited.
    // If no tour exists, return {{-1}}.
    vector<vector<int>> knightTour(int n) {
        if (n == 1) return vector<vector<int>>(1, vector<int>(1, 0));
        // For n = 2,3,4 a full knight's tour is impossible -> return -1 sentinel
        if (n > 1 && n < 5) return vector<vector<int>>(1, vector<int>(1, -1));

        vector<vector<int>> board(n, vector<int>(n, -1));
        int dr[8] = {2,1,-1,-2,-2,-1,1,2};
        int dc[8] = {1,2,2,1,-1,-2,-2,-1};

        // degree = number of onward moves from (r,c) that are unvisited
        auto degree = [&](int r, int c) {
            int cnt = 0;
            for (int k = 0; k < 8; ++k) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] == -1)
                    ++cnt;
            }
            return cnt;
        };

        function<bool(int,int,int)> dfs = [&](int r, int c, int step) -> bool {
            if (step == n * n) return true; // visited all squares

            // collect valid moves + their degree (Warnsdorff's heuristic)
            vector<pair<int, pair<int,int>>> moves;
            for (int k = 0; k < 8; ++k) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] == -1) {
                    moves.push_back({ degree(nr, nc), {nr, nc} });
                }
            }
            sort(moves.begin(), moves.end()); // ascending degree

            for (auto &m : moves) {
                int nr = m.second.first, nc = m.second.second;
                board[nr][nc] = step;
                if (dfs(nr, nc, step + 1)) return true;
                board[nr][nc] = -1; // backtrack
            }
            return false;
        };

        board[0][0] = 0;
        if (dfs(0, 0, 1)) return board;
        return vector<vector<int>>(1, vector<int>(1, -1));
    }
};
