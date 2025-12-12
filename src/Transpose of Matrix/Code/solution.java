import java.util.ArrayList;

class Solution {
    public ArrayList<ArrayList<Integer>> transpose(int[][] mat) {
        int n = mat.length;
        // transpose in-place by swapping mat[i][j] with mat[j][i]
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                int tmp = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = tmp;
            }
        }
        // convert to ArrayList<ArrayList<Integer>> as required by signature
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            ArrayList<Integer> row = new ArrayList<>();
            for (int j = 0; j < n; ++j)
                row.add(mat[i][j]);
            res.add(row);
        }
        return res;
    }
}
