class Solution {
    public int chocolatePickup(int[][] mat) {
        int n = mat.length;
        final int NEG = (int) -1e9;

        if (mat[0][0] == -1 || mat[n - 1][n - 1] == -1)
            return 0;

        int[][] dp = new int[n][n];
        for (int i = 0; i < n; i++)
            java.util.Arrays.fill(dp[i], NEG);
        dp[0][0] = mat[0][0];

        for (int k = 1; k <= 2 * (n - 1); k++) {
            int[][] ndp = new int[n][n];
            for (int i = 0; i < n; i++)
                java.util.Arrays.fill(ndp[i], NEG);

            for (int c1 = 0; c1 < n; c1++) {
                int r1 = k - c1;
                if (r1 < 0 || r1 >= n)
                    continue;
                if (mat[r1][c1] == -1)
                    continue;

                for (int c2 = 0; c2 < n; c2++) {
                    int r2 = k - c2;
                    if (r2 < 0 || r2 >= n)
                        continue;
                    if (mat[r2][c2] == -1)
                        continue;

                    int best = NEG;
                    if (r1 - 1 >= 0 && r2 - 1 >= 0)
                        best = Math.max(best, dp[c1][c2]);
                    if (c1 - 1 >= 0 && r2 - 1 >= 0)
                        best = Math.max(best, dp[c1 - 1][c2]);
                    if (r1 - 1 >= 0 && c2 - 1 >= 0)
                        best = Math.max(best, dp[c1][c2 - 1]);
                    if (c1 - 1 >= 0 && c2 - 1 >= 0)
                        best = Math.max(best, dp[c1 - 1][c2 - 1]);

                    if (best == NEG)
                        continue;

                    int gain = mat[r1][c1];
                    if (c1 != c2)
                        gain += mat[r2][c2];
                    ndp[c1][c2] = Math.max(ndp[c1][c2], best + gain);
                }
            }
            dp = ndp;
        }
        int ans = dp[n - 1][n - 1];
        return ans < 0 ? 0 : ans;
    }
}
