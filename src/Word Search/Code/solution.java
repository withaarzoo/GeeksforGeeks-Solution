class Solution {
    int n, m;
    int[][] dir = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };

    boolean dfs(int i, int j, int idx, char[][] mat, String word) {
        if (idx == word.length())
            return true;

        if (i < 0 || j < 0 || i >= n || j >= m || mat[i][j] != word.charAt(idx))
            return false;

        char temp = mat[i][j];
        mat[i][j] = '#';

        for (int[] d : dir) {
            if (dfs(i + d[0], j + d[1], idx + 1, mat, word))
                return true;
        }

        mat[i][j] = temp;
        return false;
    }

    public boolean isWordExist(char[][] mat, String word) {
        n = mat.length;
        m = mat[0].length;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (dfs(i, j, 0, mat, word))
                    return true;
            }
        }
        return false;
    }
}
