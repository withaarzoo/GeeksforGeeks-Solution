class Solution {
    static ArrayList<Integer> diagView(int mat[][]) {
        int n = mat.length;
        ArrayList<Integer> ans = new ArrayList<>();

        // Total anti-diagonals = 2*n - 1
        for (int d = 0; d <= 2 * n - 2; d++) {

            // Valid row range for current diagonal
            int rowStart = Math.max(0, d - n + 1);
            int rowEnd = Math.min(n - 1, d);

            // Traverse current diagonal
            for (int i = rowStart; i <= rowEnd; i++) {
                int j = d - i;
                ans.add(mat[i][j]);
            }
        }

        return ans;
    }
}