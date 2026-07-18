class Solution {

    public int findWays(int[][] matrix, int k) {

        final int MOD = 1000000007;

        int rows = matrix.length;
        int cols = matrix[0].length;

        int[][] suffixOnes = new int[rows + 1][cols + 1];

        for (int r = rows - 1; r >= 0; r--) {
            for (int c = cols - 1; c >= 0; c--) {
                suffixOnes[r][c] = matrix[r][c]
                        + suffixOnes[r + 1][c]
                        + suffixOnes[r][c + 1]
                        - suffixOnes[r + 1][c + 1];
            }
        }

        if (suffixOnes[0][0] < k)
            return 0;

        int[][] nextRow = new int[rows][cols];
        int[][] nextCol = new int[rows][cols];

        for (int[] row : nextRow)
            java.util.Arrays.fill(row, rows);

        for (int[] row : nextCol)
            java.util.Arrays.fill(row, cols);

        for (int c = 0; c < cols; c++) {
            for (int r = rows - 1; r >= 0; r--) {
                if (suffixOnes[r][c] > suffixOnes[r + 1][c])
                    nextRow[r][c] = r + 1;
                else if (r + 1 < rows)
                    nextRow[r][c] = nextRow[r + 1][c];
            }
        }

        for (int r = 0; r < rows; r++) {
            for (int c = cols - 1; c >= 0; c--) {
                if (suffixOnes[r][c] > suffixOnes[r][c + 1])
                    nextCol[r][c] = c + 1;
                else if (c + 1 < cols)
                    nextCol[r][c] = nextCol[r][c + 1];
            }
        }

        int[][] dp = new int[rows + 1][cols + 1];

        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                dp[r][c] = suffixOnes[r][c] > 0 ? 1 : 0;

        for (int pieces = 2; pieces <= k; pieces++) {

            int[][] rowSuffix = new int[rows + 1][cols + 1];
            int[][] colSuffix = new int[rows + 1][cols + 1];

            for (int r = rows - 1; r >= 0; r--) {
                for (int c = cols - 1; c >= 0; c--) {
                    rowSuffix[r][c] = (rowSuffix[r + 1][c] + dp[r][c]) % MOD;
                    colSuffix[r][c] = (colSuffix[r][c + 1] + dp[r][c]) % MOD;
                }
            }

            int[][] current = new int[rows + 1][cols + 1];

            for (int r = 0; r < rows; r++) {
                for (int c = 0; c < cols; c++) {

                    if (suffixOnes[r][c] < pieces)
                        continue;

                    long ways = 0;

                    ways += rowSuffix[nextRow[r][c]][c];
                    ways += colSuffix[r][nextCol[r][c]];

                    current[r][c] = (int) (ways % MOD);
                }
            }

            dp = current;
        }

        return dp[0][0];
    }
}