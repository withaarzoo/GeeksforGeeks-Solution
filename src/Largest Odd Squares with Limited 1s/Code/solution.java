class Solution {
    ArrayList<Integer> largestSquare(int[][] mat, int[][] queries, int k) {
        int n = mat.length; // Store the number of rows.
        int m = mat[0].length; // Store the number of columns.

        // prefix[i][j] stores the number of 1s in the first
        // i rows and first j columns of the matrix.
        int[][] prefix = new int[n + 1][m + 1];

        // Build the 2D prefix sum.
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                // Add the current cell and the upper/left regions,
                // then subtract the overlapping region counted twice.
                prefix[i][j] = mat[i - 1][j - 1]
                        + prefix[i - 1][j]
                        + prefix[i][j - 1]
                        - prefix[i - 1][j - 1];
            }
        }

        ArrayList<Integer> answer = new ArrayList<>(); // Store query answers.

        // Process every query independently.
        for (int[] query : queries) {
            int i = query[0]; // Row of the square center.
            int j = query[1]; // Column of the square center.

            // The nearest boundary determines the largest possible radius.
            int maxRadius = Math.min(
                    Math.min(i, j),
                    Math.min(n - 1 - i, m - 1 - j));

            int low = 0; // Smallest possible radius.
            int high = maxRadius; // Largest boundary-safe radius.
            int best = -1; // No valid square found initially.

            // Binary search for the largest valid radius.
            while (low <= high) {
                int mid = low + (high - low) / 2;

                // Find the square boundaries for this radius.
                int r1 = i - mid;
                int c1 = j - mid;
                int r2 = i + mid;
                int c2 = j + mid;

                // Convert matrix coordinates to prefix coordinates.
                int R1 = r1 + 1;
                int C1 = c1 + 1;
                int R2 = r2 + 1;
                int C2 = c2 + 1;

                // Count the number of 1s inside the square.
                int ones = prefix[R2][C2]
                        - prefix[R1 - 1][C2]
                        - prefix[R2][C1 - 1]
                        + prefix[R1 - 1][C1 - 1];

                if (ones <= k) {
                    // This radius is valid, so remember it
                    // and search for a larger valid radius.
                    best = mid;
                    low = mid + 1;
                } else {
                    // Too many 1s means we must search smaller radii.
                    high = mid - 1;
                }
            }

            // Convert the radius into the required odd side length.
            // When best == -1, this gives -1.
            answer.add(2 * best + 1);
        }

        return answer; // Return all query results.
    }
}