class Solution {
    public int maximumSum(int[][] mat, int k) {

        int n = mat.length;

        // Prefix sum matrix
        int[][] prefix = new int[n][n];

        // Build the prefix sum matrix
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {

                // Current cell value
                prefix[i][j] = mat[i][j];

                // Add the sum from the top
                if (i > 0)
                    prefix[i][j] += prefix[i - 1][j];

                // Add the sum from the left
                if (j > 0)
                    prefix[i][j] += prefix[i][j - 1];

                // Remove the overlapping area
                if (i > 0 && j > 0)
                    prefix[i][j] -= prefix[i - 1][j - 1];
            }
        }

        // Store the maximum answer
        int ans = Integer.MIN_VALUE;

        // Check every possible k x k square
        for (int i = k - 1; i < n; i++) {
            for (int j = k - 1; j < n; j++) {

                // Top-left corner
                int r = i - k + 1;
                int c = j - k + 1;

                // Current square sum
                int sum = prefix[i][j];

                // Remove upper part
                if (r > 0)
                    sum -= prefix[r - 1][j];

                // Remove left part
                if (c > 0)
                    sum -= prefix[i][c - 1];

                // Add overlap
                if (r > 0 && c > 0)
                    sum += prefix[r - 1][c - 1];

                // Update answer
                ans = Math.max(ans, sum);
            }
        }

        return ans;
    }
}