class Solution {
  public:
    int findPerimeter(vector<vector<int>> &mat) {
        int n = mat.size();
        int m = mat[0].size();
        int peri = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 1) {
                    peri += 4;
                    if (j + 1 < m && mat[i][j + 1] == 1) peri -= 2;
                    if (i + 1 < n && mat[i + 1][j] == 1) peri -= 2;
                }
            }
        }
        return peri;
    }
};