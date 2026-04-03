class Solution {
  public:
    vector<int> diagView(vector<vector<int>> mat) {
        int n = mat.size();
        vector<int> ans;

        // There are total (2*n - 1) anti-diagonals
        for (int d = 0; d <= 2 * n - 2; d++) {

            // Row can start from 0 or (d - n + 1)
            int rowStart = max(0, d - n + 1);

            // Row can go till min(n-1, d)
            int rowEnd = min(n - 1, d);

            // Traverse rows for current diagonal
            for (int i = rowStart; i <= rowEnd; i++) {
                int j = d - i;
                ans.push_back(mat[i][j]);
            }
        }

        return ans;
    }
};