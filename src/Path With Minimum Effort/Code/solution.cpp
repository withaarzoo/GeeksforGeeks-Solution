#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int minCostPath(vector<vector<int>> &mat)
    {
        int n = mat.size();
        if (n == 0)
            return 0;
        int m = mat[0].size();
        if (n == 1 && m == 1)
            return 0;

        const int INF = 1e9;
        vector<vector<int>> dist(n, vector<int>(m, INF));
        // min-heap of tuple (cost, r, c)
        using T = tuple<int, int, int>;
        priority_queue<T, vector<T>, greater<T>> pq;

        dist[0][0] = 0;
        pq.emplace(0, 0, 0);

        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};

        while (!pq.empty())
        {
            auto [cost, r, c] = pq.top();
            pq.pop();
            // If this popped cost is worse than known, skip
            if (cost != dist[r][c])
                continue;
            // If reached destination, this is optimal
            if (r == n - 1 && c == m - 1)
                return cost;

            for (int k = 0; k < 4; ++k)
            {
                int nr = r + dr[k];
                int nc = c + dc[k];
                if (nr < 0 || nr >= n || nc < 0 || nc >= m)
                    continue;
                int edge = abs(mat[r][c] - mat[nr][nc]);
                int newCost = max(cost, edge);
                if (newCost < dist[nr][nc])
                {
                    dist[nr][nc] = newCost;
                    pq.emplace(newCost, nr, nc);
                }
            }
        }
        return dist[n - 1][m - 1];
    }
};
