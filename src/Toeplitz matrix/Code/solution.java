class Solution {
    public boolean isToeplitz(int[][] mat) {
        int rows = mat.length;
        int cols = mat[0].length;

        // Start from second row and second column
        for (int i = 1; i < rows; i++) {
            for (int j = 1; j < cols; j++) {

                // Compare current element with top-left diagonal element
                if (mat[i][j] != mat[i - 1][j - 1]) {
                    return false;
                }
            }
        }

        return true;
    }
}