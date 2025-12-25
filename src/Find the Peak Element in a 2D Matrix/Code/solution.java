class Solution {
    public ArrayList<Integer> findPeakGrid(int[][] mat) {
        int n = mat.length;
        int m = mat[0].length;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {

                int curr = mat[i][j];

                int up = (i > 0) ? mat[i - 1][j] : Integer.MIN_VALUE;
                int down = (i < n - 1) ? mat[i + 1][j] : Integer.MIN_VALUE;
                int left = (j > 0) ? mat[i][j - 1] : Integer.MIN_VALUE;
                int right = (j < m - 1) ? mat[i][j + 1] : Integer.MIN_VALUE;

                if (curr >= up && curr >= down &&
                        curr >= left && curr >= right) {

                    ArrayList<Integer> ans = new ArrayList<>();
                    ans.add(i);
                    ans.add(j);
                    return ans;
                }
            }
        }
        return new ArrayList<>();
    }
}
