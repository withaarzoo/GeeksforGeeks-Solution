class Solution {

    // Function to calculate determinant using Gaussian Elimination
    private long determinant(double[][] mat, int size) {

        double det = 1;

        for (int i = 0; i < size; i++) {

            int pivot = i;

            // Find non-zero pivot
            for (int j = i; j < size; j++) {
                if (Math.abs(mat[j][i]) > 1e-9) {
                    pivot = j;
                    break;
                }
            }

            // Determinant becomes 0
            if (Math.abs(mat[pivot][i]) < 1e-9)
                return 0;

            // Swap rows if needed
            if (pivot != i) {
                double[] temp = mat[pivot];
                mat[pivot] = mat[i];
                mat[i] = temp;

                det *= -1;
            }

            // Multiply diagonal value
            det *= mat[i][i];

            // Eliminate lower rows
            for (int j = i + 1; j < size; j++) {

                double factor = mat[j][i] / mat[i][i];

                for (int k = i; k < size; k++) {
                    mat[j][k] -= factor * mat[i][k];
                }
            }
        }

        return Math.round(det);
    }

    public int countSpanTree(int n, int[][] edges) {

        // Single node graph
        if (n == 1)
            return 1;

        // Laplacian matrix
        double[][] lap = new double[n][n];

        // Build matrix
        for (int[] e : edges) {

            int u = e[0];
            int v = e[1];

            lap[u][u]++;
            lap[v][v]++;

            lap[u][v]--;
            lap[v][u]--;
        }

        // Cofactor matrix
        double[][] cof = new double[n - 1][n - 1];

        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1; j++) {
                cof[i][j] = lap[i][j];
            }
        }

        return (int) determinant(cof, n - 1);
    }
}