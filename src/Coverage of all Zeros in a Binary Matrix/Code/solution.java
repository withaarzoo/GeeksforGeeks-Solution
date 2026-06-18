class Solution {
    public int findCoverage(int[][] mat) {
        // Get matrix size so I can scan all cells correctly.
        int n = mat.length;
        int m = mat[0].length;

        // colTotal[j] stores the total number of 1s in column j.
        int[] colTotal = new int[m];

        // First pass: count all 1s in every column.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                colTotal[j] += mat[i][j];
            }
        }

        // colPrefix[j] stores the number of 1s seen in column j in rows above the
        // current row.
        int[] colPrefix = new int[m];

        int ans = 0;

        // Second pass: compute the coverage of every zero cell.
        for (int i = 0; i < n; i++) {
            // rowTotal stores the total number of 1s in the current row.
            int rowTotal = 0;
            for (int j = 0; j < m; j++) {
                rowTotal += mat[i][j];
            }

            // leftOnes stores how many 1s I have already seen on the left side of this row.
            int leftOnes = 0;

            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 0) {
                    int coverage = 0;

                    // Left direction is covered if I have seen at least one 1 before this cell.
                    if (leftOnes > 0)
                        coverage++;

                    // Right direction is covered if there is at least one 1 after this cell.
                    if (rowTotal - leftOnes > 0)
                        coverage++;

                    // Up direction is covered if there is at least one 1 above this cell.
                    if (colPrefix[j] > 0)
                        coverage++;

                    // Down direction is covered if there is at least one 1 below this cell.
                    if (colTotal[j] - colPrefix[j] > 0)
                        coverage++;

                    ans += coverage;
                } else {
                    // Current cell is 1, so it can help zero cells on its right.
                    leftOnes++;
                }
            }

            // Update column prefixes only after finishing the row.
            // This keeps the current row out of the "up" count.
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 1) {
                    colPrefix[j]++;
                }
            }
        }

        return ans;
    }
}