class Solution {
    public int longIncPath(int[][] matrix, int n, int m) {
        int[][] memo = new int[n][m];
        int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
        int ans = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                ans = Math.max(ans, dfs(matrix, memo, dirs, i, j, n, m));
        return ans;
    }
    private int dfs(int[][] matrix, int[][] memo, int[][] dirs, int i, int j, int n, int m) {
        if (memo[i][j] != 0) return memo[i][j];
        int best = 1;
        for (int[] d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < n && nj >= 0 && nj < m && matrix[ni][nj] > matrix[i][j]) {
                best = Math.max(best, 1 + dfs(matrix, memo, dirs, ni, nj, n, m));
            }
        }
        return memo[i][j] = best;
    }
}