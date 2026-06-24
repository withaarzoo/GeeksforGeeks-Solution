class Solution {
    // Helper function to explore paths
    private boolean solve(int i, int j, int[][] mat, int[][] ans, int n) {
        // Base case: destination reached
        if (i == n - 1 && j == n - 1) {
            ans[i][j] = 1;
            return true;
        }

        // Base case: invalid position or blocked cell
        if (i >= n || j >= n || mat[i][j] == 0) {
            return false;
        }

        // Add current cell to the path
        ans[i][j] = 1;
        int jumps = mat[i][j];

        // Iterate through all possible jump sizes incrementally
        for (int k = 1; k <= jumps; k++) {
            // Check right jump first, then down jump
            if (solve(i, j + k, mat, ans, n))
                return true;
            if (solve(i + k, j, mat, ans, n))
                return true;
        }

        // Backtrack: remove from path
        ans[i][j] = 0;
        // Optimize: mark this cell as useless so we never process it again
        mat[i][j] = 0;

        return false;
    }

    public ArrayList<ArrayList<Integer>> shortestDist(int[][] mat) {
        int n = mat.length;
        int[][] ans = new int[n][n];
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();

        // If a valid path is found, format the 2D array into an ArrayList
        if (solve(0, 0, mat, ans, n)) {
            for (int i = 0; i < n; i++) {
                ArrayList<Integer> row = new ArrayList<>();
                for (int j = 0; j < n; j++) {
                    row.add(ans[i][j]);
                }
                result.add(row);
            }
        } else {
            // If no path exists, return an ArrayList containing just -1
            ArrayList<Integer> noPath = new ArrayList<>();
            noPath.add(-1);
            result.add(noPath);
        }

        return result;
    }
}