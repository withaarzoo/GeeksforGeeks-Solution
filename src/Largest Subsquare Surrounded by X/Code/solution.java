class Solution {
    public int largestSubsquare(char mat[][]) {
        int n = mat.length;
        if (n == 0) return 0;
        int[][] hor = new int[n][n];
        int[][] ver = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 'X') {
                    hor[i][j] = (j == 0) ? 1 : hor[i][j - 1] + 1;
                    ver[i][j] = (i == 0) ? 1 : ver[i - 1][j] + 1;
                }
            }
        }
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 'X') {
                    int maxSide = Math.min(hor[i][j], ver[i][j]);
                    for (int s = maxSide; s > ans; s--) {
                        if (hor[i - s + 1][j] >= s && ver[i][j - s + 1] >= s) {
                            ans = s;
                            break;
                        }
                    }
                }
            }
        }
        return ans;
    }
};