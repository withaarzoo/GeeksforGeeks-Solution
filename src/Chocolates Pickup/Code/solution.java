class Solution {
    public int maxChocolate(int grid[][]) {
        int n = grid.length;
        int m = grid[0].length;

        int[][] dp = new int[m][m];

        // Base case
        for (int c1 = 0; c1 < m; c1++) {
            for (int c2 = 0; c2 < m; c2++) {
                if (c1 == c2)
                    dp[c1][c2] = grid[n - 1][c1];
                else
                    dp[c1][c2] = grid[n - 1][c1] + grid[n - 1][c2];
            }
        }

        for (int row = n - 2; row >= 0; row--) {
            int[][] temp = new int[m][m];

            for (int c1 = 0; c1 < m; c1++) {
                for (int c2 = 0; c2 < m; c2++) {

                    int max = 0;

                    for (int d1 = -1; d1 <= 1; d1++) {
                        for (int d2 = -1; d2 <= 1; d2++) {

                            int nc1 = c1 + d1;
                            int nc2 = c2 + d2;

                            if (nc1 >= 0 && nc1 < m && nc2 >= 0 && nc2 < m) {
                                int val = dp[nc1][nc2];

                                if (c1 == c2)
                                    val += grid[row][c1];
                                else
                                    val += grid[row][c1] + grid[row][c2];

                                max = Math.max(max, val);
                            }
                        }
                    }

                    temp[c1][c2] = max;
                }
            }

            dp = temp;
        }

        return dp[0][m - 1];
    }
}