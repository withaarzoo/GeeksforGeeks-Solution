class Solution {
  public:
    int longIncPath(vector<vector<int>> &matrix, int n, int m) {
        vector<vector<int>> memo(n, vector<int>(m, 0));
        int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
        function<int(int,int)> dfs = [&](int i, int j) {
            if (memo[i][j] != 0) return memo[i][j];
            int best = 1;
            for (auto& d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < n && nj >= 0 && nj < m && matrix[ni][nj] > matrix[i][j]) {
                    best = max(best, 1 + dfs(ni, nj));
                }
            }
            return memo[i][j] = best;
        };
        int ans = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                ans = max(ans, dfs(i, j));
        return ans;
    }
};