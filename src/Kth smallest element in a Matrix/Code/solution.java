class Solution {
    public int kthSmallest(int[][] mat, int k) {
        int n = mat.length;

        int low = mat[0][0];
        int high = mat[n - 1][n - 1];

        while (low < high) {
            int mid = low + (high - low) / 2;
            int count = 0;

            int col = n - 1;
            for (int row = 0; row < n; row++) {
                while (col >= 0 && mat[row][col] > mid) {
                    col--;
                }
                count += (col + 1);
            }

            if (count < k) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
