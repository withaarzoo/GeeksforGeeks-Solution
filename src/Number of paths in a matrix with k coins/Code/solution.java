class Solution {
    public int numberOfPath(int[][] mat, int k) {
        int n = mat.length, m = mat[0].length;
        // dp[i][j][s]: ways to reach (i,j) with sum s
        int[][][] dp = new int[n][m][k + 1];

        if (mat[0][0] <= k)
            dp[0][0][mat[0][0]] = 1;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                int val = mat[i][j];
                if (i == 0 && j == 0)
                    continue; // base already set
                for (int s = val; s <= k; s++) {
                    int ways = 0;
                    if (i > 0)
                        ways += dp[i - 1][j][s - val]; // from top
                    if (j > 0)
                        ways += dp[i][j - 1][s - val]; // from left
                    dp[i][j][s] = ways;
                }
            }
        }
        return dp[n - 1][m - 1][k];
    }
}
